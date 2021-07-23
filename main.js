const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js', { token: 'ODU1MDM1NTUzOTE2NTE4NDAx.YMsn6Q.1G3CEMbbQTkeEBRxv6EFoUsYxEg' });
const AutoPoster = require('topgg-autoposter')

const poster = AutoPoster(process.env.TOPGG_TOKEN, manager)

poster.on('posted', (pdata) => {
    console.log(pdata)
    console.log(`Posted stats with: `)
})


manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
manager.on('shardDeath', shard => console.log(`${shard.id} has died!`))
manager.spawn();