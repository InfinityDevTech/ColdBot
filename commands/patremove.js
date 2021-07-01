const Discord = require("discord.js");

module.exports = {
    name: 'patremove',
    description: "UnblackLists a User",
    async execute(client, message, args, Discord, db) {
        if (!message.guild) return;
        if (message.author.id === "574445866220388352") {

            const member = message.mentions.users.first().id

            if (member) {

                const userId = message.mentions.users.first().id
                const member2 = await message.guild.members.fetch({user: userId})
                const dmChannel = await member2.createDM()

                        dmChannel.send(`Hi again! Your patronage has expired! Please dont worry, you can extend it here: https://patreon.com/infinitydevtech`)

                        db.collection('patrons').doc(message.mentions.users.first().id).delete();
                        message.delete();
                

            } else { return; }
        } else {
            return;

        }
    }
}
