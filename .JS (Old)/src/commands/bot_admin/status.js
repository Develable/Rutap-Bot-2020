// node_modules
const Discord = require('discord.js');

// 자체 모듈

// settings
const d_settings = require('./../../settings/default_settings.js');

// 명령어 모듈 한정 :: 명령어 설명 정의
exports.dscr = {
    description : '해당 봇의 정보(참여중인 서버, 하드웨어 상태 등)를 조회합니다.',
    use : [`${d_settings.admin_prefix} status`]
};

// 명령어 치면 돌아가는 구역
exports.run = (dscl, message, args, opti) => {
    
}