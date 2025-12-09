// Delete List - Admin delete list from group
// Format: .dellist <title>

let handler = async (m, { conn, text, isAdmin, isOwner }) => {
  if (!m.isGroup) return m.reply('❌ Command ini hanya bisa digunakan di grup!')
  if (!isAdmin && !isOwner) return m.reply('❌ Command ini hanya untuk admin grup!')
  
  const chatId = m.chat
  
  if (!global.db.data.chats[chatId].lists) {
    return m.reply('❌ Belum ada list di grup ini!')
  }
  
  if (!text) {
    return m.reply(`❌ Format salah!

Gunakan:
.dellist <title>

Contoh:
.dellist Daftar Harga

Gunakan .list untuk melihat semua list`)
  }
  
  const titleSearch = text.trim()
  
  // Find list by title (case-insensitive)
  const listEntry = Object.entries(global.db.data.chats[chatId].lists).find(
    ([id, list]) => list.title.toLowerCase() === titleSearch.toLowerCase()
  )
  
  if (!listEntry) {
    return m.reply(`❌ List dengan title "${titleSearch}" tidak ditemukan!

Gunakan .list untuk melihat semua list`)
  }
  
  const [listId, listData] = listEntry
  const listTitle = listData.title
  
  // Delete list
  delete global.db.data.chats[chatId].lists[listId]
  
  const totalLists = Object.keys(global.db.data.chats[chatId].lists).length
  
  m.reply(`✅ List berhasil dihapus!

📝 Title: ${listTitle}
📊 Total List Tersisa: ${totalLists}/25`)
}

handler.help = ['dellist <title>']
handler.tags = ['group']
handler.command = /^(dellist|deletelist|hapuslist)$/i
handler.group = true

export default handler
