// Bot Info Command
import os from 'os'

let handler = async (m, { conn }) => {
  try {
    let uptime = clockString(process.uptime())
    let totalRam = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2)
    let usedRam = ((os.totalmem() - os.freemem()) / 1024 / 1024 / 1024).toFixed(2)
    
    let text = `
╭══ ⚡ *BOT INFO* ⚡ ══
│
│ 🤖 *Bot:* ${conn.user.name}
│ 📱 *Number:* ${conn.user.jid.split('@')[0]}
│ 
│ ⏱️ *Uptime:* ${uptime}
│ 💾 *RAM:* ${usedRam}GB / ${totalRam}GB
│ 🖥️ *Platform:* ${os.platform()}
│ 🏗️ *Arch:* ${os.arch()}
│ 
│ 📦 *Node:* ${process.version}
│ 💬 *Chats:* ${Object.keys(conn.chats).length}
│
╰═══════════════════

_${global.config.watermark}_
`.trim()

    await conn.reply(m.chat, text, m)
  } catch (e) {
    console.error('Error botinfo:', e)
    m.reply(`Error: ${e.message}`)
  }
}

handler.help = ['botinfo', 'info']
handler.tags = ['info']
handler.command = /^(botinfo|info|bot)$/i

export default handler

function clockString(ms) {
  let h = Math.floor(ms / 3600)
  let m = Math.floor(ms / 60) % 60
  let s = Math.floor(ms) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
