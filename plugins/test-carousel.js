// Test Carousel/Album - Send multiple images as carousel with interactive buttons
// Format: .testcarousel


let handler = async (m, { conn }) => {
  try {
    m.reply('🔄 Sedang mengirim carousel/album...')
    
    // Fetch images
    const fetch = (await import('node-fetch')).default
    
    const img1 = await fetch('https://picsum.photos/800/600?random=1').then(r => r.buffer())
    const img2 = await fetch('https://picsum.photos/800/600?random=2').then(r => r.buffer())
    const img3 = await fetch('https://picsum.photos/800/600?random=3').then(r => r.buffer())
    
    // Try with interactive carousel format
    await conn.sendMessage(m.chat, {
      album: [
        {
          image: img1,
          caption: '📸 Photo 1 - Random Image'
        },
        {
          image: img2,
          caption: '📸 Photo 2 - Random Image'
        },
        {
          image: img3,
          caption: '📸 Photo 3 - Random Image'
        }
      ],
      caption: '🖼️ Test Carousel Album - Swipe untuk melihat foto lainnya →',
      buttons: [
        {
          buttonId: 'carousel_1',
          buttonText: { displayText: '👍 Like' },
          type: 1
        },
        {
          buttonId: 'carousel_2',
          buttonText: { displayText: '💬 Comment' },
          type: 1
        }
      ],
      footer: 'Carousel Test'
    })
    
    m.reply('✅ Album dengan button terkirim!')
    
  } catch (e) {
    console.error('Error send carousel:', e)
    
    // Fallback: Try basic album without buttons
    try {
      const fetch = (await import('node-fetch')).default
      
      const img1 = await fetch('https://picsum.photos/800/600?random=1').then(r => r.buffer())
      const img2 = await fetch('https://picsum.photos/800/600?random=2').then(r => r.buffer())
      const img3 = await fetch('https://picsum.photos/800/600?random=3').then(r => r.buffer())
      
      await conn.sendMessage(m.chat, {
        album: [
          { image: img1, caption: '📸 Photo 1' },
          { image: img2, caption: '📸 Photo 2' },
          { image: img3, caption: '📸 Photo 3' }
        ]
      })
      
      m.reply('✅ Album basic terkirim!')
    } catch (e2) {
      m.reply(`❌ Gagal mengirim carousel!\n\nError: ${e2.message}`)
    }
  }
}

handler.help = ['testcarousel']
handler.tags = ['test']
handler.command = /^(testcarousel|testalbum)$/i

export default handler
