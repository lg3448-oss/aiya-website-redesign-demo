$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$newsPath = Join-Path $root 'news.html'
$stylesPath = Join-Path $root 'styles.css'
$videoPath = Join-Path $root 'assets/aiya-news-connected-business.mp4'

$news = Get-Content -Raw -LiteralPath $newsPath
$styles = Get-Content -Raw -LiteralPath $stylesPath

if ($news -notmatch '<a class="news-feature-image news-placeholder"[^>]*><span>Under Construction</span><b>01</b></a>') {
  throw 'News feature does not contain the linked Under Construction placeholder.'
}
if ($news -match '<video|news-feature-video|aiya-news-connected-business\.mp4') {
  throw 'News page still contains the removed feature video.'
}
if ($styles -match '\.news-feature-video') {
  throw 'Video-only News CSS still exists.'
}
if (Test-Path -LiteralPath $videoPath) {
  throw 'News feature MP4 still exists.'
}

Write-Output 'News placeholder validation passed.'
