const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js')
const config = require('./../config')
const { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    name: 'announce',
    usage: 'announce <message> (to message)',
    description: "announce a message",
    aliases: ['a'],
    cooldown: 60,
    async execute(client, interaction, db) {

        const embed = new Discord.MessageEmbed()
        .setColor(config.bot.colors)
        .setTitle(`Announcement from Matty's World!`)
        .addFields(
          { name: `\u200b`, value: `${interaction.options.getString('text')}` },

        )

        interaction.guild.members.fetch().then((members) => {

members.forEach((member) => {
  if (member.user.bot) return;
  member.send({embeds: [embed]})

})

        })

        message.reply({ content: `Sent!`})
    }
}
