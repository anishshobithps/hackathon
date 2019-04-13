const {createCanvas, loadImage, registerFont} = require('canvas');
const path = require('path');
const request = require("node-superfetch");
const Discord = require("discord.js");
/* Export Function */
module.exports.run = async (bot, message, args) => {
let image = message.mentions.users.first() ? message.mentions.users.first().displayAvatarURL({format: 'png', size: 512}) :message.author.displayAvatarURL({format: 'png', size: 512});
   try {
    const base = await loadImage("https://raw.githubusercontent.com/dragonfire535/xiao/master/assets/images/approved.png");
    const {body} = await request.get(image);
    const data = await loadImage(body);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    const dataRatio = data.width / data.height;
    const baseRatio = base.width / base.height;
    let {width, height} = data;
    let x = 0;
    let y = 0;
    if (baseRatio < dataRatio) {
      height = data.height;
      width = base.width * (height / base.height);
      x = (data.width - width) / 2;
      y = 0;
    } else if (baseRatio > dataRatio) {
      width = data.width;
      height = base.height * (width / base.width);
      x = 0;
      y = (data.height - height) / 2;
    }
    ctx.drawImage(base, x, y, width, height);
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'approved.png');

        message.reply(attachment);
    } catch (err) {
        message.reply("Something went wrong please try again!!");
       console.log(err);
    }
}

module.exports.help = {
    name: "approved",
		category: "Image",
		description: "Shows approved image manipulation"
}