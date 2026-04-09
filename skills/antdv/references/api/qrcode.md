---
name: qrcode
description: QRCode - ## When To Use
---

# QRCode

## When To Use

## API

| Property | Description | Type | Default | version |
| --- | --- | --- | --- | --- |
| value | scanned link | string | - |  |
| type | render type | `'canvas'` \| `'svg'` | `canvas` |  |
| icon | include image url (only image link are supported) | string | - |  |
| size | QRCode size | number | 128 |  |
| iconSize | include image size | number | 32 |  |
| color | QRCode Color | string | `#000` |  |
| bgColor | QRCode Background Color | string | `transparent` |  |
| bordered | Whether has border style | boolean | `true` |  |
| errorLevel | Error Code Level | `'L'` \| `'M'` \| `'Q'` \| `'H'` | `'M'` |  |
| status | QRCode status | `active` \| `expired` \| `loading` \| `scanned` | `active` | scanned: 4.0.9 |

### events

| Events Name | Description | Arguments    | Version |
| ----------- | ----------- | ------------ | ------- |
| refresh     | callback    | `() => void` | -       |

## FAQ

### About QRCode ErrorLevel

The ErrorLevel means that the QR code can be scanned normally after being blocked, and the maximum area that can be blocked is the error correction rate.

Generally, the QR code is divided into 4 error correction levels: Level `L` can correct about `7%` errors, Level `M` can correct about `15%` errors, Level `Q` can correct about `25%` errors, and Level `H` can correct about `30%` errors. When the content encoding of the QR code carries less information, in other words, when the value link is short, set different error correction levels, and the generated image will not change.

> For more information, see the: [https://www.qrcode.com/en/about/error_correction](https://www.qrcode.com/en/about/error_correction.html)

## Theme Tokens

Use via `theme.components.Qrcode` in ConfigProvider.

| Token | Type | Description |
| --- | --- | --- |
| `QRCodeTextColor` | `string` | - |
| `QRCodeMaskBackgroundColor` | `string` | - |
