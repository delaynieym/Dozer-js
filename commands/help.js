const Discord = require('discord.js');

module.exports = {
	name: 'help',
	description: 'lists commands',
	execute(message, args) {
		const embed = new Discord.RichEmbed()
			.setColor('#4386f2')
			.setTitle("Commands")
			.addField("list available roles", "`!list`")
			.addField("request a role", "`!give <role>`")
			.addField("remove a role", "`!remove <role>`")

		message.channel.send(embed);
	},
};