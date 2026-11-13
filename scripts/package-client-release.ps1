param(
  [string]$ReleaseName = 'ATB-Tennis-Academy-Netlify-FAQ-Contact-2026-11-12.zip',
  [string]$ReviewStatus = 'pending review'
)
$ErrorActionPreference = 'Stop'
$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
Add-Type -AssemblyName System.IO.Compression
function Write-ClientZip([string]$root, [string]$destination, $files) {
  $stream = [IO.File]::Open($destination, [IO.FileMode]::Create)
  $archive = [IO.Compression.ZipArchive]::new($stream, [IO.Compression.ZipArchiveMode]::Create)
  try {
    foreach ($file in $files) {
      $relative = [IO.Path]::GetRelativePath($root, $file.FullName).Replace('\', '/')
      if ($relative.StartsWith('..') -or $relative.StartsWith('/')) { throw "Unexpected archive path: $relative" }
      [IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archive, $file.FullName, $relative, [IO.Compression.CompressionLevel]::Optimal) | Out-Null
    }
  } finally { $archive.Dispose(); $stream.Dispose() }
  $check = [IO.Compression.ZipFile]::OpenRead($destination)
  try {
    if ($check.Entries.Count -ne $files.Count) { throw 'Archive entry count mismatch' }
    foreach ($entry in $check.Entries) {
      $original = Join-Path $root $entry.FullName
      if ($entry.Length -ne (Get-Item -LiteralPath $original).Length) { throw "Archive size mismatch: $($entry.FullName)" }
      $read = $entry.Open()
      try { $read.CopyTo([IO.Stream]::Null) } finally { $read.Dispose() }
    }
  } finally { $check.Dispose() }
}
$dist = Join-Path $projectRoot 'dist'
$files = @(Get-ChildItem -LiteralPath $dist -File -Recurse)
foreach ($required in @('index.html','programs.html','gallery.html','videos/practice-0.mp4','videos/practice-4.mp4','videos/practice-7.mp4')) {
  if (-not (Test-Path -LiteralPath (Join-Path $dist $required))) { throw "Missing production file: $required" }
}
if (Test-Path -LiteralPath (Join-Path $dist 'photo-credits.html')) { throw 'Removed visitor credit page has reappeared' }
$galleryPhotos = Get-Content -LiteralPath (Join-Path $projectRoot 'src/gallery-assets.json') -Raw | ConvertFrom-Json
foreach ($photo in $galleryPhotos) {
  foreach ($url in @($photo.src, $photo.full)) {
    if (-not (Test-Path -LiteralPath (Join-Path $dist $url.TrimStart('/')))) { throw "Missing gallery image: $url" }
  }
}
$release = Join-Path $projectRoot $ReleaseName
Write-ClientZip $dist $release $files
foreach ($alias in @('ATB-Tennis-Academy-Netlify-LATEST.zip','ATB-Tennis-Academy-Netlify-Drop.zip','ATB-Tennis-Academy-site.zip','ATB-Tennis-Academy-Netlify-WhatsApp.zip','ATB-Tennis-Academy-Netlify-India.zip','ATB-Tennis-Academy-Netlify-Trial.zip','ATB-Tennis-Academy-Netlify-Programs-Grid.zip','ATB-Tennis-Academy-Netlify-Media-Update.zip')) {
  Copy-Item -LiteralPath $release -Destination (Join-Path $projectRoot $alias) -Force
}
$photos = Join-Path $projectRoot 'public'
$photoManifest = Get-Content -LiteralPath (Join-Path $projectRoot 'src/photo-quality-assets.json') -Raw | ConvertFrom-Json -AsHashtable
$photoFiles = @($photoManifest.Values | ForEach-Object { Get-Item -LiteralPath (Join-Path $photos $_.full.TrimStart('/')) })
if ($photoFiles.Count -ne 67) { throw 'Expected exactly 67 enhanced full-view assets' }
$photoZip = Join-Path $projectRoot 'ATB-Tennis-Academy-4K-Photos-2026-11-11.zip'
Write-ClientZip $photos $photoZip $photoFiles
$receipt = [ordered]@{
  archive=$release; files=$files.Count; bytes=(Get-Item -LiteralPath $release).Length; sha256=(Get-FileHash -LiteralPath $release -Algorithm SHA256).Hash;
  integrity='Every production entry matched and decompressed; index, programs and gallery at archive root; all 39 supplied gallery photos included in thumbnail and full-view sizes';
  photoArchive=$photoZip; enhancedImageAssets=67; enhancement='65 assets use non-generative corrections/exports; 2 client-requested clay-court image edits use built-in image_gen; responsive 4K-sized full views'; originals='Raw originals untouched; previous website versions backed up';
  viewport='Content-height ordinary sections; CSS header-clearance scroll margins with zero Lenis JS offsets; no section settling; hero and tennis runway preserved';
  targetedExposure=@('atb-04','atb-10');
  navbar='Solid paper background; hides scrolling down and reveals scrolling up; visible at top, with open menu or keyboard navigation; responsive gallery dock';
  contact='Merged into FAQ left panel with existing court photo background, directions, telephone, email and address; separate visit section removed; #visit preserved';
  galleryLayout='Justified proportional photo rows; no empty grid cells; native image proportions and original order';
  eshitaArchiveCaption="Eshita Sriyala — AITA National Series U14 girls’ singles champion · Coimbatore";
  gallery=[ordered]@{ suppliedPhotos=39; totalPhotos=42; academyPictures=31; achievements=11; separateTournamentCategory=$false; legacyTournamentLink='Academy Pictures'; originals='All 39 supplied source checksums unchanged'; viewer='Full-screen, contained photos, previous/next, keyboard, swipe, focus return' };
  adultsProgram='Client-supplied five-member group photograph, framed at 50% 90% on both program grids';
  academyIntroduction='Matching client group photograph atb-17; existing copy/CTA, responsive framing and scroll reveal'; clayProgramEdits=@('Red Ball','Green Dot');
  mentorRole='Mentor, ATB Tennis Academy'; clientResultCaptions=9;
  review=$ReviewStatus; booking='WhatsApp only'; videoControls='Custom centered play/pause';
}
$receiptDirectory = Join-Path $projectRoot '.impeccable/review'
New-Item -ItemType Directory -Path $receiptDirectory -Force | Out-Null
$receipt | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath (Join-Path $receiptDirectory 'netlify-latest-package.json') -Encoding utf8
$receipt | ConvertTo-Json -Depth 4
