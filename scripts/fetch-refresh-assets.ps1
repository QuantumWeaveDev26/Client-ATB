$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
$assetRoot = 'C:/ATB-Client/public/images'
$assets = @{
 'training-forehand.webp' = 'https://assets.mytribe.in/insecure/rs:fill:1000:800/f:webp/plain/s3://mytribe-assets-production/1c9ffd9a-6b75-4160-b862-08ff8f3df1f1'
 'training-rally.webp' = 'https://assets.mytribe.in/insecure/rs:fill:1000:800/f:webp/plain/s3://mytribe-assets-production/37baa6b7-7c99-439c-affc-138a17cbbeb1'
 'training-ready.webp' = 'https://assets.mytribe.in/insecure/rs:fill:1000:800/f:webp/plain/s3://mytribe-assets-production/5fc37735-9a86-4f6c-b94b-9d83f66a1a33'
 'training-wide.webp' = 'https://assets.mytribe.in/insecure/rs:fill:1200:900/f:webp/plain/s3://mytribe-assets-production/48edbd19-a5d0-4a3d-be00-810d0f6049ff'
}
foreach ($asset in $assets.GetEnumerator()) {
 Invoke-WebRequest -Uri $asset.Value -OutFile (Join-Path $assetRoot $asset.Key) -UseBasicParsing
 Write-Output $asset.Key
}
$assets | ConvertTo-Json | Set-Content -LiteralPath 'C:/ATB-Client/research/refresh-asset-origins.json'
