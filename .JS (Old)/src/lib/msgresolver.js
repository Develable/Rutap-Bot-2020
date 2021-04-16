// node_modules
const fs = require('fs');
const Discord = require('discord.js');

// 자체 모듈
const err_module = require('./err_perform.js');
const rutap = require('./rutapcommands.js');

// settings
const d_settings = require('../settings/default_settings.js');

exports.run = async (dscl, message, args, opti) => {
    if (message.content.startsWith(d_settings.normal_prefix)) cmd = args[0].split(d_settings.normal_prefix)[1].toLowerCase();
    else if (message.content.startsWith(d_settings.admin_prefix)) cmd = args[1].toLowerCase();
    else return;
    let normalcommands = fs.readdirSync('./src/commands/normal');
    let servercommands = fs.readdirSync('./src/commands/server_admin');
    let botadmincommands = fs.readdirSync('./src/commands/bot_admin');
    let cmdpath = '';

    await normalcommands.some((item) => { if (cmd == item.split('.js')[0]) cmdtype = 0; });
    await servercommands.some((item) => { if (cmd == item.split('.js')[0]) cmdtype = 1; });
    await botadmincommands.some((item) => { if (cmd == item.split('.js')[0]) cmdtype = 2;});
    if (cmdtype == 1 && !message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return message.reply('관리자 권한을 갖고 있지 않습니다.');
    else if (cmdtype == 2 && !rutap.isBotAdmin(message.author.id)) return message.reply('당신은 봇 관리자가 아닙니다!');
    else cmdpath = ((cmdtype == 0) ? `./../commands/normal/${cmd}.js` : ((cmdtype == 1) ? `./../commands/server_admin/${cmd}.js` : ((cmdtype == 2) ? `./../commands/bot_admin/${cmd}.js` : '존재하지 않는 명령어')));
    
    try {
        if (opti.nodesetting.cmdar) delete require.cache[require.resolve(cmdpath)]; // node ./src/rutap.js -ar (auto reload)
        let command = require(cmdpath);
        command.run(dscl, message, args, opti);
    } catch (err) {
        if (err.message.indexOf("Cannot find module") != -1) {
            message.reply(`존재하지 않는 명령어 입니다.\n\`${d_settings.normal_prefix}도움말\`을 입력하여 명령어를 찾아보세요.`);
            //console.log(err);
        } else {
            //err_module.performerr(dscl, message, opti, err);
            console.log(err);
        }
    }
};
