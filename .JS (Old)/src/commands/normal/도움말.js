// node_modules
const Discord = require("discord.js");
const fs = require('fs');

// 자체 모듈
const timestamp = require('../../lib/timestamp.js');
const err_module = require('./../../lib/err_perform.js');
const rutap = require('./../../lib/rutapcommands.js');

// settings
const d_settings = require('./../../settings/default_settings.js');

// 명령어 모듈 한정 :: 명령어 설명 정의
exports.dscr = {
    description : `사용 가능한 명령어를 모두 출력합니다.\n\`${d_settings.normal_prefix}도움말 <명령어>\`를 입력하여 설명이나 예제를 볼 수 있습니다.`,
    use : [`${d_settings.normal_prefix}도움말`, `${d_settings.normal_prefix}도움말 <명령어>`]
};

// 명령어 치면 돌아가는 구역
exports.run = async (dscl, message, args, opti) => {
    let HelpEmbed = new Discord.RichEmbed()
        .setFooter(`© 2018-2020 Develable.\n${timestamp.returntime()}`)
        .setColor(d_settings.embed_color);
        
    if (!args[1]) {
        HelpEmbed.setTitle(`${dscl.user.username} 도움말!`);
        HelpEmbed.setDescription(`자세한 설명을 확인하려면 \`${d_settings.normal_prefix}도움말 <명령어>\`를 입력합니다.\n\n\`<>\` : 필수 입력 사항\n\`[]\` : 선택 입력 사항\n\`A|B\` : A와 B중 택1`);
        // 2020-03-06 여기 수정할 필요 없이 그냥 애가 자동으로 폴더 읽어와서 명령어 나열해주는거 필요함!
        // 2020-03-09 일단 구현은 했는데 1200자 넘어갔을때 대응 필요!!
        let badmin = "";
        for (const nlist of fs.readdirSync('./src/commands/bot_admin')) {
            badmin = badmin + `\`${d_settings.admin_prefix} ` + nlist.replace('.js', '') + "` ";
        }
        let sadmin = "";
        for (const nlist of fs.readdirSync('./src/commands/server_admin')) {
            sadmin = sadmin + `\`${d_settings.normal_prefix}` + nlist.replace('.js', '') + "` ";
        }
        let normal_c = "";
        for (const nlist of fs.readdirSync('./src/commands/normal')) {
            normal_c = normal_c + `\`${d_settings.normal_prefix}` + nlist.replace('.js', '') + "` ";
        }
        HelpEmbed.addField("일반 명령어", normal_c, false);
        HelpEmbed.addField("서버 관리자 명령어", sadmin, false);
        HelpEmbed.addField("봇 관리자 명령어", badmin, false);
        message.channel.send(HelpEmbed);
    } else {
        // 2020-03-09 일반 명령어는 프리픽스 붙일 필요 없는데 사람들이 붙일 거 같음 리플 필요
        let cmdtype = -1;
        let cmd = (args[1] == d_settings.admin_prefix) ? args[2].toLowerCase() : args[1].toLowerCase();
        let normalcommands = fs.readdirSync('./src/commands/normal');
        let servercommands = fs.readdirSync('./src/commands/server_admin');
        let botadmincommands = fs.readdirSync('./src/commands/bot_admin');
        let cmdpath = '';

        await normalcommands.some((item) => { if (cmd == item.split('.js')[0]) cmdtype = 0; });
        await servercommands.some((item) => { if (cmd == item.split('.js')[0]) cmdtype = 1; });
        await botadmincommands.some((item) => { if (cmd == item.split('.js')[0]) cmdtype = 2;});
        // 2020-03-06 권한 없으면 리턴 대신 warning 띄어주고 명령어 설명 넣어줬음
        /*if (cmdtype == 1 && !message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return message.reply('관리자 권한을 갖고 있지 않습니다.');
        else if (cmdtype == 2 && !rutap.isBotAdmin(message.author.id)) return message.reply('당신은 봇 관리자가 아닙니다!');
        else cmdpath = ((cmdtype == 0) ? `./../normal/${cmd}.js` : ((cmdtype == 1) ? `./../server_admin/${cmd}.js` : ((cmdtype == 2) ? `./../bot_admin/${cmd}.js` : '존재하지 않는 명령어')));*/
        let warn = "";
        if (cmdtype == 1 && !message.guild.member(message.author).hasPermission('ADMINISTRATOR')) warn = "\n\n**해당 명령어는 서버 관리자 명령어입니다.\n당신은 현재 서버 관리 권한이 없습니다**";
        else if (cmdtype == 2 && !rutap.isBotAdmin(message.author.id)) warn = "\n\n**해당 명령어는 봇 관리자 명령어입니다.\n당신은 현재 봇 관리 권한이 없습니다**";
        cmdpath = ((cmdtype == 0) ? `./../normal/${cmd}.js` : ((cmdtype == 1) ? `./../server_admin/${cmd}.js` : ((cmdtype == 2) ? `./../bot_admin/${cmd}.js` : '존재하지 않는 명령어')));

        try {
            if (opti.nodesetting.cmdar) delete require.cache[require.resolve(cmdpath)]; // node ./src/rutap.js -ar (auto reload)
            let command = require(cmdpath);
            HelpEmbed.setDescription(`\`<>\` : 필수 입력 사항\n\`[]\` : 선택 입력 사항\n\`A|B\` : A와 B중 택1${warn}`);
            HelpEmbed.addField('명령어 설명', `\`\`\`${command.dscr.description}\`\`\``);
            let commanduse = '';
            command.dscr.use.forEach((item) => { commanduse = commanduse + '`' + item + '`' + '\n'; });
            commanduse = commanduse.slice(0, -1);
            HelpEmbed.addField('명령어 사용 방법', commanduse);
            message.channel.send(HelpEmbed);
        } catch (err) {
            if (err.message.indexOf("Cannot find module") != -1) {
                message.reply(`존재하지 않는 명령어 입니다.\n\`${d_settings.normal_prefix}도움말\`을 입력하여 명령어를 찾아보세요.`);
            } else {
                err_module.performerr(dscl, message, opti, `./src/commands/normal/도움말.js :: ${err}`);
            }
        }
    }
};
