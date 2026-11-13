$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
$assetRoot = Join-Path $PSScriptRoot '../public'
New-Item -ItemType Directory -Force -Path (Join-Path $assetRoot 'images'),(Join-Path $assetRoot 'fonts') | Out-Null
$assets = @{
 'images/courts-panorama.jpg' = 'https://img3.khelomore.com/venues/1733/coverphoto/1040x490/WhatsApp-Image-2023-10-30-at-8-04-26-PM.jpg'
 'images/courts-trees.jpg' = 'https://img1.khelomore.com/venues/1733/images/1040x490/WhatsApp-Image-2023-10-30-at-8-04-27-PM--1-.jpg'
 'images/court-detail.jpg' = 'https://img1.khelomore.com/venues/1733/images/1040x490/WhatsApp-Image-2023-10-30-at-8-04-25-PM.jpg'
 'images/academy.jpg' = 'https://img1.khelomore.com/venues/1733/images/1040x490/WhatsApp-Image-2023-10-30-at-8-04-26-PM--1-.jpg'
 'images/courts-wide.jpg' = 'https://img1.khelomore.com/venues/1733/images/1040x490/WhatsApp-Image-2023-10-30-at-8-04-25-PM--1-.jpg'
 'images/courts-clay.jpg' = 'https://img.lyfskills.com/photos/ChIJU1iuQgYZrjsRhy3qRrrggps/photo_0_l.webp'
 'images/atb-logo.webp' = 'https://assets.mytribe.in/insecure/rs:fill:224:224/f:webp/plain/s3://mytribe-assets-production/74c04917-2e07-4e0b-86c1-01de6780a5fe'
 'images/sehaj-trophy.webp' = 'https://assets.mytribe.in/insecure/rs:fill:720:900/f:webp/plain/s3://mytribe-assets-production/c4b3e262-efcc-4c7d-8e8e-78b7a2aeae2e'
 'images/eshita-trophy.webp' = 'https://assets.mytribe.in/insecure/rs:fill:720:900/f:webp/plain/s3://mytribe-assets-production/f29b880f-4d75-4247-ad1f-32ab0241549b'
 'images/academy-event.webp' = 'https://assets.mytribe.in/insecure/rs:fill:1200:800/f:webp/plain/s3://mytribe-assets-production/585095a5-6c0e-4f62-b907-1087d4eb50aa'
 'fonts/bricolage-grotesque.ttf' = 'https://raw.githubusercontent.com/google/fonts/main/ofl/bricolagegrotesque/BricolageGrotesque%5Bopsz%2Cwdth%2Cwght%5D.ttf'
 'fonts/manrope.ttf' = 'https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/Manrope%5Bwght%5D.ttf'
}
foreach ($asset in $assets.GetEnumerator()) {
 $targetPath = Join-Path $assetRoot $asset.Key
 if (-not (Test-Path -LiteralPath $targetPath)) {
  Invoke-WebRequest -Uri $asset.Value -OutFile $targetPath -UseBasicParsing
 }
 Write-Output $asset.Key
}
$assets | ConvertTo-Json | Set-Content -LiteralPath (Join-Path $PSScriptRoot '../research/shipping-asset-origins.json')
