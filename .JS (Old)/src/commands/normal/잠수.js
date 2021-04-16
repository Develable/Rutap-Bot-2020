// node_modules
const Discord = require('discord.js');

// 자체 모듈
const timestamp = require('../../lib/timestamp.js');
const sql = require('../../lib/dbaseconnector.js');

// settings
const d_settings = require('./../../settings/default_settings.js');

// 명령어 모듈 한정 :: 명령어 설명 정의
exports.dscr = {
    description : '잠수모드에 진입합니다.\n타인이 자신을 언급하면 잠수 중이라는 알림을 보냅니다.',
    use : [`${d_settings.normal_prefix}잠수 [사유]`]
}

// 명령어 치면 돌아가는 구역
exports.run = (dscl, message, args, opti) => {
    // args 검증 -> 데이터 입력 -> 완료 알림
    let now_dt = new Date();
    let afk_reason;
    if (! args[1]) { // 사유 미작성 (사유 arg 공백)
        afk_reason = "(사유 미작성)"
    } else {
        afk_reason = message.content.replace(`${d_settings.normal_prefix}잠수 `, '');
    }

    sql.connection.query("INSERT INTO `afk_info`(`user_id`, `start_datetime`, `afk_reason`) VALUES (?, ?, ?)", [message.author.id, now_dt, afk_reason], (err, rows, fields) => {
        if (err) {
            err_module.performerr(dscl, message, err);
            return;
        }

        let replyEmbed = new Discord.RichEmbed()
            .setTitle(`${message.author.tag} 님이 잠수 시작`)
            .setDescription(`사유 : ${afk_reason}`)
            .setFooter(`© 2018-2020 Develable.\n${timestamp.returntime()}`)
            .setColor(d_settings.embed_color);
        message.channel.send(replyEmbed);
        return;
    });
}