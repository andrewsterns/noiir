# Batch update story imports to use correct paths

Write-Host "Updating story file imports..." -ForegroundColor Green

# Update imports FROM components
$files = Get-ChildItem -Path "__stories__" -Filter "*.stories.tsx" -Recurse
$updatedCount = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    # Determine the relative path depth based on file location
    $relativePath = $file.Directory.FullName -replace [regex]::Escape((Get-Location).Path + "\__stories__\"), ""
    $depth = ($relativePath -split '\\').Count
    $srcPrefix = "../" * ($depth + 1) + "src/"
    
    # Common patterns - update relative component imports to src/
    $content = $content -replace "from '\./([^']+)'", "from '$srcPrefix`components/`$1'"
    $content = $content -replace "from '\.\./\.\./'", "from '$src Prefix`components/'"
    $content = $content -replace "from '\.\./\.\./\.\./(components|theme)/", "from '$srcPrefix`$1/"
    
    # Update Frame imports specifically
    $content = $content -replace "from '\.\./\.\.'", "from '$srcPrefix`components'"
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Updated: $($file.Name)" -ForegroundColor Cyan
        $updatedCount++
    }
}

Write-Host "Done! Updated $updatedCount story files" -ForegroundColor Green
