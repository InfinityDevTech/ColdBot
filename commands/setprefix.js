const Discord = require("discord.js");

module.exports = {
    name: 'setprefix',
    description: "Sets the bot prefix!",
    async execute(client, message, args, Discord, db) {

        if (message.member.hasPermission('ADMINISTRATOR')) {

            if (args.length === 0) {
                const embed = new Discord.MessageEmbed()
                    .setColor("WHITE")
                    .setTitle('No Prefix Specified')
                    .setDescription(`You did not put in a prefix!`)
                message.channel.send(embed)
                    .then(msg => {
                        setTimeout(() => msg.delete(), 5000)
                    })
                    message.delete();
            } else if (args.length === 1) {
                let nPrefix = args[0];

                db.collection('guilds').doc(message.guild.id).update({
                    'prefix': nPrefix
                }).then(() => {
                    const embed = new Discord.MessageEmbed()
                        .setColor("WHITE")
                        .setTitle('Prefix Set!')
                        .setDescription(`Prefix has been set to ${nPrefix}`)
                    message.channel.send(embed)
                        .then(msg => {
                            setTimeout(() => msg.delete(), 5000)
                        })
                        message.delete();
                })
            } else if (args.length > 1) {
                const embed = new Discord.MessageEmbed()
                .setColor("WHITE")
                    .setTitle('Prefix Error')
                    .setDescription(`Prefix cannot be longer than 1 character!`)
                message.channel.send(embed)
                    .then(msg => {
                        setTimeout(() => msg.delete(), 5000)
                    })
                    message.delete();
            }
        } else {
            const embed = new Discord.MessageEmbed()
            .setColor("WHITE")
                .setTitle('Permissions Error')
                .setDescription(`You dont have permission!`)
            message.channel.send(embed)
                .then(msg => {
                    setTimeout(() => msg.delete(), 5000)
                })
            message.delete();
        }

    }
}