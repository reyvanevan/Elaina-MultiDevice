// Show List - Display lists with interactive button
// Format: .list [id]

import { generateWAMessageFromContent, proto } from '@rexxhayanasi/elaina-baileys'

let handler = async (m, { conn, args, usedPrefix }) => {
  if (!m.isGroup) return m.reply('❌ Command ini hanya bisa digunakan di grup!')
  
  const chatId = m.chat
  
  if (!global.db.data.chats[chatId].lists) {
    global.db.data.chats[chatId].lists = {}
  }
  
  const lists = global.db.data.chats[chatId].lists
  const listIds = Object.keys(lists)
  
  if (listIds.length === 0) {
    return m.reply(`📋 Belum ada list di grup ini!

Admin bisa membuat list dengan:
${usedPrefix}addlist <title>|<content>

Contoh:
${usedPrefix}addlist Daftar Harga|Nasi Goreng: 15k\\nMie Ayam: 12k`)
  }
  
  // If specific ID provided, show that list
  if (args[0]) {
    const listId = args[0]
    if (!lists[listId]) {
      return m.reply(`❌ List dengan ID "${listId}" tidak ditemukan!

Gunakan ${usedPrefix}list untuk melihat semua list`)
    }
    
    const list = lists[listId]
    const createdDate = new Date(list.createdAt).toLocaleString('id-ID')
    const updatedDate = new Date(list.updatedAt).toLocaleString('id-ID')
    
    const text = `
╭━━━━━━━━━━━━━━━━
│ 📋 *${list.title}*
├━━━━━━━━━━━━━━━━
│
${list.content}
│
├━━━━━━━━━━━━━━━━
│ 🆔 ID: ${list.id}
│ 📅 Dibuat: ${createdDate}
│ 🔄 Update: ${updatedDate}
╰━━━━━━━━━━━━━━━━
`.trim()
    
    return m.reply(text)
  }
  
  // Show all lists with interactive button
  try {
    const sections = []
    
    // Group lists by 10 items per section
    const listsArray = Object.values(lists)
    for (let i = 0; i < listsArray.length; i += 10) {
      const chunk = listsArray.slice(i, i + 10)
      sections.push({
        title: `📂 List ${i + 1}-${Math.min(i + 10, listsArray.length)}`,
        rows: chunk.map(list => ({
          header: "📋 " + list.title,
          title: list.title,
          description: `ID: ${list.id} • Dibuat: ${new Date(list.createdAt).toLocaleDateString('id-ID')}`,
          id: `${usedPrefix}list ${list.id}`
        }))
      })
    }
    
    const interactiveMessage = proto.Message.InteractiveMessage.create({
      body: proto.Message.InteractiveMessage.Body.create({
        text: `📋 *DAFTAR LIST GRUP*\n\n📊 Total: ${listIds.length}/25 list\n\nPilih list untuk melihat detail:`
      }),
      footer: proto.Message.InteractiveMessage.Footer.create({
        text: `${conn.user.name} • ${new Date().toLocaleDateString('id-ID')}`
      }),
      header: proto.Message.InteractiveMessage.Header.create({
        title: "📂 LIST MANAGEMENT",
        hasMediaAttachment: false
      }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
        buttons: [
          {
            name: "single_select",
            buttonParamsJson: JSON.stringify({
              title: "📋 Pilih List",
              sections: sections
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
    console.error('Error show list:', e)
    
    // Fallback to text list
    let text = `📋 *DAFTAR LIST GRUP*\n\n📊 Total: ${listIds.length}/25\n\n`
    
    Object.values(lists).forEach((list, i) => {
      text += `${i + 1}. *${list.title}*\n`
      text += `   ID: \`${list.id}\`\n`
      text += `   📅 ${new Date(list.createdAt).toLocaleDateString('id-ID')}\n\n`
    })
    
    text += `\nGunakan ${usedPrefix}list <id> untuk melihat detail`
    
    m.reply(text)
  }
}

handler.help = ['list [id]']
handler.tags = ['group']
handler.command = /^list$/i
handler.group = true

export default handler
