module.exports = {
	name: 'remove',
	description: 'removes role requested',
	args: true,
	usage: '<role name>',
	async execute(message, args) {
		var request = args[0];
		for (var i = 1; i < args.length; i++) {
			request += ` ${args[i]}`;
		}
		var r = message.guild.roles.find(role => role.name.toLowerCase() === request.toLowerCase());
		if (r === null) {
			message.reply(`could not find role \`${request}\`.`); return;
		}

		if (r.hasPermission('ADMINISTRATOR')) {
			message.reply(`\`${r.name}\` gives you admin permisssions.  Are you sure you want to remove it?`).then(sentMessage => {
				sentMessage.react('✔').then(() => sentMessage.react('❌'));

				const filter = (reaction, user) => {
					return ['✔', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
				};
				sentMessage.awaitReactions(filter, { max: 1, time: 15000, errors: ['time'] })
					.then(collected => {
						const reaction = collected.first();
						if (reaction.emoji.name === '✔') {
							message.user.removeRole(r);
							message.reply('role removed!');
							sentMessage.clearReactions(); return;
						} else {
							message.reply('role was not removed as of user\'s request.');
							sentMessage.clearReactions(); return;
						}
					})
					.catch(collected => {
						message.reply('request timed out');
						sentMessage.clearReactions(); return;
					});
				
			});
		}
		else {
		message.user.removeRole(r);
		message.reply('role removed!');
		}
	},
};