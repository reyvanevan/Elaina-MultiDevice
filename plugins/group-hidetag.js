// Hidetag - Mention all members without notification
// Format: .hidetag <text>

let handler = async (m, { conn, text, isAdmin, isOwner, participants }) => {
  if (!m.isGroup) return m.reply('❌ Command ini hanya bisa digunakan di grup!')
  if (!isAdmin && !isOwner) return m.reply('❌ Command ini hanya untuk admin grup!')
  
  if (!text) {
    return m.reply(`❌ Format salah!

Gunakan:
.hidetag <text>

Contoh:
.hidetag Halo semua! Ada pengumuman penting

Note: Pesan akan terkirim tanpa notifikasi mention ke semua member`)
  }
  
  // Get all participants JID
  const mentions = participants.map(a => a.id)
  
  // Send message with hidden tag
  await conn.sendMessage(m.chat, {
    text: text,
    mentions: mentions
  }, { quoted: m })
}

handler.help = ['hidetag <text>']
handler.tags = ['group']
handler.command = /^(hidetag|h)$/i
handler.group = true
handler.admin = true

export default handler
