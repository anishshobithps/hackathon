const {createCanvas, loadImage, registerFont} = require('canvas');
const path = require('path');
const request = require("node-superfetch");
const Discord = require("discord.js");
/* Export Function */
module.exports.run = async (bot, message, args) => {
let image = message.mentions.users.first() ? message.mentions.users.first().displayAvatarURL({format: 'png', size: 512}) :message.author.displayAvatarURL({format: 'png', size: 512});
   try {
    const base = await loadImage("https://raw.githubusercontent.com/dragonfire535/xiao/master/assets/images/rainbow.png");
    const {body} = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
			const ctx = canvas.getContext('2d');
			ctx.drawImage(data, 0, 0);
			ctx.drawImage(base, 0, 0, data.width, data.height);
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'rainbow.png');

        message.reply(attachment);
    } catch (err) {
        message.reply("Something went wrong please try again!!");
       console.log(err);
    }
};

module.exports.help = {
    name: "rainbow",
		category: "Image",
		description: "Shows rainbow colour manipulation"
};