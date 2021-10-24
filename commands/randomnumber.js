const Discord = require("discord.js");

module.exports = {
    name: 'randomnumber',
    usage: 'randomnumber <MIN-NUMBER> <MAX-NUMBER>',
    description: "Gives you a random number based on input!",
    aliases: ['generatenumber', 'rand', 'magicnumber'],
    cooldown: 5,
    execute(client, message, args, Discord, db){

let min = args[0]
let max = args[1]

        if (!args[0]) min = 0
        if (!args[1]) max = 10

if (isNaN(min) || isNaN(max)){
    const embed = new Discord.MessageEmbed()
    .setColor("WHITE")
      .setTitle("Error!")
      .addFields(
        { name: '\u200b', value: `That is not a number!`},
        
      )
    message.channel.send(embed)
    .then(msg => {
        setTimeout(() => msg.delete(), 10000)
      })
      return
}
        if (min > min) {
            const embed = new Discord.MessageEmbed()
            .setColor("WHITE")
              .setTitle("Error!")
              .addFields(
                { name: '\u200b', value: `The minimum cannot be bigger than the maximum number`},
                
              )
            message.channel.send(embed)
            .then(msg => {
                setTimeout(() => msg.delete(), 10000)
              })
              message.delete()
              return
}
        let number = Math.random() * (max - min) + min;

        let number2 = Math.ceil(number)

        const embed = new Discord.MessageEmbed()
        .setColor("WHITE")
          .setTitle("Random number: ")
          .addFields(
            { name: '\u200b', value: `Your magic number is: \`${number2}\``},
            
          )
        message.channel.send(embed)
        .then(msg => {
            setTimeout(() => msg.delete(), 30000)
          })
          message.delete()
    }
    }
