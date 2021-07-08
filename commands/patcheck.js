const Discord = require("discord.js");

module.exports = {
    name: 'patcheck',
    description: "Checks if a patron exists",
    async execute(client, message, args, Discord, db) {
        if (!message.guild) return;
        try {
        if (message.author.id === "574445866220388352") {
           
            const member = message.mentions.users.first().id

            if (member) {
                let rank;

                db.collection('patrons').doc(member).get().then((q) => {
                    if (q.exists) {
                        rank = q.data().rank;
                    }
                    
                }).then(async () => {

               if (!rank) rank = "No Rank!"

                const embed = new Discord.MessageEmbed()
                .setColor("WHITE")
                  .setTitle(`User has the rank of ${rank}`)
                    
                  
                message.channel.send(embed)
                .then(msg => {
                    setTimeout(() => msg.delete(), 60000)
                  })

                message.delete();
                })
            } else { return; }
        } else {
            message.delete();
            return;
        }
    } catch(err) {
         message.author.send(`\`${err}\``)
    }
    } 
    
    }
