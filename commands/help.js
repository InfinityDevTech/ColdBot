const Discord = require("discord.js");

module.exports = {
    name: 'help',
    description: "Shows Help",
    execute(client, message, args, Discord, db){
        if (!message.guild) return;
        
        let prefix;

        db.collection('guilds').doc(message.guild.id).get().then((q) => {
          if (q.exists) {
              prefix = q.data().prefix;
          }}).then(() => {


            const embed = new Discord.MessageEmbed()
              .setColor("BLUE")
              .setAuthor("Help!")
              .setTitle(`Commands: `)
              .addFields(
                { name: 'Players Online', value: `This command checks out the players on the server: ${prefix}players` },
                { name: 'Servers', value: `This command shows you our other servers: ${prefix}servers` },
                { name: 'Ticket', value: `This command creates a ticket: ${prefix}ticket` },
                { name: 'coldbotprefix', value: 'This command shows the current server prefix: `coldbotprefix`' },
                { name: 'Admin-Help', value: `This command shows our admins the help page: ${prefix}adminhelp` },
                
              )
              .setFooter(message.author.tag)
            message.author.send(embed)
            .then(msg => {
                setTimeout(() => msg.delete(), 60000)
              })
              message.delete();
            })
    }
}