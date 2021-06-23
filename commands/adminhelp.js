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
                { name: 'Ban', value: `Shows a ban in the database: ${prefix}dbb <ID>` },
                { name: 'Ban', value: `Shows a kick in the database: ${prefix}dbk <ID>` },
              )
              .setFooter(message.author.tag)
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