// node_modules
const Discord = require("discord.js");
const moment = require('moment');

// 자체 모듈
const timestamp = require('./timestamp.js');
const lpf = require('./log_perform.js');

// settings
const err_settings = require('../settings/err_settings.js');

// TASK :: 애러 받으면 랜덤코드와 함께 로그에 기록하고 랜덤코드는 유저에게 설정 메시지와 함께 보냄.
exports.performerr = (dscl, message, e) => {
    if (!err_settings.module_use) return;
    let errcode = e;
    if (err_settings.randomcode_use) {
        // YY + 랜덤4자리 + DD + 랜덤 2자리 + MM
        let rand4 = Math.ceil(Math.random() * 9999);
        let rand2 = Math.ceil(Math.random() * 99);
        errcode=moment().format(`[CODE :: ]YY[${rand4}]DD[${rand2}]MM`);
    } // 애러코드 없어도 정의할 필요 없음 위에 있다!!!!
    if (err_settings.err_log) {
        lpf.errlog(message, errcode, e);
    }
    let embed = new Discord.RichEmbed()
        .setTitle(err_settings.embed_title)
        .setDescription(`${err_settings.embed_description}\n\n${errcode}`)
        .setFooter(`© 2018-2020 Develable.\n${timestamp.returntime()}`)
        .setColor(err_settings.embed_color);
    try {
        message.author.createDM().then((DMChannel) => {
            DMChannel.send(embed);
        });
    } catch (err) {
        try {
            message.reply(embed);
        } catch (err2) {
            console.log(err);
            console.log(err2);
        }
        return;
    }
    message.reply('작업 수행 도중 문제가 발생했습니다.\nDM을 확인하세요.');
};