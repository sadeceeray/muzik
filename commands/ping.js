module.exports = {
  name: "ping",
  cooldown: 10,
  description: "Botun pingini gösterir.",
  execute(message) {
    message.reply(`📈 Pingim: ${Math.round(message.client.ws.ping)} ms`).catch(console.error);
  }
};
