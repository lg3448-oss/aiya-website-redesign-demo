#!/bin/sh
set -eu

repo_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$repo_root"

if rg -n '(href|src)="/' --glob '*.html' .; then
  echo 'Root-absolute HTML asset or navigation path found.' >&2
  exit 1
fi

if rg -n '/(assets|products|services|solutions|news(\.html|/))' \
  catalog.js product-pages.js service-pages.js; then
  echo 'Root-absolute catalog path found.' >&2
  exit 1
fi

for page in index.html news.html signin.html solutions.html; do
  rg -q 'href="styles\.css\?v=' "$page"
done

for directory in news products services solutions; do
  for page in "$directory"/*.html; do
    rg -q 'href="\.\./styles\.css\?v=' "$page"
  done
done

echo 'Deployment path validation passed.'
