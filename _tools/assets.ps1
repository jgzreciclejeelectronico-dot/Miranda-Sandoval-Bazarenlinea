Add-Type -AssemblyName System.Drawing

$root = "C:\Users\SANCHO GRAPHICS\Documents\Qoder\2026-10-26\21c30833"
$src = Join-Path $root "vibe_images"
$out = Join-Path $root "miranda-bazar\assets"
$prod = Join-Path $out "productos"

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
function Save-Jpeg($bmp, $path, $quality) {
  $enc = [System.Drawing.Imaging.Encoder]::Quality
  $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($enc, [long]$quality)
  $bmp.Save($path, $jpegCodec, $ep)
}

function Resize-Image($source, $dest, $maxW, $maxH, $quality, $jpeg = $true) {
  $img = [System.Drawing.Image]::FromFile($source)
  $ratio = [Math]::Min($maxW / $img.Width, $maxH / $img.Height)
  $w = [int]($img.Width * $ratio)
  $h = [int]($img.Height * $ratio)
  $bmp = New-Object System.Drawing.Bitmap($w, $h)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.DrawImage($img, 0, 0, $w, $h)
  $g.Dispose()
  if ($jpeg) { Save-Jpeg $bmp $dest $quality } else { $bmp.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png) }
  $bmp.Dispose()
  $img.Dispose()
}

# Hero
Resize-Image (Join-Path $src "hero-boutique_1793047752693_43264cdb.png") (Join-Path $out "hero-boutique.jpg") 1200 1800 84

# Productos
$map = @{
  "blusa"    = "producto-blusa_1793047769336_64efb99b.png"
  "jeans"    = "producto-jeans_1793047786532_bf780177.png"
  "vestido"  = "producto-vestido_1793047806713_930571b4.png"
  "chamarra" = "producto-chamarra_1793047823419_17b1ee90.png"
  "falda"    = "producto-falda_1793047838772_0f1fb71f.png"
  "sueter"   = "producto-sueter_1793047858255_88d438f8.png"
  "blazer"   = "producto-blazer_1793047874743_6d85d7a6.png"
  "bolso"    = "producto-bolso_1793047892386_08b91751.png"
}
foreach ($k in $map.Keys) {
  Resize-Image (Join-Path $src $map[$k]) (Join-Path $prod "$k.jpg") 900 900 84
}

# ---- Icono de la app ----
function New-Icon($size, $path, $scale = 1.0) {
  $bmp = New-Object System.Drawing.Bitmap($size, $size)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $g.Clear([System.Drawing.Color]::FromArgb(20, 19, 17))

  $gold = [System.Drawing.Color]::FromArgb(201, 164, 106)
  $goldSoft = [System.Drawing.Color]::FromArgb(120, 201, 164, 106)

  # anillo
  $inset = [int]($size * 0.13)
  $ringPen = New-Object System.Drawing.Pen($goldSoft, [float]($size * 0.006))
  $g.DrawEllipse($ringPen, $inset, $inset, $size - 2 * $inset, $size - 2 * $inset)

  # monograma
  $fontSize = [float]($size * (0.30 * $scale))
  $font = New-Object System.Drawing.Font("Georgia", $fontSize, [System.Drawing.FontStyle]::Italic, [System.Drawing.GraphicsUnit]::Pixel)
  $brush = New-Object System.Drawing.SolidBrush($gold)
  $sf = New-Object System.Drawing.StringFormat
  $sf.Alignment = [System.Drawing.StringAlignment]::Center
  $sf.LineAlignment = [System.Drawing.StringAlignment]::Center
  $rectM = New-Object System.Drawing.RectangleF(0, [float]($size * 0.34), $size, [float]($size * 0.34))
  $g.DrawString("MS", $font, $brush, $rectM, $sf)

  # linea + BAZAR
  $lineW = [int]($size * 0.13)
  $lineY = [int]($size * 0.635)
  $linePen = New-Object System.Drawing.Pen($gold, [float]($size * 0.004))
  $g.DrawLine($linePen, ($size / 2 - $lineW), $lineY, ($size / 2 + $lineW), $lineY)

  $fontSmall = New-Object System.Drawing.Font("Segoe UI", [float]($size * 0.048), [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
  $rectB = New-Object System.Drawing.RectangleF(0, [float]($size * 0.665), $size, [float]($size * 0.09))
  $g.DrawString("BAZAR", $fontSmall, $brush, $rectB, $sf)

  $g.Dispose()
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
}

New-Icon 512 (Join-Path $out "icon-512.png") 1.0
New-Icon 192 (Join-Path $out "icon-192.png") 1.0
New-Icon 180 (Join-Path $out "apple-touch-icon.png") 1.0
New-Icon 64  (Join-Path $out "favicon.png") 1.0
New-Icon 512 (Join-Path $out "icon-maskable-512.png") 0.78

Write-Host "Listo"
Get-ChildItem $out -Recurse -File | Select-Object Name, Length
