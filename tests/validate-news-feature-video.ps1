$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$newsPath = Join-Path $root 'news.html'
$stylesPath = Join-Path $root 'styles.css'
$videoPath = Join-Path $root 'assets/aiya-news-connected-business.mp4'
$news = Get-Content -Raw -LiteralPath $newsPath
$styles = Get-Content -Raw -LiteralPath $stylesPath
$feature = [regex]::Match($news, '<section class="news-feature"[\s\S]*?</section>').Value
$paths = [regex]::Match($news, '<section class="news-paths"[\s\S]*?</section>').Value

$checks = [ordered]@{
  'video asset exists' = Test-Path -LiteralPath $videoPath
  'video asset size matches source' = (Test-Path -LiteralPath $videoPath) -and ((Get-Item -LiteralPath $videoPath).Length -eq 75972174)
  'feature uses native controlled video' = $feature -match '<video class="news-feature-video" controls playsinline preload="metadata"'
  'feature uses expected MP4 source' = $feature -match '<source src="assets/aiya-news-connected-business\.mp4" type="video/mp4">'
  'news stylesheet cache is refreshed' = $news -match 'styles\.css\?v=20260827-2'
  'feature placeholder is removed' = $feature -notmatch 'news-placeholder|Under Construction|<b>01</b>'
  'video does not autoplay or loop' = $feature -notmatch '\bautoplay\b|\bloop\b'
  'two lower placeholders remain' = ([regex]::Matches($paths, 'news-card-image news-placeholder').Count -eq 2)
  'two lower construction labels remain' = ([regex]::Matches($paths, 'Under Construction').Count -eq 2)
  'scoped video CSS exists' = $styles -match '\.news-feature-video\{[^}]*object-fit:cover'
}

$failed = @($checks.GetEnumerator() | Where-Object { -not $_.Value })
$checks.GetEnumerator() | ForEach-Object { Write-Output ("{0}: {1}" -f $_.Key, $(if ($_.Value) { 'PASS' } else { 'FAIL' })) }
if ($failed.Count -gt 0) { exit 1 }
