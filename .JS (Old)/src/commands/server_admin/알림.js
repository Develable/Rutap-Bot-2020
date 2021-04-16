// node_modules
const Discord = require('discord.js');

// 자체 모듈

// settings
const d_settings = require('./../../settings/default_settings.js');

// 명령어 모듈 한정 :: 명령어 설명 정의
exports.dscr = {
    description : '유저가 서버에 입장/퇴장 할 때의 말을 직접 설정 할 수 있습니다.\n할 말을 설정 안하시면 기본 설정으로 출력됩니다.',
    use : [`${d_settings.normal_prefix}알림 <입장|퇴장> <#채널> [할 말]`, `${d_settings.normal_prefix}알림 <입장|퇴장> 끄기`]
}

// 명령어 치면 돌아가는 구역
exports.run = (dscl, message, args, opti) => {
    
}