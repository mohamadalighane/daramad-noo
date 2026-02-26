export async function sendTelegramNotification(message) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHANNEL_ID
  if (!token || !chatId) return

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    })
  } catch (e) {
    console.error('Telegram error:', e)
  }
}

export async function sendTelegramFile(chatId, fileUrl, caption) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  if (!token) return

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: `✅ <b>خرید موفق!</b>\n\n${caption}\n\n<a href="${fileUrl}">👆 دانلود مقاله</a>\n\n⏰ این لینک ۲۴ ساعت اعتبار دارد.`,
        parse_mode: 'HTML',
      }),
    })
  } catch (e) {
    console.error('Telegram file send error:', e)
  }
}
