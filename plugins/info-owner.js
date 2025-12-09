// Owner Info Command
let handler = async (m, { conn }) => {
  try {
    let owner = global.config.owner[0]
    let number = owner[0]
    let name = owner[1]
    
    let text = `
👤 *OWNER INFO*

📝 Name: ${name}
📱 Number: ${number}
🔗 WhatsApp: wa.me/${number}

_Bot ini dikelola oleh owner di atas_
`.trim()

    // Send contact card
    await conn.sendContact(m.chat, [[number, name]], m)
    await conn.reply(m.chat, text, m)
    
  } catch (e) {
    console.error('Error owner:', e)
    m.reply(`Error: ${e.message}`)
  }
}

handler.help = ['owner']
handler.tags = ['info']
handler.command = /^(owner|creator)$/i

export default handler
