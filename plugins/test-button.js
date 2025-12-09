// Test Interactive Button Message
// Berdasarkan dokumentasi @rexxhayanasi/elaina-baileys

import { generateWAMessageFromContent, proto } from '@rexxhayanasi/elaina-baileys'

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    // Contoh 1: Button dengan Quick Reply
    const interactiveMessage1 = proto.Message.InteractiveMessage.create({
      body: proto.Message.InteractiveMessage.Body.create({
        text: "🎮 *Test Interactive Button*\n\nPilih salah satu tombol di bawah:"
      }),
      footer: proto.Message.InteractiveMessage.Footer.create({
        text: "Powered by Elaina-Bot"
      }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
        buttons: [
          {
            name: "quick_reply",
            buttonParamsJson: JSON.stringify({
              display_text: "✅ Button 1",
              id: `${usedPrefix}menu`
            })
          },
          {
            name: "quick_reply",
            buttonParamsJson: JSON.stringify({
              display_text: "📱 Button 2",
              id: `${usedPrefix}owner`
            })
          },
          {
            name: "quick_reply",
            buttonParamsJson: JSON.stringify({
              display_text: "🚀 Button 3",
              id: `${usedPrefix}ping`
            })
          }
        ]
      })
    })

    const message1 = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: interactiveMessage1
        }
      }
    }, { userJid: conn.user.id, quoted: m })

    await conn.relayMessage(m.chat, message1.message, { 
      messageId: message1.key.id 
    })

    // Contoh 2: Button dengan URL/Copy/Call
    setTimeout(async () => {
      const interactiveMessage2 = proto.Message.InteractiveMessage.create({
        body: proto.Message.InteractiveMessage.Body.create({
          text: "🔗 *Test Button Lainnya*\n\nCoba berbagai jenis tombol:"
        }),
        footer: proto.Message.InteractiveMessage.Footer.create({
          text: "Elaina-Bot Interactive"
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
          buttons: [
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "🌐 Visit Website",
                url: "https://github.com/reyvanevan/Elaina-MultiDevice"
              })
            },
            {
              name: "cta_copy",
              buttonParamsJson: JSON.stringify({
                display_text: "📋 Copy Code",
                copy_code: "npm install @rexxhayanasi/elaina-baileys"
              })
            },
            {
              name: "cta_call",
              buttonParamsJson: JSON.stringify({
                display_text: "📞 Call Owner",
                phone_number: "+6285282530851"
              })
            }
          ]
        })
      })

      const message2 = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2
            },
            interactiveMessage: interactiveMessage2
          }
        }
      }, { userJid: conn.user.id })

      await conn.relayMessage(m.chat, message2.message, { 
        messageId: message2.key.id 
      })
    }, 2000)

  } catch (e) {
    console.error('Error test-button:', e)
    m.reply(`❌ Error: ${e.message}\n\nStack: ${e.stack}`)
  }
}

handler.help = ['testbutton', 'testbtn']
handler.tags = ['test']
handler.command = /^(testbutton|testbtn)$/i

export default handler
