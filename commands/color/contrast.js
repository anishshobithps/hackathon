const { contrast } = require("discord.js-canvas");
const { createCanvas, loadImage } = require("canvas");
const request = require("node-superfetch");
const Discord = require("discord.js");

module.exports.run = async (bot, message) => {

// If the user is mentioned it will take the mentioned user pic or else the message author pic

    let image = message.mentions.users.first() ? message.mentions.users.first().displayAvatarURL({format: 'png', size: 512}) :message.author.displayAvatarURL({format: 'png', size: 512});

    try {
        const { body } = await request.get(image);
        const data = await loadImage(body);
        const canvas = createCanvas(data.width, data.height);
		const ctx = canvas.getContext('2d');
		ctx.drawImage(data, 0, 0);
		contrast(ctx, 0, 0, data.width, data.height);

//MessageAttachement - Discord.js-12.0.0
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'contrast.png');

        message.reply(attachment);
    } catch (err) {
        message.reply("Something went wrong please try again!!");
       console.log(err);
    }
};

module.exports.help = {
    name: "contrast",
		category: "Colour",
		description: "Shows contrast colour correction"
};