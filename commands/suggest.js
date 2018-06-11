const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    let agree = "443668763582267402";
    let tempagree = "✅";
    let disagree = "443668763385135105";
    let tempdisagree = "⛔";
    let duration = ms(args[0]) || "86400000";
    let voteFor = args.slice(1).join(" ");

    message.channel.send(`The vote description: ${voteFor}`);
    let msg = await message.channel.send("Vote!");
    await msg.react(tempagree);
    await msg.react(tempdisagree);

    message.delete().catch();
    let reactions = await msg.awaitReactions(reaction => reaction.emoji.name === tempagree || reaction.emoji.name === tempdisagree, {
        time: duration
    });
    message.channel.send(`Voting complete! \n\n${tempagree}: ${reactions.get(tempagree).count-1}\n${tempdisagree}: ${reactions.get(tempdisagree).count-1}`);
}

module.exports.help = {
    name: "sugg"
}