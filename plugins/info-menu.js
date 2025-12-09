// Simple Menu Command

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    let plugins = Object.values(global.plugins).filter(plugin => !plugin.disabled)
    
    let help = Object.values(plugins)
      .filter(plugin => plugin.help && plugin.tags) // Filter yang punya help & tags
      .map(plugin => {
        return {
          help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
          tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
          prefix: 'customPrefix' in plugin,
          enabled: !plugin.disabled,
        }
      })

    // Group by tags
    let groups = {}
    for (let item of help) {
      if (!item.tags || !item.help) continue
      for (let tag of item.tags) {
        if (!tag || tag === 'undefined') continue // Skip undefined tags
        if (!(tag in groups)) groups[tag] = []
        groups[tag].push(item)
      }
    }

    let text = `
╭═══ ⚡ *MENU BOT* ⚡ ═══
│ 👋 Halo *${m.name}*
│
│ 📱 Bot: ${conn.user.name}
│ 🏷️ Prefix: [ ${usedPrefix} ]
│ 📂 Total Plugin: ${plugins.length}
╰═══════════════════

`

    for (let tag in groups) {
      text += `\n╭━━━ 「 *${tag.toUpperCase()}* 」\n`
      text += `│\n`
      for (let menu of groups[tag]) {
        for (let help of menu.help) {
          if (help && help !== 'undefined') { // Skip undefined
            text += `│ • ${usedPrefix}${help}\n`
          }
        }
      }
      text += `╰━━━━━━━━━━━━━━━\n`
    }

    text += `\n_Ketik ${usedPrefix}command untuk info lebih lanjut_`

    await conn.reply(m.chat, text, m)
  } catch (e) {
    console.error('Error menu:', e)
    m.reply(`Error: ${e.message}`)
  }
}

handler.help = ['menu', 'help']
handler.tags = ['info']
handler.command = /^(menu|help|\?)$/i

export default handler
