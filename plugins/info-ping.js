// Ping Command - Check bot speed
let handler = async (m, { conn }) => {
  try {
    let start = Date.now()
    let msg = await conn.reply(m.chat, '🏓 *Pinging...*', m)
    let end = Date.now()
    let speed = end - start

    let text = `
🏓 *PONG!*

⚡ *Speed:* ${speed}ms
📡 *Uptime:* ${clockString(process.uptime())}
`.trim()

    await conn.reply(m.chat, text, msg)
  } catch (e) {
    console.error('Error ping:', e)
    m.reply(`Error: ${e.message}`)
  }
}

handler.help = ['ping', 'speed']
handler.tags = ['info']
handler.command = /^(ping|speed)$/i

export default handler

function clockString(ms) {
  let h = Math.floor(ms / 3600)
  let m = Math.floor(ms / 60) % 60
  let s = Math.floor(ms) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
