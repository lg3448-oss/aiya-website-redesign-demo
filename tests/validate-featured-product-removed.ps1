$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$html = Get-Content -Raw (Join-Path $root 'index.html')

if ($html -match 'id=["'']kiosk["'']' -or $html -match 'href=["'']#kiosk["'']') {
  throw 'The removed Featured Product scene is still linked or present.'
}

if ($html -match 'FEATURED PRODUCT') {
  throw 'The removed Featured Product label is still present on the homepage.'
}

$sceneNumbers = [regex]::Matches($html, 'data-scene="(\d{2})"') | ForEach-Object {
  $_.Groups[1].Value
}
$expectedNumbers = 1..$sceneNumbers.Count | ForEach-Object { $_.ToString('00') }

if (($sceneNumbers -join ',') -ne ($expectedNumbers -join ',')) {
  throw "Homepage scene numbers must remain sequential. Found: $($sceneNumbers -join ', ')"
}

Write-Output 'Featured Product removal validation passed.'
