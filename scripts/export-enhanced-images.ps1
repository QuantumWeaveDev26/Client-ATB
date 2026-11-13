$ErrorActionPreference = 'Stop'
$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$inventory = Get-Content -LiteralPath (Join-Path $projectRoot 'research/image-enhancements/inventory.json') -Raw | ConvertFrom-Json
$generated = Get-Content -LiteralPath (Join-Path $projectRoot 'research/image-enhancements/generated-paths.json') -Raw | ConvertFrom-Json -AsHashtable
$destination = Join-Path $projectRoot 'public/images/enhanced'
New-Item -ItemType Directory -Path $destination -Force | Out-Null
$receipt = foreach ($asset in $inventory) {
  $original = Join-Path $projectRoot ('public/images/' + $asset.name)
  if ((Get-FileHash -LiteralPath $original -Algorithm SHA256).Hash.ToLowerInvariant() -ne $asset.sha256) { throw "Original changed: $($asset.name)" }
  $sourcePath = $generated[$asset.name]
  if (-not $sourcePath -or -not (Test-Path -LiteralPath $sourcePath)) { throw "Missing reconstruction: $($asset.name)" }
  $output = Join-Path $destination $asset.name
  $scale = "scale=$($asset.size[0]):$($asset.size[1]):flags=lanczos"
  $encode = if ($asset.name.EndsWith('.webp')) { @('-c:v', 'libwebp', '-quality', '92', '-compression_level', '6') } else { @('-q:v', '2') }
  & ffmpeg -hide_banner -loglevel error -y -i $sourcePath -vf $scale -frames:v 1 @encode $output
  if ($LASTEXITCODE -ne 0) { throw "Export failed: $($asset.name)" }
  [ordered]@{ name=$asset.name; width=$asset.size[0]; height=$asset.size[1]; originalSha256=$asset.sha256; enhancedSha256=(Get-FileHash -LiteralPath $output -Algorithm SHA256).Hash.ToLowerInvariant(); bytes=(Get-Item -LiteralPath $output).Length; output=('public/images/enhanced/' + $asset.name) }
}
$receipt | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $projectRoot 'research/image-enhancements/exports.json') -Encoding utf8
Write-Output "Exported $($receipt.Count) enhanced assets; original files verified unchanged."
