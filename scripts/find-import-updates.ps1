# Update Imports Script
# This PowerShell script helps find files that need import updates

Write-Host "=== Finding files with old import paths ===" -ForegroundColor Green

Write-Host "`n1. Files importing from frame-properties:" -ForegroundColor Yellow
Get-ChildItem -Path "src" -Filter "*.tsx" -Recurse | Select-String -Pattern "from.*frame-properties" | Select-Object Path, LineNumber, Line -Unique

Write-Host "`n2. Files importing from local .variants files:" -ForegroundColor Yellow
Get-ChildItem -Path "src" -Filter "*.tsx" -Recurse | Select-String -Pattern "from '\./.*\.variants'" | Select-Object Path, LineNumber, Line -Unique

Write-Host "`n3. Files importing from local .stories files:" -ForegroundColor Yellow
Get-ChildItem -Path "src" -Filter "*.tsx" -Recurse | Select-String -Pattern "from '\./.*\.stories'" | Select-Object Path, LineNumber, Line -Unique

Write-Host "`n4. Files in __stories__ importing relative paths:" -ForegroundColor Yellow
Get-ChildItem -Path "__stories__" -Filter "*.tsx" -Recurse | Select-String -Pattern "from '\.\./\.\." | Select-Object Path, LineNumber, Line -Unique

Write-Host "`n5. Files in __variants__ importing relative paths:" -ForegroundColor Yellow
Get-ChildItem -Path "__variants__" -Filter "*.tsx" -Recurse | Select-String -Pattern "from '\.\./\.\." | Select-Object Path, LineNumber, Line -Unique

Write-Host "`n=== Summary ===" -ForegroundColor Green
Write-Host "Please review the files above and update their imports according to REORGANIZATION_GUIDE.md"
