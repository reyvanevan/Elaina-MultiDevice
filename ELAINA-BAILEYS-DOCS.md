# ✨ @rexxhayanasi/elaina-baileys

![npm version](https://img.shields.io/npm/v/@rexxhayanasi/elaina-baileys)
![npm downloads](https://img.shields.io/npm/dw/@rexxhayanasi/elaina-baileys)
![license](https://img.shields.io/npm/l/@rexxhayanasi/elaina-baileys)

Custom WhatsApp library built upon Baileys — enhanced, modernized, and elegant ✨

**Version:** 1.1.0-rc.4  
**License:** MIT  
**Weekly Downloads:** 949+

---

## 📌 Overview

`elaina-baileys` is a refined version of the Baileys library with cleaner API usage, exclusive features like album messaging, newsletter controls, and full-size profile uploads — tailored for modern WhatsApp automation needs.

### 🔔 Update Channel
All update information is now redirected to the WhatsApp channel:  
👉 [WhatsApp Channel](https://whatsapp.com/channel/0029Vb70uHbD8SE2w5Q9M107)

### 📊 Status
Check library status: [Status Baileys](https://status-elainabaileys.vercel.app/)

---

## 📦 Installation

### Via `package.json` Fork Baileys (NPM)

**For @whiskeysockets/baileys:**
```json
{
  "dependencies": {
    "@whiskeysockets/baileys": "npm:@rexxhayanasi/elaina-baileys"
  }
}
```

**For @adiwajshing/baileys:**
```json
{
  "dependencies": {
    "@adiwajshing/baileys": "npm:@rexxhayanasi/elaina-baileys"
  }
}
```

### Via Terminal
```bash
npm install elaina-bail@npm:@rexxhayanasi/elaina-baileys
```

### Importing

**ESM (ES Modules):**
```javascript
import makeWASocket from '@rexxhayanasi/elaina-baileys'
```

**CJS (CommonJS):**
```javascript
const { default: makeWASocket } = require('@rexxhayanasi/elaina-baileys')
```

---

## 🌟 Key Features

| Feature | Description |
|---------|-------------|
| 📢 **Channels** | Seamlessly send messages to WhatsApp Channels. |
| 🖱️ **Buttons** | Create interactive messages with button options and quick replies. |
| 🖼️ **Albums** | Send grouped images or videos as an album (carousel-like format). |
| 👤 **LID Grouping** | Handle group operations using the latest @lid addressing style. |
| 🤖 **AI Message Style** | Add a stylized "AI" icon to messages. |
| 📷 **HD Profile Pics** | Upload full-size profile pictures without cropping. |
| 🔐 **Pairing Code** | Generate custom alphanumeric pairing codes. |
| 🛠️ **Dev Experience** | Reduced noise from logs with optimized libsignal printouts. |

---

## 💡 Use Case Examples

> **Note:** Replace `id` with the actual recipient ID and `sock` with your WhatsApp socket connection variable.

### 📬 Newsletter Control

Send messages to WhatsApp Channels/Newsletter:

```javascript
await sock.sendMessage(id, {
  text: 'Hello from Elaina Baileys!',
  newsletter: {
    newsletterId: 'your_newsletter_id',
    serverMessageId: '123'
  }
})
```

### 📌 Interactive Messaging

Create interactive buttons with quick replies:

```javascript
import { generateWAMessageFromContent, proto } from '@rexxhayanasi/elaina-baileys'

const interactiveMessage = proto.Message.InteractiveMessage.create({
  body: proto.Message.InteractiveMessage.Body.create({
    text: "Choose an option below:"
  }),
  footer: proto.Message.InteractiveMessage.Footer.create({
    text: "Powered by Elaina"
  }),
  nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
    buttons: [
      {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
          display_text: "Option 1",
          id: "option_1"
        })
      },
      {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
          display_text: "Option 2",
          id: "option_2"
        })
      }
    ]
  })
})

const message = generateWAMessageFromContent(id, {
  viewOnceMessage: {
    message: {
      messageContextInfo: {
        deviceListMetadata: {},
        deviceListMetadataVersion: 2
      },
      interactiveMessage: interactiveMessage
    }
  }
}, { userJid: sock.user.id })

await sock.relayMessage(id, message.message, { 
  messageId: message.key.id 
})
```

### 🖼️ Send Album

Send multiple images/videos as a carousel album:

```javascript
await sock.sendMessage(id, {
  album: {
    caption: 'Check out these photos!',
    files: [
      { path: './image1.jpg', caption: 'Photo 1' },
      { path: './image2.jpg', caption: 'Photo 2' },
      { path: './video1.mp4', caption: 'Video 1' }
    ]
  }
})
```

### 🔐 Pairing with Custom Code

Generate custom alphanumeric pairing code:

```javascript
const code = await sock.requestPairingCode('6281234567890')
console.log('Pairing code:', code)
```

### 📊 Poll Creation

Create interactive polls:

```javascript
await sock.sendMessage(id, {
  poll: {
    name: 'What is your favorite color?',
    values: ['Red', 'Blue', 'Green', 'Yellow'],
    selectableCount: 1
  }
})
```

### 📍 Location Sharing

Send location with name and address:

```javascript
await sock.sendMessage(id, {
  location: {
    degreesLatitude: -6.2088,
    degreesLongitude: 106.8456,
    name: 'Jakarta',
    address: 'Indonesia'
  }
})
```

### 👥 Group Management

Handle group operations with LID support:

```javascript
// Create group
const group = await sock.groupCreate('My Group', ['6281234567890@s.whatsapp.net'])

// Add participants
await sock.groupParticipantsUpdate(
  'group_id@g.us',
  ['6281234567890@s.whatsapp.net'],
  'add'
)

// Remove participants
await sock.groupParticipantsUpdate(
  'group_id@g.us',
  ['6281234567890@s.whatsapp.net'],
  'remove'
)

// Update group settings
await sock.groupSettingUpdate('group_id@g.us', 'announcement')
```

---

## 🔧 Additional Features

### Interactive List Button

Create dropdown/list selection:

```javascript
const interactiveMessage = proto.Message.InteractiveMessage.create({
  body: proto.Message.InteractiveMessage.Body.create({
    text: "Select from the list below:"
  }),
  nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
    buttons: [
      {
        name: "single_select",
        buttonParamsJson: JSON.stringify({
          title: "Choose Option",
          sections: [
            {
              title: "Section 1",
              rows: [
                {
                  header: "Option 1",
                  title: "First Choice",
                  description: "Description for option 1",
                  id: "opt_1"
                },
                {
                  header: "Option 2",
                  title: "Second Choice",
                  description: "Description for option 2",
                  id: "opt_2"
                }
              ]
            }
          ]
        })
      }
    ]
  })
})
```

### Button Types

Different button types available:

```javascript
// URL Button
{
  name: "cta_url",
  buttonParamsJson: JSON.stringify({
    display_text: "Visit Website",
    url: "https://example.com"
  })
}

// Copy Button
{
  name: "cta_copy",
  buttonParamsJson: JSON.stringify({
    display_text: "Copy Code",
    copy_code: "PROMO2024"
  })
}

// Call Button
{
  name: "cta_call",
  buttonParamsJson: JSON.stringify({
    display_text: "Call Us",
    phone_number: "+6281234567890"
  })
}
```

---

## 🐞 Found a Bug?

Please contact the maintainer directly via WhatsApp:  
👉 [WhatsApp Contact](https://wa.me/6285282530851)

---

## 🙏 Credits

> **CAUTION:** Built on top of the WhiskeySockets/Baileys project. All original core logic credits go to their team. elaina-baileys extends it with thoughtful UX and DX improvements.

### 🙌 Contributors

| Developer | Role |
|-----------|------|
| **RexxHayanasi** | Main Developer |
| **Kyuu (kiuur)** | Contributor |

---

## 📝 Keywords

`baileys` `baileys-mod` `wabot` `whatsapp` `js-whatsapp` `whatsapp-api` `whatsapp-web` `whatsapp-bot` `automation` `multi-device`

---

## 📚 Resources

- **NPM Package:** [@rexxhayanasi/elaina-baileys](https://www.npmjs.com/package/@rexxhayanasi/elaina-baileys)
- **WhatsApp Channel:** [Join Channel](https://whatsapp.com/channel/0029Vb70uHbD8SE2w5Q9M107)
- **Status Page:** [Check Status](https://status-elainabaileys.vercel.app/)

---

**Last Updated:** December 9, 2025  
**Documentation Version:** 1.1.0-rc.4
