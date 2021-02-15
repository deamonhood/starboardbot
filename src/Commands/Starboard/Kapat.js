const Command = require("../../Base/Struct/Command");

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: "kapat",
      description: "Starboard sistemini bu komutla kapatabilirsiniz.!",
      usage: "<kanal>"
    });
  }

  exec(message, args) {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
      return;
    }

    let kanal = message.mentions.channels.first();
    if (!kanal) return message.reply("lütfen bir kanalı etiketleyin.");

    const starboardsInThisChannel = this.client.starboardsManager.starboards.filter(
      s => s.channelID === kanal.id
    );
    if (starboardsInThisChannel.length < 1)
      return message.reply("bu kanal starboard kanalı değil.");

    this.client.starboardsManager.delete(kanal.id, "⭐");
    message.react("👌");
  }
};
