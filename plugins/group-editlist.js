// Edit List - Admin edit existing list
// Format: .editlist <id> <title>|<content>

let handler = async (m, { conn, text, isAdmin, isOwner }) => {
  if (!m.isGroup) return m.reply('❌ Command ini hanya bisa digunakan di grup!')
  if (!isAdmin && !isOwner) return m.reply('❌ Command ini hanya untuk admin grup!')
  
  const chatId = m.chat
  
  if (!global.db.data.chats[chatId].lists) {
    return m.reply('❌ Belum ada list di grup ini!')
  }
  
  if (!text || !text.includes(' ') || !text.includes('|')) {
    return m.reply(`❌ Format salah!

Gunakan:
.editlist <id> <title>|<content>

Contoh:
.editlist list-1702123456789 Daftar Harga Baru|
Nasi Goreng: 20k
Mie Ayam: 15k
Es Teh: 5k

Gunakan .listall untuk melihat semua ID list`)
  }
  
  const [listId, ...rest] = text.split(' ')
  const fullText = rest.join(' ')
  
  if (!fullText.includes('|')) {
    return m.reply('❌ Format harus: <id> <title>|<content>')
  }
  
  if (!global.db.data.chats[chatId].lists[listId]) {
    return m.reply(`❌ List dengan ID "${listId}" tidak ditemukan!

Gunakan .listall untuk melihat semua ID list`)
  }
  
  const [title, ...contentArr] = fullText.split('|')
  const content = contentArr.join('|').trim()
  
  if (!title || !content) {
    return m.reply('❌ Title dan content harus diisi!')
  }
  
  // Update list
  global.db.data.chats[chatId].lists[listId].title = title.trim()
  global.db.data.chats[chatId].lists[listId].content = content
  global.db.data.chats[chatId].lists[listId].updatedAt = Date.now()
  
  m.reply(`✅ List berhasil diupdate!

📋 ID: ${listId}
📝 Title Baru: ${title.trim()}
🕒 Terakhir Update: ${new Date().toLocaleString('id-ID')}`)
}

handler.help = ['editlist <id> <title>|<content>']
handler.tags = ['group']
handler.command = /^(editlist|updatelist)$/i
handler.group = true

export default handler
