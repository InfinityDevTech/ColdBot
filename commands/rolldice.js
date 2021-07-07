const Discord = require("discord.js");

module.exports = {
    name: 'rolldice',
    usage: 'randomnumber <NUMBER-OF-DICE>',
    description: "Rolls a certain number of dice dependant on your input!",
    aliases: ['rolldie', 'dice', 'diceroll'],
    cooldown: 5,
    execute(client, message, args, Discord, db){

let dice = args[0]

        if (!args[0]) dice = 1

if (isNaN(dice)){
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
      message.delete()
      return
}

if (dice > 50) {
    const embed = new Discord.MessageEmbed()
    .setColor("WHITE")
      .setTitle("Error!")
      .addFields(
        { name: '\u200b', value: `You cannot roll more than 50 dice at a time!`},
        
      )
    message.channel.send(embed)
    .then(msg => {
        setTimeout(() => msg.delete(), 10000)
      })
      message.delete()
return
}



let total = []

       for (let repeat = 0; repeat < dice; repeat++) {
          let max = 6;
          let min = 1;

        let number = Math.random() * (max - min) + min;

        let number2 = Math.ceil(number)

        total.push(number2)

          }
          
          const embed = new Discord.MessageEmbed()
        .setColor("WHITE")
          .setTitle("Random number: ")
          .addFields(
            { name: '\u200b', value: `You have rolled \`${dice}\` dice, with the final number being: \`${total.reduce((a, b) => a + b, 0)}\``},
            
          )
        message.channel.send(embed)
        .then(msg => {
            setTimeout(() => msg.delete(), 30000)
          })
          message.delete()
    }
    }