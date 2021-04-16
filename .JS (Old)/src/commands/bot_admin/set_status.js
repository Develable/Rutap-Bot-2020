// node_modules
const Discord = require('discord.js');

// 자체 모듈

// settings
const d_settings = require('./../../settings/default_settings.js');

// 명령어 모듈 한정 :: 명령어 설명 정의
exports.dscr = {
    description : '봇의 상태를 변경합니다.',
    use : [`${d_settings.admin_prefix} set_status <Description> [PLAYING|STREAMING|LISTENING] [online|dnd|idle]`]
};

// 명령어 치면 돌아가는 구역
exports.run = (dscl, message, args, opti) => {
    
}