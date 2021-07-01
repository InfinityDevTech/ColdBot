const Discord = require("discord.js");

module.exports = {
    name: 'pathelp',
    description: "Shows Help",
    execute(client, message, args, Discord, db){

        let rank

        db.collection('patrons').doc(message.member.id).get().then((q) => {
            if (q.exists) {
                rank = q.data().rank;
            }
            
        }).then(() => {

           if (rank === '1') {
            message.author.send("Hello! Patron help is coming soon, if you found my patreon early, good for you!")
           } else if (rank === '2') {
            message.author.send("Hello! Patron help is coming soon, if you found my patreon early, good for you!")
           } else if (rank === '3') {
               message.author.send("Hello! Patron help is coming soon, if you found my patreon early, good for you!")
           }

        })
    }
}