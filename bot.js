const Discord = require("discord.js");
require('dotenv').config()
const fs = require('fs');
const firebase = require('firebase/app');
const FieldValue = require('firebase-admin').firestore.FieldValue;
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-login.json')
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();


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
        'prefix': ';',
        'spamFilter' : 'true',
        'ticketParent' : '',
        'spamTolerance' : '80',
        'logChannel' : 'undefined',
        'patronSupporterID' : 'undefined',
        'isSupported' : 'false'
    })

})
 

client.login();