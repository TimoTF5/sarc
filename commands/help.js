const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let pages = ["Catagories:", "Fun stuff:", "Currency:", "Gambling:", "Moderation:", "Tickets:", "Information:"];
    let pagesinfo = ["Fun stuff, Currency, Gambling, Moderation, Tickets, Information", "!avatar (USER), !weer (PLACE), !sugg (SUGGESTION)", "!coins", "!jackpot (BET)", "!help, !report (USER)", "!new (SUBJECT), !add (USER), !close", "!botinfo, !stats"]
    let page = 1;
    const embed = new Discord.RichEmbed()
        .setColor("#57ACDF")
        .setFooter(`Page ${page} of ${pages.length}`)
        .setDescription(pagesinfo[page - 1])
        .setTitle(pages[page - 1]);

    message.channel.send(embed).then(msg => {
        msg.react("⏪").then(r => {
            msg.react("⏩")

            const backwardsFilter = (reaction, user) => reaction.emoji.name === "⏪" && user.id === message.author.id;
            const forwardsFilter = (reaction, user) => reaction.emoji.name === "⏩" && user.id === message.author.id;

            const backwards = msg.createReactionCollector(backwardsFilter, {
                time: 60000
            });
            const forwards = msg.createReactionCollector(forwardsFilter, {
                time: 60000
            });

            backwards.on("collect", r => {
                if (page === 1) return;
                page--;
                embed.setTitle(pages[page - 1]);
                embed.setDescription(pagesinfo[page - 1]);
                embed.setFooter(`Page ${page} of ${pages.length}`);
                msg.edit(embed);
            });

            forwards.on("collect", r => {
                if (page === pages.length) return;
                page++;
                embed.setTitle(pages[page - 1]);
                embed.setDescription(pagesinfo[page - 1]);
                embed.setFooter(`Page ${page} of ${pages.length}`);
                msg.edit(embed);
            });
        })
    })
}

module.exports.help = {
    name: "help"
}
