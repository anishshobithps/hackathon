const { createCanvas, loadImage } = require('canvas');
const request = require("node-superfetch");
const Discord = require("discord.js");
const { sepia } = require("discord.js-canvas");
/* Export Function */
module.exports.run = async (bot, message, args) => {
let image = message.mentions.users.first() ? message.mentions.users.first().displayAvatarURL({format: 'png', size: 512}) :message.author.displayAvatarURL({format: 'png', size: 512});
   try {
    const base = await loadImage("https://raw.githubusercontent.com/dragonfire535/xiao/master/assets/images/wanted.png");
    const {body} = await request.get(image);
		const avatar = await loadImage(body);
			const canvas = createCanvas(base.width, base.height);
			const ctx = canvas.getContext('2d');
			ctx.drawImage(base, 0, 0);
			ctx.drawImage(avatar, 150, 360, 430, 430);
			sepia(ctx, 150, 360, 430, 430);
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'wanted.png');

        message.reply(attachment);
    } catch (err) {
        message.reply("Something went wrong please try again!!");
       console.log(err);
    }
};

module.exports.help = {
    name: "wanted",
		category: "Image",
		description: "Shows wanted image manipulation"
};
