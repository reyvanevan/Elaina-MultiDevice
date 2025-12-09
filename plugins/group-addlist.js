// Add List - Admin create new list for group
// Format: .addlist <title>|<content>

let handler = async (m, { conn, text, isAdmin, isOwner }) => {
  if (!m.isGroup) return m.reply('❌ Command ini hanya bisa digunakan di grup!')
  if (!isAdmin && !isOwner) return m.reply('❌ Command ini hanya untuk admin grup!')
  
  const chatId = m.chat
  
  // Initialize lists if not exists
  if (!global.db.data.chats[chatId].lists) {
    global.db.data.chats[chatId].lists = {}
  }
  
  // Check limit
  const currentLists = Object.keys(global.db.data.chats[chatId].lists).length
  if (currentLists >= 25) {
    return m.reply('❌ Maksimal 25 list per grup! Hapus list lama dulu.')
  }
  
  if (!text || !text.includes('|')) {
    return m.reply(`❌ Format salah!

Gunakan:
.addlist <title>|<content>

Contoh:
.addlist Daftar Harga|
Nasi Goreng: 15k
Mie Ayam: 12k
Es Teh: 5k

atau

.addlist Info Sewa|
7 Hari: 10k
30 Hari: 35k
Permanen: 50k`)
  }
  
  const [title, ...contentArr] = text.split('|')
  const content = contentArr.join('|').trim()
  
  if (!title || !content) {
    return m.reply('❌ Title dan content harus diisi!')
  }
  
  // Generate unique ID
  const listId = 'list-' + Date.now()
  
  // Save to database
  global.db.data.chats[chatId].lists[listId] = {
    id: listId,
    title: title.trim(),
    content: content,
    createdBy: m.sender,
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
  
  const totalLists = Object.keys(global.db.data.chats[chatId].lists).length
  
  m.reply(`✅ List berhasil ditambahkan!

📋 ID: ${listId}
📝 Title: ${title.trim()}
📊 Total List: ${totalLists}/25

Gunakan .list untuk melihat semua list
Gunakan .listall untuk melihat ID semua list`)
}

handler.help = ['addlist <title>|<content>']
handler.tags = ['group']
handler.command = /^addlist$/i
handler.group = true

export default handler
