const Discord = require("discord.js");

module.exports = {
    name: 'ticketcontrols',
    usage: '',
    description: "Does controls for the tickets!",
    aliases: ['controltickets', 'tcontrols'],
    cooldown: 20,
    async execute(client, message, args, Discord, db){

message.delete();

        const channel =  message.channel.id;

        const ticketintro = new Discord.MessageEmbed()
        .setColor("WHITE")
        .setTitle(`Ticket Controls`)
        .addFields(
          { name: '❌', value: 'Sets the ticket as incomplete' },
          { name: '✅', value: 'Sets the ticket as complete' },
          { name: '🛑', value: 'Deletes the ticket' },
        )

        const reactionMessage = await message.channel.send(ticketintro);

        try {
            await reactionMessage.react("❌");
            await reactionMessage.react("✅");
            await reactionMessage.react("🛑");
        } catch (err) {
            channel.send("Error sending emojis!");
            throw err;
        }

        const collector = reactionMessage.createReactionCollector(
            (reaction, user) => message.guild.members.cache.find((member) => member.id === user.id).hasPermission("ADMINISTRATOR"),
            { dispose: true }
        );

        collector.on("collect", (reaction, user) => {
            switch (reaction.emoji.name) {
                case "❌":
                    db.collection('tickets').doc(message.channel.id).update({
                        'ticketDone': 'false'
                    })
                    message.channel.send("Marked ticket is incomplete!")
                    break;
                case "✅":
                    db.collection('tickets').doc(message.channel.id).update({
                        'ticketDone': 'true'
                    })
                    message.channel.send("Marked ticket is complete!")
                    break;
                case "🛑":
                    message.channel.send("Deleting the channel in 5 seconds!")
                    setTimeout(() => message.channel.delete(), 5000);
                    break;
            }
        });


    }
}