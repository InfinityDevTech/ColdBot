const Discord = require("discord.js");
const config = require("./config.json");
const fs = require('fs');
const fivem = require("discord-fivem-api");
const firebase = require('firebase/app');
const FieldValue = require('firebase-admin').firestore.FieldValue;
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-login.json')
const server = new fivem.DiscordFivemApi("185.249.196.248:30424");
const client = new Discord.Client();
client.commands = new Discord.Collection();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

let db = admin.firestore();

['command_handler', 'event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord, db);
})

client.on('guildCreate', async gData => {

    db.collection('guilds').doc(gData.id).set({
        'guildID': gData.id,
        'guildName': gData.name,
        'guildOwnerID': gData.ownerID,
        'prefix': '!',
        'spamFilter' : 'true',
        'ticketParent' : ''
    })

console.log(`Bot added to server ${gData.name}`)

})
 

client.login(config.token);