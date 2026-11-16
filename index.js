
import TelegramBot from "node-telegram-bot-api";

const token = process.env.BOT_TOKEN;

if (!token) {
  throw new Error("BOT_TOKEN არ არის მითითებული!");
}

const bot = new TelegramBot(token, { polling: true });
const waitingForToken = new Set();

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🇬🇪 მოგესალმები GeoBot-ში!", {
    reply_markup: {
      keyboard: [
        ["➕ ჩემი ბოტის დამატება"],
        ["🤖 ჩემი ბოტები"],
        ["⚙️ პარამეტრები"],
        ["ℹ️ დახმარება"]
      ],
      resize_keyboard: true
    }
  });
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text || text.startsWith("/")) return;

  if (text === "➕ ჩემი ბოტის დამატება") {
    waitingForToken.add(chatId);
    return bot.sendMessage(
      chatId,
      "🤖 გამოგზავნე იმ ბოტის API Token, რომლის შემოწმებაც გინდა."
    );
  }

  if (text === "🤖 ჩემი ბოტები") {
    return bot.sendMessage(chatId, "შენახული ბოტები ჯერ არ გაქვს.");
  }

  if (text === "⚙️ პარამეტრები") {
    return bot.sendMessage(chatId, "პარამეტრები მალე დაემატება.");
  }

  if (text === "ℹ️ დახმარება") {
    return bot.sendMessage(chatId, "GeoBot დაგეხმარება Telegram ბოტების მართვაში.");
  }

  if (waitingForToken.has(chatId)) {
    waitingForToken.delete(chatId);

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${text}/getMe`
      );
      const data = await response.json();

      if (!data.ok) {
        return bot.sendMessage(chatId, "❌ Token არასწორია. გადაამოწმე და სცადე თავიდან.");
      }

      return bot.sendMessage(
        chatId,
        `✅ Token სწორია!\n\nბოტის სახელი: ${data.result.first_name}\nUsername: @${data.result.username}\n\nშემდეგ ეტაპზე დავამატებთ მის შენახვასა და მართვას.`
      );
    } catch (error) {
      return bot.sendMessage(chatId, "⚠️ შემოწმება ვერ მოხერხდა. სცადე მოგვიანებით.");
    }
  }
});

console.log("🇬🇪 GeoBot მუშაობს!");
