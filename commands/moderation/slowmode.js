const { MessageEmbed } = require('discord.js');
const ms = require('ms');
const prefix = require('../../config.json').prefix;

module.exports = {
    name: 'slowmode',
    run: async (client, message, args) => {
        const noperm = new MessageEmbed()
        .setDescription('**Missing permission <:r_no:850213351954841610>** \nYou need to have \`୧・Head Moderator\` role or \`MANAGE_CHANNELS\` permission')
        .setColor('ff0000')
        
        if(!message.member.roles.cache.some(r => r.name ==='୧・Head Moderator' || message.member.hasPermission("MANAGE_CHANNELS"))) return message.channel.send(noperm)

        const notime = new MessageEmbed()
        .setDescription('**Missing argument <:r_no:850213351954841610>**')
        .addField('Usage', `${prefix}slowmode <time>`)
        .addField('Example', `${prefix}slowmode 5s \n${prefix}slowmode off`)
        .setColor('ff0000')

        if (!args[0]) return message.channel.send(notime)

        const currentCooldown = message.channel.rateLimitPerUser;

        const embed = new MessageEmbed()
            .setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }));

        if (args[0] === 'off') {

            const alreadyembed = new MessageEmbed()
            .setDescription('**Channel slowmode is already off**')
            .setColor('ff0000')

            if (currentCooldown === 0) return message.channel.send(alreadyembed)
            
            const offembed = new MessageEmbed()
            .setDescription('**Slowmode Disabled**')
            .setColor('ff0000')

            return message.channel.setRateLimitPerUser(0).then(msg => msg.send(offembed))

        }

        const time = ms(args[0]) / 1000;

        const validtime = new MessageEmbed()
        .setDescription('**Error! <:r_no:850213351954841610>** \nYou need to use a valid time')
        .setColor('ff0000')

        if (isNaN(time)) return message.channel.send(validtime)

        const toohigh = new MessageEmbed()
        .setDescription('Please send anything lower than 6 hours')
        .setColor('ff0000')

        if (time >= 21600) return message.channel.send(toohigh)

        const alreadyembed2 = new MessageEmbed()
        .setDescription(`Channel slowmode is already set to ${args[0]}`)
        .setColor('ff0000')

        if (currentCooldown === time) return message.channel.send(alreadyembed2)

        embed.setTitle('Channel slowmode set to: ')
        .addField('New slowmode: ', `${args[0]}`, false)
        .addField('Moderation', `${message.author}`, false)
        .setColor('59f50e')
        .setTimestamp();

        message.channel.setRateLimitPerUser(time).then(m => m.send(embed))

    }
}
