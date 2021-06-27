const Discord = require("discord.js");

module.exports = {
    name: 'patadd',
    description: "Adds a patron user",
    execute(client, message, args, Discord, db) {
        if (!message.guild) return;
        if (message.author.id === "574445866220388352") {

            const member = message.mentions.users.first().id

            if (member) {

                let rank = args[1];

                if (!rank) rank = "1";

                client.users.cache.get(member).send(`Hello! Your patron powers have been activated with the tier of ${rank}, use !pathelp (Not in DM's of course :) ) to learn your commands!`)

                let dateobj = new Date();

                let day = ("0" + dateobj.getDate()).slice(-2);

                let month = ("0" + (dateobj.getMonth() + 1)).slice(-2);

                let date = `${dateobj.getFullYear()}/${month}/${day}`;

                let time = `${dateobj.getHours()}:${dateobj.getMinutes()}:${dateobj.getSeconds()}`;

                db.collection('patrons').doc(member).set({
                    'patronID': member,
                    'date': date,
                    'time': time,
                    'rank': rank
                })
                message.delete();
            } else { return; }
        } else {
            message.delete();
            return;
        }
    }
}