const Discord = require("discord.js");

module.exports = {
    name: 'unblacklist',
    description: "UnblackLists a User",
    execute(client, message, args, Discord, db) {
        if (!message.guild) return;
        if (message.author.id === "574445866220388352") {

            const member = message.mentions.users.first().id

            if (member) {

                db.collection('blacklist').doc(member).delete();
                message.delete();
            } else { return; }
        } else {
            return;
        }
    }
}