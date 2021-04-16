// node_modules
const Discord = require('discord.js');

// 자체 모듈

// settings
const d_settings = require('./../../settings/default_settings.js');

// 명령어 모듈 한정 :: 명령어 설명 정의
exports.dscr = {
    description : `경고 조회는 ${d_settings.normal_prefix}경고조회 를 사용하세요.\n\n경고를 부여, 철회, 리셋 할 수 있습니다.`,
    use : [
        `${d_settings.normal_prefix}경고 부여 <유저언급> [사유]`,
        `${d_settings.normal_prefix}경고 철회 <유저언급> [사유]`,
        `${d_settings.normal_prefix}경고 리셋 <유저언급> [사유]`
    ]
}

// 명령어 치면 돌아가는 구역
exports.run = (dscl, message, args, opti) => {
    
}