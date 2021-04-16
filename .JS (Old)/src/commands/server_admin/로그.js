// node_modules
const Discord = require('discord.js');

// 자체 모듈

// settings
const d_settings = require('../../settings/default_settings.js');

// 명령어 모듈 한정 :: 명령어 설명 정의
exports.dscr = {
    description : '>>테스트 진행중입니다. 버그가 많습니다.<<\n로그 활성화 여부를 결정합니다.',
    use : [`${d_settings.normal_prefix}로그 활성화 [#채널]`, `${d_settings.normal_prefix}로그 비활성화 [#채널]`]
}

// 명령어 치면 돌아가는 구역
exports.run = (dscl, message, args, opti) => {
    
}