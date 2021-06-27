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
                { name: 'Kick', value: `kicks users, cant kick administrators: ${prefix}kick <USER>` },
                { name: 'Ban', value: `Bans users, cant ban administrators: ${prefix}ban <USER>` },
                { name: 'ticketcontrols', value: `This command shows controls to a ticket, but be careful the controls can also delete a channel: ${prefix}ticketcontrols` },
                { name: 'ticketstatus', value: `This command shows a ticket's stauts using the ID, you can find this in the tickets embed footer: ${prefix}ticketstatus <TICKET ID>` },
                { name: 'ticketconfig', value: `This command allows you to set a category that tickets get created in: ${prefix}ticketconfig <TICKET ID>` },
                { name: 'BanDB', value: `Shows a ban in the database: ${prefix}dbb <ID>` },
                { name: 'kickDB', value: `Shows a kick in the database: ${prefix}dbk <ID>` },
                { name: '\u200b', value: '[Support Me!](https://www.paypal.com/paypalme/infinitydevtech) | [Vote for the bot!](https://top.gg/bot/855035553916518401/vote) | Patreon Coming Soon!'},
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