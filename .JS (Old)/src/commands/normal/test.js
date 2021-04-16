// node_modules
const Discord = require('discord.js');

// 자체 모듈
const err_module = require('./../../lib/err_perform.js');
const sql = require('../../lib/dbaseconnector.js');

// settings
const d_settings = require('../../settings/default_settings.js');

// 명령어 모듈 한정 :: 명령어 설명 정의
exports.dscr = {
    description : 'a',
    use : [`a`]
}

// 명령어 치면 돌아가는 구역
exports.run = (dscl, message, args, opti) => {
    let guild = message.guild;
    sql.connection.query("SELECT * FROM `guild_info` WHERE guild_id = ?", [guild.id], (err, rows, fields) => {
        if (err) {
            err_module.performerr(dscl, message, err);
            return;
        }

        let WelcomeEmbed = new new Discord.RichEmbed()
            .setTitle('루탑봇을 초대 해 주셔서 감사합니다!')
            .setFooter(`© 2018-2020 Develable.\n${timestamp.returntime()}`)
            .setColor(d_settings.embed_color);

        if (rows.length == 0) {
            
        } else {
            let data = rows[0];
        }
    });
}