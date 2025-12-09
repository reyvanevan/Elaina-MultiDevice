// Test List Button Interactive
// Contoh button dengan list/dropdown menu

import { generateWAMessageFromContent, proto } from '@rexxhayanasi/elaina-baileys'

let handler = async (m, { conn, usedPrefix }) => {
  try {
    const interactiveMessage = proto.Message.InteractiveMessage.create({
      body: proto.Message.InteractiveMessage.Body.create({
        text: "📋 *Test List Button*\n\nKlik tombol di bawah untuk melihat list pilihan"
      }),
      footer: proto.Message.InteractiveMessage.Footer.create({
        text: "Elaina-Bot Interactive List"
      }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
        buttons: [
          {
            name: "single_select",
            buttonParamsJson: JSON.stringify({
              title: "📂 Pilih Menu",
              sections: [
                {
                  title: "⚙️ Main Menu",
                  rows: [
                    {
                      header: "📜 Menu Bot",
                      title: "Lihat Semua Menu",
                      description: "Tampilkan daftar lengkap command bot",
                      id: `${usedPrefix}menu`
                    },
                    {
                      header: "👤 Owner Info",
                      title: "Info Owner",
                      description: "Lihat informasi owner bot",
                      id: `${usedPrefix}owner`
                    },
                    {
                      header: "🏓 Ping Test",
                      title: "Cek Ping",
                      description: "Test kecepatan respon bot",
                      id: `${usedPrefix}ping`
                    }
                  ]
                },
                {
                  title: "🎮 Features",
                  rows: [
                    {
                      header: "🎯 Game Menu",
                      title: "Games",
                      description: "Lihat daftar game yang tersedia",
                      id: `${usedPrefix}game`
                    },
                    {
                      header: "🔍 Search Tools",
                      title: "Search",
                      description: "Tools untuk pencarian",
                      id: `${usedPrefix}search`
                    }
                  ]
                }
              ]
            })
          },
          {
            name: "quick_reply",
            buttonParamsJson: JSON.stringify({
              display_text: "ℹ️ Info Bot",
              id: `${usedPrefix}botinfo`
            })
          }
        ]
      })
    })

    const message = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: interactiveMessage
        }
      }
    }, { userJid: conn.user.id, quoted: m })

    await conn.relayMessage(m.chat, message.message, { 
      messageId: message.key.id 
    })

  } catch (e) {
    console.error('Error test-list:', e)
    m.reply(`❌ Error:\n${e.message}`)
  }
}

handler.help = ['testlist']
handler.tags = ['test']
handler.command = /^(testlist|tl)$/i

export default handler
