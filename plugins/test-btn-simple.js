// Test Interactive Button - Simple Version
// Contoh sederhana button interaktif

import { generateWAMessageFromContent, proto } from '@rexxhayanasi/elaina-baileys'

let handler = async (m, { conn, usedPrefix }) => {
  try {
    // Interactive message dengan button
    const interactiveMessage = {
      body: proto.Message.InteractiveMessage.Body.create({
        text: `👋 *Halo ${m.name}!*\n\n🎯 Ini adalah contoh Interactive Button dari Elaina Bot.\n\nSilahkan pilih menu di bawah:`
      }),
      footer: proto.Message.InteractiveMessage.Footer.create({
        text: "© Elaina-Bot 2025"
      }),
      header: proto.Message.InteractiveMessage.Header.create({
        title: "⚡ INTERACTIVE BUTTON TEST",
        hasMediaAttachment: false
      }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
        buttons: [
          {
            name: "quick_reply",
            buttonParamsJson: JSON.stringify({
              display_text: "📜 Show Menu",
              id: `${usedPrefix}menu`
            })
          },
          {
            name: "quick_reply", 
            buttonParamsJson: JSON.stringify({
              display_text: "🏓 Check Ping",
              id: `${usedPrefix}ping`
            })
          },
          {
            name: "quick_reply",
            buttonParamsJson: JSON.stringify({
              display_text: "👤 Owner Info",
              id: `${usedPrefix}owner`
            })
          }
        ]
      })
    }

    const message = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.create(interactiveMessage)
        }
      }
    }, { userJid: conn.user.id, quoted: m })

    await conn.relayMessage(m.chat, message.message, { 
      messageId: message.key.id 
    })

  } catch (e) {
    console.error('Error test-btn:', e)
    m.reply(`❌ Error mengirim button:\n${e.message}`)
  }
}

handler.help = ['testbtn']
handler.tags = ['test']
handler.command = /^(testbtn|tb)$/i

export default handler
