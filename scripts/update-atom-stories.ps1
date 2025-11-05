# Comprehensive story import updater
Write-Host "Updating all story imports..." -ForegroundColor Green

$updates = @{
    # Atom imports
    "__stories__/atoms/avatar/avatar.stories.tsx" = @(
        @{ old = "from './avatar'"; new = "from '../../../src/components/atoms/avatar/avatar'" }
    )
    "__stories__/atoms/badge/badge.stories.tsx" = @(
        @{ old = "from './badge'"; new = "from '../../../src/components/atoms/badge/badge'" }
    )
    "__stories__/atoms/checkbox/checkbox.stories.tsx" = @(
        @{ old = "from './checkbox'"; new = "from '../../../src/components/atoms/checkbox/checkbox'" }
        @{ old = "from '../../frame/Frame'"; new = "from '../../../src/components/frame/Frame'" }
    )
    "__stories__/atoms/input/input.stories.tsx" = @(
        @{ old = "from './input'"; new = "from '../../../src/components/atoms/input/input'" }
        @{ old = "from '../..'"; new = "from '../../../src/components'" }
    )
    "__stories__/atoms/label/label.stories.tsx" = @(
        @{ old = "from './label'"; new = "from '../../../src/components/atoms/label/label'" }
    )
    "__stories__/atoms/progress-bar/progress-bar.stories.tsx" = @(
        @{ old = "from './progress-bar'"; new = "from '../../../src/components/atoms/progress-bar/progress-bar'" }
    )
    "__stories__/atoms/radio-button/radio-button.stories.tsx" = @(
        @{ old = "from './radio-button'"; new = "from '../../../src/components/atoms/radio-button/radio-button'" }
    )
    "__stories__/atoms/slider/slider.stories.tsx" = @(
        @{ old = "from './slider'"; new = "from '../../../src/components/atoms/slider/slider'" }
        @{ old = "from '../..'"; new = "from '../../../src/components'" }
    )
    "__stories__/atoms/textarea/textarea.stories.tsx" = @(
        @{ old = "from './textarea'"; new = "from '../../../src/components/atoms/textarea/textarea'" }
        @{ old = "from '../..'"; new = "from '../../../src/components'" }
    )
    "__stories__/atoms/toggle/toggle.stories.tsx" = @(
        @{ old = "from './toggle'"; new = "from '../../../src/components/atoms/toggle/toggle'" }
        @{ old = "from '../../frame/Frame'"; new = "from '../../../src/components/frame/Frame'" }
    )
    "__stories__/atoms/tooltip/tooltip.stories.tsx" = @(
        @{ old = "from './tooltip'"; new = "from '../../../src/components/atoms/tooltip/tooltip'" }
    )
}

$totalUpdated = 0

foreach ($file in $updates.Keys) {
    $fullPath = Join-Path (Get-Location) $file
    if (Test-Path $fullPath) {
        $content = Get-Content $fullPath -Raw
        $modified = $false
        
        foreach ($update in $updates[$file]) {
            if ($content -match [regex]::Escape($update.old)) {
                $content = $content -replace [regex]::Escape($update.old), $update.new
                $modified = $true
            }
        }
        
        if ($modified) {
            Set-Content -Path $fullPath -Value $content -NoNewline
            Write-Host "✓ $file" -ForegroundColor Cyan
            $totalUpdated++
        }
    }
}

Write-Host "`nUpdated $totalUpdated atom story files" -ForegroundColor Green
