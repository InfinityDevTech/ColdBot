const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js', { token: 'ODU4NDIyOTQ0MzAwMDA3NDc0.YNd6qg.fdWKWnTXrpdQPY9G7947h1JNpic' });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
manager.on('shardDeath', shard => console.log(`${shard.id} has died!`))
manager.spawn();