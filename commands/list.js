module.exports = {
	name: 'list',
	description: 'lists available roles',
	guildOnly: true,
	execute(message, args) {
		let list = '';
		const roles = message.guild.roles;
		for (role of roles.values()) {
			if (!role.hasPermission('ADMINISTRATOR') && !role.name.includes('@')) {
				list += `\n\`${role.name}\``;
				console.log(role.name.includes('@'));
			}
		}
		message.channel.send(list);
	},
};