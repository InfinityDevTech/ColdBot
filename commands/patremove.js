const Discord = require("discord.js");

module.exports = {
    name: 'patremove',
    description: "UnblackLists a User",
    execute(client, message, args, Discord, db) {
        if (!message.guild) return;
        if (message.author.id === "574445866220388352") {

            const member = message.mentions.users.first().id

            if (member) {

                client.users.cache.get(member).send(`Hi again! Your patronage has expired! Please dont worry, you can extend it here: https://patreon.com/infinitydevtech`)

                db.collection('patrons').doc(member).delete();
                message.delete();
            } else { return; }
        } else {
            return;
        }
    }
}