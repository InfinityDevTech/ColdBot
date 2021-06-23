const Discord = require("discord.js");

module.exports = {
    name: 'blacklist',
    description: "BlackLists a User",
    execute(client, message, args, Discord, db) {
        if (!message.guild) return;
        if (message.author.id === "574445866220388352") {

            const member = message.mentions.users.first().id

            if (member) {

                let reason = args.slice(1).join(" ");

                if (!reason) reason = "Reason Not Present";

                let dateobj = new Date();

                let day = ("0" + dateobj.getDate()).slice(-2);

                let month = ("0" + (dateobj.getMonth() + 1)).slice(-2);

                let date = `${dateobj.getFullYear()}/${month}/${day}`;

                let time = `${dateobj.getHours()}:${dateobj.getMinutes()}:${dateobj.getSeconds()}`;

                db.collection('blacklist').doc(member).set({
                    'blacklistID': member,
                    'date': date,
                    'time': time,
                    'reason': reason
                })
                message.delete();
            } else { return; }
        } else {
            message.delete();
            return;
        }
    }
}