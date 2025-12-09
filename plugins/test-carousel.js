// Test Carousel - Send carousel with interactive buttons (kelvdra/bails format)
// Format: .testcarousel


let handler = async (m, { conn }) => {
  try {
    m.reply('🔄 Sedang mengirim carousel dengan button interactive...')
    
    // Send carousel with kelvdra/bails format
    await conn.sendMessage(
      m.chat,
      {
        carouselMessage: {
          caption: "🎉 Pilih Paket Premium Bot",
          footer: "Powered By Elaina Bot",
          cards: [
            // Card 1 - Product Mode
            {
              headerTitle: "`</> Paket Basic </>`",
              imageUrl: "https://picsum.photos/800/600?random=1",
              productTitle: "Basic Package",
              productDescription: "Akses fitur dasar bot",
              bodyText: "Fitur:\n✅ Command dasar\n✅ Support 24/7\n✅ Update rutin",
              buttons: [
                {
                  name: "cta_url",
                  params: {
                    display_text: "Info Lengkap",
                    url: "https://wa.me/6281234567890",
                    merchant_url: "https://wa.me/6281234567890"
                  }
                }
              ]
            },
            // Card 2 - Product Mode
            {
              headerTitle: "`</> Paket Premium </>`",
              imageUrl: "https://picsum.photos/800/600?random=2",
              productTitle: "Premium Package",
              productDescription: "Akses semua fitur premium",
              bodyText: "Fitur:\n✅ Semua fitur Basic\n✅ AI Advanced\n✅ Priority Support",
              buttons: [
                {
                  name: "cta_call",
                  params: {
                    display_text: "Hubungi Admin",
                    phone_number: "+6281234567890"
                  }
                }
              ]
            },
            // Card 3 - Regular Mode
            {
              headerTitle: "`</> Info Bot </>`",
              imageUrl: "https://picsum.photos/800/600?random=3",
              bodyText: "📱 Elaina MultiDevice Bot\n\n🤖 Bot WhatsApp dengan fitur lengkap\n⚡ Cepat & Stabil\n🔒 Aman & Terpercaya",
              buttons: [
                {
                  name: "cta_url",
                  params: {
                    display_text: "GitHub Repo",
                    url: "https://github.com/reyvanevan/Elaina-MultiDevice",
                    merchant_url: "https://github.com/reyvanevan/Elaina-MultiDevice"
                  }
                }
              ]
            }
          ]
        }
      },
      { quoted: m },
      conn
    )
    
    m.reply('✅ Carousel interactive terkirim! Swipe dan klik button.')
    
  } catch (e) {
    console.error('Error send carousel:', e)
    m.reply(`❌ Gagal mengirim carousel!
    
Error: ${e.message}

Stack: ${e.stack}

Note: Pastikan menggunakan @kelvdra/bails library`)
  }
}

handler.help = ['testcarousel']
handler.tags = ['test']
handler.command = /^(testcarousel|testalbum)$/i

export default handler
