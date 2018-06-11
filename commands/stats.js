const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let membercount = message.guild.memberCount;
    let accuratecount = Math.floor(membercount - 7);

    let embed = new Discord.RichEmbed()
        .setTitle("${server.name} status")
        .setThumbnail("https://cdn.discordapp.com/avatars/279635115435360266/d18db6533a50315c6004c9abdddeb077.png?size=2048")
        .setColor("#57ACDF")
        .addField(`Current Number of Members:`, `${membercount}`);

    return message.channel.send(embed);
}

module.exports.help = {
    name: "stats"
}