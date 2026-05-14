# Push this project to GitHub.
# Repo: https://github.com/saptaagung/website-besekV2.git
#
# Usage (default branch = main):
#   powershell -ExecutionPolicy Bypass -File .\scripts\push-to-github.ps1
#   powershell -ExecutionPolicy Bypass -File .\scripts\push-to-github.ps1 -Branch develop
#
# Or set environment variable for one run:
#   $env:GIT_BRANCH = "develop"; powershell -ExecutionPolicy Bypass -File .\scripts\push-to-github.ps1
#
# If you see "git is not recognized", install Git for Windows and/or add it to PATH.
# This script also tries common install locations automatically.

param(
  [ValidateNotNullOrEmpty()]
  [string]$Branch = $(if ($env:GIT_BRANCH) { $env:GIT_BRANCH } else { "main" })
)

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

$originUrl = "https://github.com/saptaagung/website-besekV2.git"

function Add-GitToPathIfNeeded {
  if (Get-Command git -ErrorAction SilentlyContinue) {
    return
  }

  $pf86 = [Environment]::GetEnvironmentVariable("ProgramFiles(x86)")
  $candidateDirs = @(
    (Join-Path $env:ProgramFiles "Git\cmd")
    (Join-Path $env:ProgramFiles "Git\bin")
    $(if ($pf86) { Join-Path $pf86 "Git\cmd" })
    (Join-Path $env:LOCALAPPDATA "Programs\Git\cmd")
    (Join-Path $env:LOCALAPPDATA "Programs\Git\bin")
  ) | Where-Object { $_ }

  foreach ($dir in $candidateDirs) {
    $exe = Join-Path $dir "git.exe"
    if (Test-Path -LiteralPath $exe) {
      $env:Path = "$dir;$env:Path"
      Write-Host "Using Git at: $exe" -ForegroundColor DarkGray
      return
    }
  }
}

function Test-GitAvailable {
  Add-GitToPathIfNeeded
  if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host ""
    Write-Host "ERROR: Git was not found in PATH or common install folders." -ForegroundColor Red
    Write-Host "Install Git for Windows: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "During setup, choose: ""Git from the command line and also from 3rd-party software""." -ForegroundColor Yellow
    Write-Host "Then close and reopen PowerShell (or Cursor) and run this script again." -ForegroundColor Yellow
    Write-Host ""
    exit 1
  }
  git --version | Write-Host -ForegroundColor DarkGray
}

Test-GitAvailable

Write-Host "Remote: $originUrl" -ForegroundColor DarkGray
Write-Host "Branch: $Branch" -ForegroundColor Cyan

if (-not (Test-Path ".git")) {
  git init
}

$null = git remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0) {
  git remote add origin $originUrl
} else {
  git remote set-url origin $originUrl
}

git add .
git status

$msg = "Update: Besek Artisanal site"
$dirty = git status --porcelain
if ($dirty) {
  git commit -m $msg
} else {
  Write-Host "Nothing to commit (working tree clean)." -ForegroundColor Yellow
}

git branch -M $Branch 2>$null

$remoteRef = "refs/remotes/origin/$Branch"

# If GitHub already has this branch (e.g. empty README), merge then push.
git fetch origin $Branch 2>$null
if ($LASTEXITCODE -eq 0) {
  git show-ref --verify --quiet $remoteRef 2>$null
  if ($LASTEXITCODE -eq 0) {
    Write-Host "Merging origin/$Branch (allow unrelated histories; prefer local on conflicts)..." -ForegroundColor Cyan
    git merge "origin/$Branch" --allow-unrelated-histories --no-edit -X ours -m "Merge GitHub $Branch with local project" 2>$null
    if ($LASTEXITCODE -ne 0) {
      Write-Host "Merge reported an issue. Resolve conflicts if any, then: git add . && git commit && git push -u origin $Branch" -ForegroundColor Yellow
      exit 1
    }
  }
} else {
  Write-Host "Note: git fetch failed (network or auth). Push may still work if remote branch is new." -ForegroundColor Yellow
}

Write-Host "Pushing to origin $Branch..." -ForegroundColor Cyan
git push -u origin $Branch
