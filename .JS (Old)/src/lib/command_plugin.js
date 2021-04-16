// node_modules
const Discord = require("discord.js");

// 자체 모듈
const err_module = require('./err_perform.js');
const sql = require('./dbaseconnector.js');
const timestamp = require('./timestamp.js');

// settings
const d_settings = require('./../settings/default_settings.js');

exports.msg_cc_check = async (dscl, message) => {
    sql.connection.query("SELECT * FROM `custom_commands` WHERE guild_id=? AND command_name=?", [message.guild.id, message.content], (err, rows, fields) => {
        if (err) {
            err_module.performerr(dscl, message, err);
            return false;
        }

        if (rows.length == 0) {
            return false;
        }
        
        return true;
    });
}

exports.msg_cc_perform = async (dscl, message) => {
    sql.connection.query("SELECT * FROM `custom_commands` WHERE guild_id=? AND command_name=?", [message.guild.id, message.content], (err, rows, fields) => {
        if (err) {
            err_module.performerr(dscl, message, err);
            return false;
        }

        if (rows.length > 1) {
            message.reply(`커스텀 커맨드 설정이 잘못되었습니다.\n자세한 내용은 아래 내용과 함께 봇 관리팀에 문의 해주세요.\n\`\`\`json\n${rows}\n\`\`\``);
            return false;
        }

        if (rows.length == 0) {
            return false;
        }
        
        let command_info = JSON.parse(rows[0]['return_message']);

        if (command_info['type'] == 'plain') {
            message.reply(command_info['contents']);
            return;
        } else {
            let replyEmbed = new Discord.RichEmbed()
                .setTitle(command_info['contents']['title'])
                .setDescription(command_info['contents']['description'])
                .setFooter(`© 2018-2020 Develable.\n${timestamp.returntime()}`)
                .setColor(d_settings.embed_color);
            message.reply(replyEmbed);
            return;
        }
    });
}

exports.afk_noti = (message) => {
    mentionUsers = message.mentions.users.array();
    mentionUsers.forEach(function (item) {
        sql.connection.query("SELECT * FROM `afk_info` WHERE user_id=?", [item.id], (err, rows, fields) => {
            if (err) {
                err_module.performerr(dscl, message, err);
                return;
            }
            if (rows.length == 0) {
                return;
            }
        });
    });
}

exports.afk_disable = (message) => {
    sql.connection.query("SELECT * FROM `afk_info` WHERE user_id=?", [message.author.id], (err, rows, fields) => {
        if (err) {
            err_module.performerr(dscl, message, err);
            return;
        }

        if (rows.length == 0) {
            return;
        }

        sql.connection.query("DELETE FROM `afk_info` WHERE user_id=?", [message.author.id], (err_after, rows_after, fields_after) => {
            if (err_after) {
                err_module.performerr(dscl, message, err_after);
                return false;
            }

            let start = new Date(rows[0]['start_datetime'])
            let time = new Date()
            let y = (time.getFullYear() - start.getFullYear()) == 0 ? "" : `${(time.getFullYear() - start.getFullYear())}년 `;
            let m = (time.getMonth() - start.getMonth()) == 0 ? "" : `${(time.getMonth() - start.getMonth())}개월 `;
            let d = (time.getDate() - start.getDate()) == 0 ? "" : `${(time.getDate() - start.getDate())}일 `;
            let hh = (time.getHours() - start.getHours()) == 0 ? "" : `${(time.getHours() - start.getHours())}시간 `;
            let mm = (time.getMinutes() - start.getMinutes()) == 0 ? "1분 미만" : `${time.getMinutes() - start.getMinutes()}분`;

            let replyEmbed = new Discord.RichEmbed()
                .setTitle(`${message.author.tag} 님의 잠수 종료`)
                .setDescription(`사유 : ${rows[0]['afk_reason']}\n잠수 시간 : ${y + m + d + hh + mm}\n(${timestamp.returntime_useinput(rows[0]['start_datetime'])} ~ ${timestamp.returntime()})`)
                .setFooter(`© 2018-2020 Develable.\n${timestamp.returntime()}`)
                .setColor(d_settings.embed_color);
            message.channel.send(replyEmbed);
            return;
        });
    });
}
