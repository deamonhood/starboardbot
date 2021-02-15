const Command = require("../../Base/Struct/Command");

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: "kanal-ayarla",
      aliases: ["kanalayarla"],
      description: "Starboard kanalını bu komutla ayarlayabilirsiniz.!",
      usage: "<kanal> [gerekli yıldız sayısı]"
    });
  }

  exec(message, args) {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
      return;
    }

    let kanal = message.mentions.channels.first();
    if (!kanal) return message.reply("lütfen bir kanalı etiketleyin.");
    let yıldızsayısı = args[1] || 3;
    if (isNaN(yıldızsayısı)) yıldızsayısı = 3;

    if (
      this.client.starboardsManager.starboards.find(
        s => s.guildID === message.guild.id
      )
    ) {
      return message.reply(
        `bu sunucuda zaten bir starboard kanalı var, lütfen ${process.env.PREFIX}kapat <kanal> komutuyla ayarlanan sancak kanalını devre dışı bırakın ve bu komutu tekrar kullanın.`
      );
    }

    this.client.starboardsManager.create(kanal, {
      emoji: "⭐",
      threshold: yıldızsayısı,
      selfStar: false
    });
    message.react("👌");
  }
};
