const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let botIcon = bot.user.displayAvatarURL;

    let botEmbed = new Discord.RichEmbed()
        .setTitle("Bot information")
        .setColor("#57ACDF")
        .addField("Bot name:", `${bot.user.username}`)
        .addField("Created with:", `${bot.user.createdAt}`)
        .setFooter("Created by Timo Nismo (TimoTF5#6969).", "https://cdn.discordapp.com/avatars/440434042425442304/5ecb4c4e82a966245866610e260990f5.png?size=2048");

    return message.channel.send(botEmbed);
}

module.exports.help = {
    name: "botinfo"
}