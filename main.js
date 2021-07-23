const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js', { token: 'ODU1MDM1NTUzOTE2NTE4NDAx.YMsn6Q.1G3CEMbbQTkeEBRxv6EFoUsYxEg' });
const { AutoPoster } = require('topgg-autoposter')
require('dotenv').config()

const poster = AutoPoster(process.env.TOPGG_TOKEN, manager)

poster.on('posted', async (pdata) => {
    console.log(`Posted stats with data: SERVER-COUNT "${pdata.serverCount}" | SHARD-COUNT "${pdata.shardCount}"`)
})


manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
manager.on('shardDeath', shard => console.log(`${shard.id} has died!`))
manager.spawn();