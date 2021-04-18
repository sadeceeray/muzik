const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "volume",
  aliases: ["v"],
  description: "Şu an çalan şarkının ses seviyesini değiştir.",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply("Şu an çalan bir şarkı yok!").catch(console.error);
    if (!canModifyQueue(message.member))
      return message.reply("Öncelikle bir ses kanalına katılmak gerekli!").catch(console.error);

    if (!args[0]) return message.reply(`🔊 Şu anki ses seviyesi: **${queue.volume}%**`).catch(console.error);
    if (isNaN(args[0])) return message.reply("Lütfen bir sayı seçin.").catch(console.error);
    if (Number(args[0]) > 100 || Number(args[0]) < 0 )
      return message.reply("Lütfen 0 - 100 arası bir sayı seçin.").catch(console.error);

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    return queue.textChannel.send(`Şu an ki ses seviyesi: **${args[0]}%**`).catch(console.error);
  }
};
