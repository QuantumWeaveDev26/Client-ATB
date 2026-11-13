$ErrorActionPreference = 'Stop'
$project = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$inventory = Get-Content -LiteralPath (Join-Path $project 'research/gallery-2026-11-11/inventory.json') -Raw | ConvertFrom-Json
$output = Join-Path $project 'public/images/gallery'
New-Item -ItemType Directory -Path $output -Force | Out-Null
$exports = foreach ($photo in $inventory) {
  $id = '{0:d2}' -f [int]$photo.id
  $original = Join-Path $project $photo.path
  foreach ($variant in @(@{ suffix=''; width=960 }, @{ suffix='-full'; width=2000 })) {
    $target = Join-Path $output ('atb-' + $id + $variant.suffix + '.webp')
    $width = [Math]::Min($variant.width, [int]$photo.width)
    & ffmpeg -hide_banner -loglevel error -y -i $original -vf "scale=${width}:-1:flags=lanczos" -frames:v 1 -c:v libwebp -quality 86 -compression_level 5 $target
    if ($LASTEXITCODE -ne 0) { throw "Photo export failed: $id" }
    @{ origin='User-supplied ATB gallery photo'; originalFilename=$photo.originalName; sourceArchive=$photo.archive; originalSha256=$photo.sha256; process='Orientation-aware resize and WebP compression only; no AI reconstruction or scene edits'; variant=$variant.suffix; sourceDimensions=@($photo.width,$photo.height) } | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath ($target + '.json') -Encoding utf8
  }
  [ordered]@{id=[int]$photo.id; thumbnail=('/images/gallery/atb-' + $id + '.webp'); full=('/images/gallery/atb-' + $id + '-full.webp'); originalSha256=$photo.sha256}
}
$exports | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath (Join-Path $project 'research/gallery-2026-11-11/exports.json') -Encoding utf8
Write-Output "Prepared $($exports.Count) supplied photographs in thumbnail and full-view sizes."
