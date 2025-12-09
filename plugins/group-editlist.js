// Edit List - Admin edit existing list
// Format: .editlist <old_title>|<new_title>|<content> OR .editlist <title>|<content>

let handler = async (m, { conn, text, isAdmin, isOwner }) => {
  if (!m.isGroup) return m.reply('❌ Command ini hanya bisa digunakan di grup!')
  if (!isAdmin && !isOwner) return m.reply('❌ Command ini hanya untuk admin grup!')
  
  const chatId = m.chat
  
  if (!global.db.data.chats[chatId].lists) {
    return m.reply('❌ Belum ada list di grup ini!')
  }
  
  if (!text || !text.includes('|')) {
    return m.reply(`❌ Format salah!

Gunakan:
.editlist <old_title>|<new_title>|<content>

Contoh ubah title dan content:
.editlist Harga mie ayam|Harga mie ayam spesial|
Mie Ayam Biasa: 15k
Mie Ayam Jumbo: 20k

Atau kalau cuma ubah content (title tetap):
.editlist Harga mie ayam|
Mie Ayam Biasa: 15k
Mie Ayam Jumbo: 20k

Gunakan .list untuk melihat semua list`)
  }
  
  const parts = text.split('|')
  
  if (parts.length < 2) {
    return m.reply('❌ Format harus: <old_title>|<new_title>|<content> atau <title>|<content>')
  }
  
  let oldTitle, newTitle, content
  
  if (parts.length === 2) {
    // Format: <title>|<content> - keep same title
    oldTitle = parts[0].trim()
    newTitle = parts[0].trim()
    content = parts[1].trim()
  } else {
    // Format: <old_title>|<new_title>|<content>
    oldTitle = parts[0].trim()
    newTitle = parts[1].trim()
    content = parts.slice(2).join('|').trim()
  }
  
  if (!oldTitle || !content) {
    return m.reply('❌ Title dan content harus diisi!')
  }
  
  // Find list by old title (case-insensitive)
  const listEntry = Object.entries(global.db.data.chats[chatId].lists).find(
    ([id, list]) => list.title.toLowerCase() === oldTitle.toLowerCase()
  )
  
  if (!listEntry) {
    return m.reply(`❌ List dengan title "${oldTitle}" tidak ditemukan!

Gunakan .list untuk melihat semua list`)
  }
  
  const [listId, listData] = listEntry
  
  // Check if new title already exists (and it's not the same list)
  if (newTitle.toLowerCase() !== oldTitle.toLowerCase()) {
    const duplicateExists = Object.values(global.db.data.chats[chatId].lists).find(
      list => list.title.toLowerCase() === newTitle.toLowerCase() && list.id !== listId
    )
    
    if (duplicateExists) {
      return m.reply(`❌ List dengan title "${newTitle}" sudah ada!

Gunakan title yang berbeda`)
    }
  }
  
  // Update list
  global.db.data.chats[chatId].lists[listId].title = newTitle
  global.db.data.chats[chatId].lists[listId].content = content
  global.db.data.chats[chatId].lists[listId].updatedAt = Date.now()
  
  m.reply(`✅ List berhasil diupdate!

📝 Title: ${newTitle}
🕒 Terakhir Update: ${new Date().toLocaleString('id-ID')}`)
}

handler.help = ['editlist <old_title>|<new_title>|<content>']
handler.tags = ['group']
handler.command = /^(editlist|updatelist)$/i
handler.group = true

export default handler
