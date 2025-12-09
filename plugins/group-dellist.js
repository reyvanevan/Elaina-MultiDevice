// Delete List - Admin delete list from group
// Format: .dellist <id>

let handler = async (m, { conn, args, isAdmin, isOwner }) => {
  if (!m.isGroup) return m.reply('❌ Command ini hanya bisa digunakan di grup!')
  if (!isAdmin && !isOwner) return m.reply('❌ Command ini hanya untuk admin grup!')
  
  const chatId = m.chat
  
  if (!global.db.data.chats[chatId].lists) {
    return m.reply('❌ Belum ada list di grup ini!')
  }
  
  if (!args[0]) {
    return m.reply(`❌ Format salah!

Gunakan:
.dellist <id>

Contoh:
.dellist list-1702123456789

Gunakan .listall untuk melihat semua ID list`)
  }
  
  const listId = args[0]
  
  if (!global.db.data.chats[chatId].lists[listId]) {
    return m.reply(`❌ List dengan ID "${listId}" tidak ditemukan!

Gunakan .listall untuk melihat semua ID list`)
  }
  
  const listTitle = global.db.data.chats[chatId].lists[listId].title
  
  // Delete list
  delete global.db.data.chats[chatId].lists[listId]
  
  const totalLists = Object.keys(global.db.data.chats[chatId].lists).length
  
  m.reply(`✅ List berhasil dihapus!

📋 ID: ${listId}
📝 Title: ${listTitle}
📊 Total List Tersisa: ${totalLists}/25`)
}

handler.help = ['dellist <id>']
handler.tags = ['group']
handler.command = /^(dellist|deletelist|hapuslist)$/i
handler.group = true

export default handler
