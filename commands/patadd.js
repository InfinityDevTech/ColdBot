const Discord = require("discord.js");

module.exports = {
    name: 'patadd',
    description: "Adds a patron user",
    async execute(client, message, args, Discord, db) {
        if (!message.guild) return;
        if (message.author.id === "574445866220388352") {

            const member = message.mentions.users.first().id

            if (member) {

                let rank = args[1];

                if (!rank) rank = "1";

                const userId = message.mentions.users.first().id
                const member2 = await message.guild.members.fetch({user: userId})
                const dmChannel = await member2.createDM()

                const embed = new Discord.MessageEmbed()
                .setColor("WHITE")
                  .setTitle("Patronage added!")
                  .addFields(
                    { name: '\u200b', value: `Hello! Your powers of patronage have been activated! Your patronage tier is \`${rank}\`, use \`pathelp\` to see your available commands!`},
                    
                  )
                dmChannel.send(embed)

                let dateobj = new Date();

                let day = ("0" + dateobj.getDate()).slice(-2);

                let month = ("0" + (dateobj.getMonth() + 1)).slice(-2);

                let date = `${dateobj.getFullYear()}/${month}/${day}`;

                let time = `${dateobj.getHours()}:${dateobj.getMinutes()}:${dateobj.getSeconds()}`;

                let serversCanSupport;

                if (rank === '3') {
                serversCanSupport = '3'
                } else if (rank === '2') {
                    serversCanSupport = '2'
                } else if (rank === '1') {
                    serversCanSupport = '1'
                }

                db.collection('patrons').doc(member).set({
                    'patronID': member,
                    'date': date,
                    'time': time,
                    'rank': rank,
                    'serversCanSupport' : serversCanSupport
                })
                message.delete();
            } else { return; }
        } else {
            message.delete();
            return;
        }
    }
}