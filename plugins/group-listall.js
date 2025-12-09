// List All - Show all list IDs for admin
// Format: .listall

let handler = async (m, { conn, isAdmin, isOwner, usedPrefix }) => {
  if (!m.isGroup) return m.reply('❌ Command ini hanya bisa digunakan di grup!')
  if (!isAdmin && !isOwner) return m.reply('❌ Command ini hanya untuk admin grup!')
  
  const chatId = m.chat
  
  if (!global.db.data.chats[chatId].lists) {
    return m.reply(`❌ Belum ada list di grup ini!

Admin bisa membuat list dengan:
${usedPrefix}addlist <title>|<content>`)
  }
  
  const lists = global.db.data.chats[chatId].lists
  const listIds = Object.keys(lists)
  
  if (listIds.length === 0) {
    return m.reply(`📋 Belum ada list di grup ini!

Buat list baru dengan:
${usedPrefix}addlist <title>|<content>`)
  }
  
  let text = `╭━━━━━━━━━━━━━━━━━━
│ 📋 *DAFTAR LIST GRUP*
│ 📊 Total: ${listIds.length}/25
├━━━━━━━━━━━━━━━━━━
│
`
  
  Object.values(lists).forEach((list, i) => {
    const createdDate = new Date(list.createdAt).toLocaleDateString('id-ID')
    text += `│ ${i + 1}. *${list.title}*\n`
    text += `│    🆔 \`${list.id}\`\n`
    text += `│    📅 ${createdDate}\n`
    text += `│\n`
  })
  
  text += `├━━━━━━━━━━━━━━━━━━
│ 🛠️ *Command Admin:*
│ • ${usedPrefix}addlist <title>|<content>
│ • ${usedPrefix}editlist <id> <title>|<content>
│ • ${usedPrefix}dellist <id>
│
│ 👥 *Command Member:*
│ • ${usedPrefix}list - Lihat semua list
│ • ${usedPrefix}list <id> - Lihat detail
╰━━━━━━━━━━━━━━━━━━`
  
  m.reply(text)
}

handler.help = ['listall']
handler.tags = ['group']
handler.command = /^(listall|alllist|daftarlist)$/i
handler.group = true

export default handler
