# Batch update component imports to use __variants__

Write-Host "Updating component imports..." -ForegroundColor Green

$patterns = @{
    "from './button.variants'" = "from '../../../../__variants__/atoms/button/button.variants'"
    "from './tooltip.variants'" = "from '../../../../__variants__/atoms/tooltip/tooltip.variants'"
    "from './toggle.variants'" = "from '../../../../__variants__/atoms/toggle/toggle.variants'"
    "from './textarea.variants'" = "from '../../../../__variants__/atoms/textarea/textarea.variants'"
    "from './radio-button.variants'" = "from '../../../../__variants__/atoms/radio-button/radio-button.variants'"
    "from './slider.variants'" = "from '../../../../__variants__/atoms/slider/slider.variants'"
    "from './progress-bar.variants'" = "from '../../../../__variants__/atoms/progress-bar/progress-bar.variants'"
    "from './dropdown.variants'" = "from '../../../../__variants__/molecules/dropdown/dropdown.variants'"
    "from './menu.variants'" = "from '../../../../__variants__/molecules/menu/menu.variants'"
    "from './popup.variants'" = "from '../../../../__variants__/molecules/popup/popup.variants'"
    "from './navbar.variants'" = "from '../../../../__variants__/organism/navbar/navbar.variants'"
    "from '../../atoms/button/button.variants'" = "from '../../../../__variants__/atoms/button/button.variants'"
}

$files = Get-ChildItem -Path "src/components" -Filter "*.tsx" -Recurse
$updatedCount = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    foreach ($pattern in $patterns.GetEnumerator()) {
        $content = $content -replace [regex]::Escape($pattern.Key), $pattern.Value
    }
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Updated: $($file.Name)" -ForegroundColor Cyan
        $updatedCount++
    }
}

Write-Host "Done! Updated $updatedCount files" -ForegroundColor Green
