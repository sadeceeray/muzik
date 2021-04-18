const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "loop",
  aliases: ["l","döngü"],
  description: "Şarkıyı döngüye alır",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("Çalan bir şarkı yok!").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    // toggle from false to true and reverse
    queue.loop = !queue.loop;
    return queue.textChannel.send(`Şarkı döngü durumu: ${queue.loop ? "**Açık**" : "**Kapalı**"}`).catch(console.error);
  }
};
