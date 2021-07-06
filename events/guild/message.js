let Discord = require('discord.js');
const oldbotprefix = require('../../commands/oldbotprefix');
require('dotenv').config()
const Perspective = require('perspective-api-client')



//main module
module.exports = (client, Discord, db, message, member) => {
    const cooldowns = client.cooldowns
    if (message.author.bot) return;
    if (!message.guild) return;

    let BlackListCheck;
    let BlackListReason;

    //gets the blacklist and checks it
    db.collection('blacklist').doc(message.author.id).get().then((k) => {
        if (k.exists) {
            BlackListCheck = k.data().blacklistID;
            BlackListReason = k.data().reason;
        }
    }).then(async () => {

        //sends blacklist message
        if (BlackListCheck === message.author.id) {
            const embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`You are forever banned from using the bot on the reason of "${BlackListReason}" if you believe this is an error contact "Infinity Dev#0296" on discord!`)
            message.author.send(embed);
            message.delete();
            return;
        }

        let prefix;

        //gets guild prefix and the anti-spam
        db.collection('guilds').doc(message.guild.id).get().then((q) => {
            if (q.exists) {
                prefix = q.data().prefix;
            }
        }).then(async () => {
            let toggle;
            let spamTolerance;
            let logchannel;

            db.collection('guilds').doc(message.guild.id).get().then((j) => {
                if (j.exists) {
                    toggle = j.data().spamFilter;
                    spamTolerance = j.data().spamTolerance;
                    logchannel = j.data().logChannel
                }
            }).then(async () => {
                if (toggle === 'true') {

                    const perspective = new Perspective({ apiKey: process.env.API_KEY })
                    const toxic = await perspective.analyze(message.content);
                    let obj = JSON.parse(JSON.stringify(toxic))


                    if (Math.ceil(obj.attributeScores.TOXICITY.summaryScore.value * 100) > spamTolerance) {

                        //toxicity deletion
                        const embed = new Discord.MessageEmbed()
                            .setColor("WHITE")
                            .setTitle("Message Deletion: ")
                            .addFields(
                                { name: '\u200b', value: `Your message **"${message.content}"**, has been deleted from the server **"${message.guild.name}"** because of the toxicity percentage (${Math.ceil(obj.attributeScores.TOXICITY.summaryScore.value * 100)}%)` },

                            )
                        message.author.send(embed)
                            .then(msg => {
                                setTimeout(() => msg.delete(), 60000)
                            })
                        let m2 = message;
                        message.delete();

                        if (logchannel) {
                            //logging for deletion
                            const embed2 = new Discord.MessageEmbed()
                                .setColor("WHITE")
                                .setTitle("Message Deletion: ")
                                .addFields(
                                    { name: '\u200b', value: `The message **"${m2.content}"**, has been deleted because of the toxicity percentage (${Math.ceil(obj.attributeScores.TOXICITY.summaryScore.value * 100)}%) the message was written by **${m2.author.tag}**` },

                                )
                            client.channels.cache.get(logchannel).send(embed2)
                        }
                    }
                }
            })

            //calculates the command if its not toxic :)
            const args = message.content.slice(prefix.length).split(/ +/);
            const cmd = args.shift().toLowerCase();

            const command = client.commands.get(cmd)
            if (!cooldowns.has(command.name)) {
                cooldowns.set(command.name, new Discord.Collection());
            }

            const now = Date.now();
            const timestamps = cooldowns.get(command.name)
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
            const cooldownAmount = (command.cooldown || 3) * 1000;

            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    return message.reply(`please wait \`${timeLeft.toFixed(1)}\` more second(s) before reusing the \`${command.name}\` command.`);
                }
            }
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
            try {

            if (cmd === "oldbotprefix") oldbotprefix.execute(client, message, args, Discord, db);


            if (!message.content.startsWith(prefix)) return;

            if (command) command.execute(client, message, args, Discord, db)
            } catch (error) {
                message.channel.send("An error has occured ``` " + error + "```")
            }




        })
    })

}