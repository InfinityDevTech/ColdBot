const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js', { token: 'ODU1MDM1NTUzOTE2NTE4NDAx.YMsn6Q.1G3CEMbbQTkeEBRxv6EFoUsYxEg' });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
manager.on('shardDeath', shard => console.log(`${shard.id} has died!`))
manager.spawn();