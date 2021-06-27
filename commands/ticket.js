const Discord = require("discord.js");
const { isEncryptedUserEnabled } = require("parse");
const randomstring = require("randomstring");

module.exports = {
    name: 'ticket',
    description: "creats",
    async execute(client, message, args, Discord, db){
let str = message.author.tag;
var tagnumbers = str.split('#')[1];


        const channel = await message.guild.channels.create(`${message.author.username}-${tagnumbers}`);

        let ticketID = randomstring.generate(10);

        const ticketintro = new Discord.MessageEmbed()
        .setColor("WHITE")
        .setTitle(`Ticket Categories`)
        .addFields(
          { name: ':red_square:', value: 'For Ban-Appeals, Mute-Appeals' },
          { name: ':orange_square:', value: 'For General-Reports' },
          { name: ':green_square:', value: 'For General FAQ' },
          { name: ':blue_square:', value: 'For Role-Requests' },
        )
        .setFooter(message.channel.id)
  
        let ticketParent;

        db.collection('guilds').doc(message.guild.id).get().then((j) => {
            if (j.exists) {
                ticketParent = j.data().ticketParent;
            }}).then(() => {

        channel.setParent(ticketParent);

        })

        channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGE: false,
            VIEW_CHANNEL: false,
        });
        channel.updateOverwrite(message.author, {
            SEND_MESSAGE: true,
            VIEW_CHANNEL: true,
        });

        const reactionMessage = await channel.send(ticketintro);

        try {
            await reactionMessage.react("🟥");
            await reactionMessage.react("🟧");
            await reactionMessage.react("🟩");
            await reactionMessage.react("🟦");
        } catch (err) {
            channel.send("Error sending emojis!");
            throw err;
        }

        db.collection('tickets').doc(channel.id).set({
            'guildID': message.guild.id,
            'guildName': message.guild.name,
            'guildOwnerID': message.guild.ownerID,
            'ticketID' : ticketID,
            'ticketDone' : ''
        })

        const collector = reactionMessage.createReactionCollector(
            (reaction, user) => message.guild.members.cache.find((member) => member.id === user.id),
            { dispose: true }
        );

        collector.on("collect", (reaction, user) => {
            switch (reaction.emoji.name) {
                case "🟥":
                    if(message.author.id === user.id) {
                    const Red = new Discord.MessageEmbed()
                        .setColor("RED")
                        .setTitle(`Appeal`)
                        .addFields(
                            { name: ':red_square:', value: 'Please ask your appeal below!' },
                        )
                        .setFooter(message.channel.id)
                        channel.send(Red);
                        reactionMessage.delete()
                        color = "RED"
                        }
                        
                    break;
                case "🟧":
                    if(message.author.id === user.id) {
                    const Orange = new Discord.MessageEmbed()
                        .setColor("ORANGE")
                        .setTitle(`Reporting`)
                        .addFields(
                            { name: ':orange_square:', value: 'Please write who you want to report, and why. Please include evidence if possible!' },
                        )
                        .setFooter(message.channel.id)
                        channel.send(Orange);
                        reactionMessage.delete()
                        color = "Orange";
                        }
                    break;
                case "🟩":
                    if(message.author.id === user.id) {
                    const Green = new Discord.MessageEmbed()
                        .setColor("GREEN")
                        .setTitle(`FAQ`)
                        .addFields(
                            { name: ':green_square:', value: 'Please write your question below!' },
                        )
                        .setFooter(message.channel.id)
                        channel.send(Green);
                        reactionMessage.delete()
                        color = "green";
                        }
                    break;
                case "🟦":
                    if(message.author.id === user.id) {
                    const Blue = new Discord.MessageEmbed()
                        .setColor("BLUE")
                        .setTitle(`Request`)
                        .addFields(
                            { name: ':blue_square:', value: 'Please request your role below!' },
                        )
                        .setFooter(message.channel.id)
                        channel.send(Blue);
                        reactionMessage.delete()
                        color = "blue";
                        }
                    break;
                    
                }
        });



        message.channel
            .send(`We will be right with you! ${channel}`)
            .then((msg) => {
                setTimeout(() => msg.delete(), 7000);
                message.delete();
            })
            .catch((err) => {
                throw err;
            });
    }
}