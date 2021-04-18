const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "remove",
  aliases: ["rm","kaldır"],
  description: "Sıradan şarkıyı kaldırır.",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Oynatma listesi yok!.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!args.length) return message.reply(`**Kullanım:** ${message.client.prefix}remove <liste numarası>`);
    if (isNaN(args[0])) return message.reply(`**Kullanım:** ${message.client.prefix}remove <liste numarası>`);

    const song = queue.songs.splice(args[0] - 1, 1);
    queue.textChannel.send(`${message.author} ❌ **${song[0].title}** adlı şarkı, oynatma listesinden kaldırıldı.`);
  }
};
