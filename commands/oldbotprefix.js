const Discord = require("discord.js");

module.exports = {
    name: 'oldbotprefix',
    description: "Shows Prefix",
    execute(client, message, args, Discord, db){
        if (!message.guild) return;

        let prefixtemp;

        db.collection('guilds').doc(message.guild.id).get().then((q) => {
            if (q.exists) {
                prefixtemp = q.data().prefix;
            }
        }).then(() => {

            const embed = new Discord.MessageEmbed()
            .setColor("WHITE")
            .setTitle('Current Prefix')
            .setDescription(`**Prefix: **${prefixtemp}`)
          message.channel.send(embed)
          .then(msg => {
              setTimeout(() => msg.delete(), 60000)
            })
            message.delete();
    
        })
        
    }
}