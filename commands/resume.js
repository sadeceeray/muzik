const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "resume",
  aliases: ["r","devam"],
  description: "Durdurulan müziği devam ettirir.",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("Çalınan şarkı yok!.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!queue.playing) {
      queue.playing = true;
      queue.connection.dispatcher.resume();
      return queue.textChannel.send(`${message.author} ▶ Müziği başlattı!`).catch(console.error);
    }

    return message.reply("Duraklatılmış şarkı yok!.").catch(console.error);
  }
};
