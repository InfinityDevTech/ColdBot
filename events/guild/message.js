let Discord = require('discord.js');
const oldbotprefix = require('../../commands/oldbotprefix');

module.exports = (client, Discord, db, message, member) => {
    if (message.author.bot) return;
    if (!message.guild) return;

    let BlackListCheck;
    let BlackListReason;

    db.collection('blacklist').doc(message.author.id).get().then((k) => {
        if (k.exists) {
            BlackListCheck = k.data().blacklistID;
            BlackListReason = k.data().reason;
        }
    }).then(() => {

        if (BlackListCheck === message.author.id) {
            const embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`You are forever banned from using the bot on the reason of "${BlackListReason}" if you believe this is an error contact "Infinity Dev#0296" on discord!`)
            message.author.send(embed);
            message.delete();
            return;
        }

        let prefix;

        db.collection('guilds').doc(message.guild.id).get().then((q) => {
            if (q.exists) {
                prefix = q.data().prefix;
            }
        }).then(() => {

            const args = message.content.slice(prefix.length).split(/ +/);
            const cmd = args.shift().toLowerCase();

            const command = client.commands.get(cmd)

            if (cmd === "oldbotprefix") oldbotprefix.execute(client, message, args, Discord, db);


            if (!message.content.startsWith(prefix)) return;

            if (command) command.execute(client, message, args, Discord, db);

        })
    })

}