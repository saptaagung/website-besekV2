# Run Besek Artisanal locally (Windows).
# Prepends Node to PATH and uses npm.cmd so PowerShell ExecutionPolicy does not block npm.ps1.

$ErrorActionPreference = "Stop"

$nodeDir = "C:\Program Files\nodejs"
$nodeExe = Join-Path $nodeDir "node.exe"
$npmCmd = Join-Path $nodeDir "npm.cmd"

if (-not (Test-Path $nodeExe)) {
  Write-Host "Node not found at $nodeDir. Install Node LTS from https://nodejs.org/ then reopen the terminal." -ForegroundColor Red
  exit 1
}
$env:Path = "$nodeDir;$env:Path"

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

if (-not (Test-Path "package.json")) {
  Write-Host "No package.json here: $repoRoot" -ForegroundColor Red
  exit 1
}

if (-not (Test-Path ".env.local") -and (Test-Path ".env.example")) {
  Copy-Item ".env.example" ".env.local"
  Write-Host "Created .env.local from .env.example — add your Supabase keys." -ForegroundColor Yellow
}

Write-Host "Installing dependencies..." -ForegroundColor Cyan
& $npmCmd install

Write-Host "Starting dev server at http://localhost:3000 (Ctrl+C to stop)..." -ForegroundColor Cyan
& $npmCmd run dev
