const Discord = require("discord.js");

module.exports = {
    name: 'adminhelp',
    description: "Shows Help but for admins :)",
    execute(client, message, args, Discord, db){

        if (!message.guild) return;
        if (message.member.hasPermission('ADMINISTRATOR')) {

          let prefix;

          db.collection('guilds').doc(message.guild.id).get().then((q) => {
            if (q.exists) {
                prefix = q.data().prefix;
            }}).then(() => {


            const embed = new Discord.MessageEmbed()
              .setColor("WHITE")
              .setAuthor("Help!")
              .setTitle(`Commands: `)
              .addFields(
                { name: '👔 - Administrative Command', value: "`kick - kicks a user`, `ban - bans a user`, `dbb <BAN ID> - shows information on a ban`, `dbk <KICK ID> - shows information on a kick`" },
                { name: '🎟️ - Ticket Controls', value: "`ticketcontrols - shows controls to a ticket but be careful it can delete channels!`, `ticketstatus <TICKET ID> - shows the status on a ticket along with more info`, `ticketconfig <CATEGORY ID> - changes what category the tickets get created in`" },
                { name: '\u200b', value: '[Support Me!](https://www.paypal.com/paypalme/infinitydevtech) | [Vote for the bot!](https://top.gg/bot/855035553916518401/vote) | [Bot discord!](https://discord.gg/k4fb9TZfcK)'},
              )
            message.author.send(embed)
            .then(msg => {
                setTimeout(() => msg.delete(), 60000)
              })
            })

              message.delete();
            } else {
                message.channel.send(`<@${message.author.id}> You dont have permission!`)
                .then(msg => {
                    setTimeout(() => msg.delete(), 20000)
                  })
                  message.delete();
            }
          
    }
}