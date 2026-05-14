# Run Besek Artisanal locally (Windows).
# Fixes "node/npm not recognized" in some terminals (e.g. Cursor) by prepending Node install dir.

$ErrorActionPreference = "Stop"

$nodeDir = "C:\Program Files\nodejs"
if (-not (Test-Path (Join-Path $nodeDir "node.exe"))) {
  Write-Host "Node not found at $nodeDir. Install Node LTS from https://nodejs.org/ then reopen the terminal." -ForegroundColor Red
  exit 1
}
$env:Path = "$nodeDir;$env:Path"

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

if (-not (Test-Path "package.json")) {
  Write-Host "No package.json here: $repoRoot" -ForegroundColor Red
  Write-Host "Clone or pull the repo first, e.g. git clone https://github.com/saptaagung/website-besekV2.git" -ForegroundColor Yellow
  exit 1
}

if (-not (Test-Path ".env.local") -and (Test-Path ".env.example")) {
  Copy-Item ".env.example" ".env.local"
  Write-Host 'Created .env.local from .env.example — add your Supabase keys.' -ForegroundColor Yellow
}

Write-Host "Installing dependencies..." -ForegroundColor Cyan
npm install

Write-Host 'Starting dev server at http://localhost:3000 (press Ctrl+C to stop)...' -ForegroundColor Cyan
npm run dev
