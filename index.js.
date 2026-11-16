import TelegramBot from "node-telegram-bot-api";

const token = process.env.BOT_TOKEN;

if (!token) {
  throw new Error("BOT_TOKEN არ არის მითითებული!");
}

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "🇬🇪 მოგესალმები GeoBot-ში!", {
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

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "➕ ჩემი ბოტის დამატება") {
    bot.sendMessage(chatId, "🤖 გამოგზავნე შენი ბოტის Token.");
  }

  if (text === "🤖 ჩემი ბოტები") {
    bot.sendMessage(chatId, "შენი დამატებული ბოტები აქ გამოჩნდება.");
  }

  if (text === "⚙️ პარამეტრები") {
    bot.sendMessage(chatId, "პარამეტრები მალე დაემატება.");
  }

  if (text === "ℹ️ დახმარება") {
    bot.sendMessage(chatId, "GeoBot დაგეხმარება Telegram ბოტების მართვაში.");
  }
});

console.log("GeoBot მუშაობს!");
