// node_modules
const Discord = require('discord.js');

// 자체 모듈

// settings
const d_settings = require('../../settings/default_settings.js');

// 명령어 모듈 한정 :: 명령어 설명 정의
exports.dscr = {
    description : '차단된 유저가 명령어를 입력했을 경우, 1회에 한해 차단 알림을 보냅니다\n이후에는 모든 명령어를 무시합니다.\n차단 해제 시, 해당 유저에게 알림을 보냅니다.',
    use : [`${d_settings.admin_prefix} block list [페이지]`, `${d_settings.admin_prefix} block enable <유저ID> [사유]`, `${d_settings.admin_prefix} block disable <유저ID> [사유]`]
}

// 명령어 치면 돌아가는 구역
exports.run = (dscl, message, args, opti) => {
    if (! args[2]) {
        message.reply(`입력값이 올바르지 않습니다.\n${d_settings.normal_prefix}도움말 block을 참조하세요.`);
        return;
    }
    console.log(args)
}