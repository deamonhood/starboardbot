const { Client, Collection } = require("discord.js");
const Logger = require("../Modules/Logger");
const Functions = require("../Functions");
const { PREFIX, TOKEN, AUTHOR_ID } = process.env;
const StarboardsManager = require("discord-starboards");

class MyClient extends Client {
  constructor(options = {}) {
    super(options);

    this.commands = new Collection();
    this.cooldowns = new Collection();

    this.logger = new Logger();
    this.function = new Functions(this);

    this.prefix = PREFIX;
    this.token = TOKEN;

    this.starboardsManager = new StarboardsManager(this, {
      storage: "../../starboardlar.json",
      translateClickHere: "`[mesaja gitmek için tıklayın]`"
    });

    this.once("ready", this.ready);
    this.on("message", this.handle);
  }

  async ready() {
    console.log(`- Bot Adı             >   ${this.user.tag}`);
    console.log(`- Sunucu Sayısı       >   ${this.guilds.cache.size}`);
    console.log(`- Komut Sayısı        >   ${this.commands.size}`);
    console.log(
      `- Davet URL'si        >   ${await this.generateInvite({
        permissions: []
      })}`
    );
    this.logger.log("Bot hazır!", "READY");
  }

  handle(message) {
    if (message.author.bot || !message.content.startsWith(this.prefix)) return;

    let [command, ...args] = message.content
      .slice(this.prefix.length)
      .trim()
      .split(/ +/g);

    let cmd =
      this.commands.get(command.toLowerCase()) ||
      this.commands.find(
        data => data.aliases && data.aliases.includes(command.toLowerCase())
      );

    if (!cmd) return;

    if (cmd.guildOnly && !message.guild) return;

    if (cmd.usage && !args.length) {
      let reply = "Lütfen bu komutu bu şekilde kullanın:";
      if (cmd.usage)
        reply += `\n\`\`\`${this.prefix}${cmd.name} ${cmd.usage}\`\`\``;
      return message.channel.send(reply);
    }

    if (cmd.ownerOnly && message.author.id !== AUTHOR_ID) return;

    if (!this.cooldowns.has(cmd.name))
      this.cooldowns.set(cmd.name, new Collection());

    let now = Date.now();
    let timestamps = this.cooldowns.get(cmd.name);
    let cooldownAmount = cmd.cooldown * 1000;
    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        return;
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
      cmd.exec(message, args);
    } catch (e) {
      this.logger.log(`Komut İşleyici Hatası |  ${cmd.name}: ${e}`, "ERROR");
      message.reply("bir hata oluştu.");
    }
  }

  async launch() {
    Promise.all([this.function.load(), super.login(this.token)]);
  }
}

module.exports = MyClient;
