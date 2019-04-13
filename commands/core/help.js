const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
let page = 1;
let pages = ["Colour","Image","Core"];

const embed = new Discord.MessageEmbed() 
  .setColor(Math.floor(Math.random() * 16777216).toString(16))
.setAuthor(`${bot.user.username} ${pages[page-1]} Commands`, bot.user.displayAvatarURL())
.setTimestamp()
  .setFooter(`Page ${page} of ${pages.length}`, bot.user.displayAvatarURL());
bot.commands.filter(c => c.help.category === `${pages[page-1]}`).map(c => embed.addField(`!${c.help.name}`, `${c.help.description}`));

const msg = await message.channel.send(embed);
 
  msg.react('⏪');
	msg.react('⏩');
	msg.react("🗑").then( r => { 
    const backwardsFilter = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
    const forwardsFilter = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id;
		const dustbinFilter = (reaction, user) => reaction.emoji.name === "🗑" && user.id === message.author.id;
   
    const backwards = msg.createReactionCollector(backwardsFilter, { time: 60000 }); 
    const forwards = msg.createReactionCollector(forwardsFilter, { time: 60000 });
		const dustbin = msg.createReactionCollector(dustbinFilter, { time: 60000 }); 
   
    
    backwards.on('collect', async r => {
			r.users.remove(message.author);
      if (page === 1) return; 
      page--;
     const embed = new Discord.MessageEmbed() 
    .setColor(Math.floor(Math.random() * 16777216).toString(16))
    .setFooter(`Page ${page} of ${pages.length}`, bot.user.displayAvatarURL())
.setAuthor(`${bot.user.username} ${pages[page-1]} Commands`, bot.user.displayAvatarURL())
.setTimestamp();
      bot.commands.filter(c => c.help.category === `${pages[page-1]}`).map(c => embed.addField(`!${c.help.name}`, `${c.help.description}`)); 
      msg.edit(embed);
    });
   
    forwards.on('collect', async r => {
			r.users.remove(message.author);
      if (page === pages.length) return; 
      page++;      
      const embed = new Discord.MessageEmbed() 
    .setColor(Math.floor(Math.random() * 16777216).toString(16))
    .setFooter(`Page ${page} of ${pages.length}`, bot.user.displayAvatarURL())
.setAuthor(`${bot.user.username} ${pages[page-1]} Commands`, bot.user.displayAvatarURL())
.setTimestamp();
      bot.commands.filter(c => c.help.category === `${pages[page-1]}`).map(c => embed.addField(`!${c.help.name}`, `${c.help.description}`));
      msg.edit(embed);
    });
   forwards.on('end', async () => {
	msg.reactions.removeAll();
  });
  backwards.on('end', async () => {
	msg.reactions.removeAll();
  });

	dustbin.on("collect", async () => {
		msg.delete();
	});

  });

};

module.exports.help = {
    name: "help",
		category: "Core",
		description: "Shows bots commands"
};