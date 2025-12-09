# 🎠 Carousel Message Documentation

Documentation from @kelvdra/bails package for Carousel implementation.

## 📌 Overview

Carousel messages allow sending interactive cards with images, buttons, and actions in a swipeable format.

---

## 🎨 Carousel Format

### Basic Structure

```javascript
await conn.sendMessage(
    m.chat,
    {
        carouselMessage: {
            caption: "Main Caption Text",
            footer: "Footer Text",
            cards: [
                // Card objects here
            ]
        }
    },
    { quoted: m },
    conn
);
```

---

## 🃏 Card Types

### 1. Product Card Mode

```javascript
{
    headerTitle: "`</> Owner Bot </>`",
    imageUrl: "https://example.com/image.jpg",
    productTitle: "Premium Bot",
    productDescription: "Dapatkan akses premium",
    bodyText: "[Hydra]\n- Chat yang penting aja\n- Jangan telpon owner",
    buttons: [
        {
            name: "cta_call",
            params: { 
                display_text: "Contact Owner", 
                phone_number: "+6287784901856" 
            }
        }
    ]
}
```

### 2. Regular Image Card Mode

```javascript
{
    headerTitle: "`</> Bot Elaina </>`",
    imageUrl: "https://example.com/image.jpg",
    bodyText: "[Elaina AI]\n- Jangan spam bot\n- Jangan telpon bot",
    buttons: [
        {
            name: "cta_url",
            params: {
                display_text: "Chat Bot",
                url: "https://wa.me/6281918402014",
                merchant_url: "https://wa.me/6281918402014"
            }
        }
    ]
}
```

---

## 🔘 Button Types

### 1. Call Button (`cta_call`)

```javascript
{
    name: "cta_call",
    params: { 
        display_text: "Call Us",
        phone_number: "+6281234567890" 
    }
}
```

### 2. URL Button (`cta_url`)

```javascript
{
    name: "cta_url",
    params: {
        display_text: "Visit Website",
        url: "https://example.com",
        merchant_url: "https://example.com" // optional
    }
}
```

### 3. Quick Reply Button (`quick_reply`)

```javascript
{
    name: "quick_reply",
    buttonParamsJson: JSON.stringify({
        display_text: "Click Me",
        id: "button_id"
    })
}
```

### 4. Copy Button (`cta_copy`)

```javascript
{
    name: "cta_copy",
    buttonParamsJson: JSON.stringify({
        display_text: "Copy Code",
        copy_code: "PROMO2024"
    })
}
```

---

## 📝 Complete Example

```javascript
await conn.sendMessage(
    m.chat,
    {
        carouselMessage: {
            caption: "Pilih Paket Premium",
            footer: "Powered By MyBot",
            cards: [
                {
                    headerTitle: "Premium Basic",
                    imageUrl: "https://example.com/basic.jpg",
                    productTitle: "Paket Basic",
                    productDescription: "Akses fitur dasar",
                    bodyText: "Fitur:\n- Command dasar\n- Support 24/7",
                    buttons: [
                        {
                            name: "cta_url",
                            params: {
                                display_text: "Beli Sekarang",
                                url: "https://payment.com/basic"
                            }
                        }
                    ]
                },
                {
                    headerTitle: "Premium Pro",
                    imageUrl: "https://example.com/pro.jpg",
                    productTitle: "Paket Pro",
                    productDescription: "Akses fitur lengkap",
                    bodyText: "Fitur:\n- Semua fitur\n- Priority support",
                    buttons: [
                        {
                            name: "cta_call",
                            params: {
                                display_text: "Hubungi Admin",
                                phone_number: "+6281234567890"
                            }
                        }
                    ]
                }
            ]
        }
    },
    { quoted: m },
    conn
);
```

---

## ⚠️ Important Notes

1. **Image URL**: Must be valid and accessible image URL
2. **Button Limit**: Usually max 2-3 buttons per card
3. **Card Limit**: Recommended max 10 cards per carousel
4. **Format**: Different from `album` format - carousel uses `carouselMessage` key
5. **Library**: This format is specific to @kelvdra/bails, might not work on other baileys forks

---

## 🔄 Difference: Carousel vs Album

| Feature | Carousel | Album |
|---------|----------|-------|
| Format | `carouselMessage` | `album` array |
| Interactive | ✅ Buttons, product info | ❌ Just media |
| Use Case | Product showcase, menus | Photo galleries |
| Swipeable | ✅ Yes | ✅ Yes |
| Buttons | ✅ Per card | ❌ No |

---

## 🎯 Best Practices

1. Use **product mode** for commercial content
2. Use **image mode** for general information
3. Keep **bodyText** concise (max 3-4 lines)
4. Use **clear button labels** (max 20 chars)
5. Test with **2-3 cards** first before scaling
6. Use **high-quality images** (recommended 800x600)

---

**Source:** [@kelvdra/bails NPM Package](https://www.npmjs.com/package/@kelvdra/bails)  
**Last Updated:** December 9, 2025  
**Version:** 1.4.6
