const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({
    disableEveryone: true
});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

bot.on("ready", async () => {
    console.log("Dynasty RP - Bot is online.")
    bot.user.setActivity("Dynasty RP | !help", {
        type: "WATCHING"
    });
});

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: botconfig.prefix
        };
    }

    let prefix = prefixes[message.guild.id].prefixes;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    if (!message.content.startsWith(prefix)) return;

    let commandfile = bot.commands.get(command.slice(prefix.length));
    if (commandfile) commandfile.run(bot, message, args);

});

bot.on(`guildMemberAdd`, async member => {
    console.log(`${member.id} has joined the server!`);
    let welcomechannel = member.guild.channels.find(`name`, "welcome-misc");
    let jEmbed = new Discord.RichEmbed()
        .setDescription(`Great! ${member} has joined the server!`)
        .setColor("#256EFF");
    welcomechannel.send(jEmbed);
});

bot.on(`guildMemberRemove`, async member => {
    console.log(`${member.id} has left the server!`);
    let welcomechannel = member.guild.channels.find(`name`, "welcome-misc");
    let lEmbed = new Discord.RichEmbed()
        .setDescription(`Sad story, ${member} has left the server.`)
        .setColor("#FF495C");
    welcomechannel.send(lEmbed);
});

bot.on("messageDelete", (messageDelete) => {
    if (messageDelete.author.bot) return;
    let logChannel = messageDelete.guild.channels.find("name", `main-logs`);
    if (!logChannel)
        return;
    const embed4 = new Discord.RichEmbed()
        .setTitle("Deleted Message:")
        .setColor("RANDOM")
        .setThumbnail(messageDelete.author.displayAvatarURL)
        .setDescription(`**Message sent by:**  ${messageDelete.author.tag} **Was Deleted in** ${messageDelete.channel}\n${messageDelete.content}`)
        .setTimestamp()
    return logChannel.send(embed4);
});

bot.on("messageEdit"), (messageEdit) => {
    if (messageEdit.author.bot) return;
    let logChannel = messageEdit.guild.channels.find("name", `main-logs`);
    if (!logChannel)
        return;
    const embed4 = bew Discord.RichEmbed()
        .setTitle ("Editted Message:")
        .setColor ("RANDOM")
        .setThumbnail(messageDelete.author.displayAvatarURL)
        .setDescription(`**Message sent by:**  ${messageDelete.authour.tag} **Was Deleted in** ${messageEdit.channel}\n${messageEdit.content}`)
        .setTimestamp()
    return logChannel.send(embed4);
});

bot.login(process.env.BOT_TOKEN);
