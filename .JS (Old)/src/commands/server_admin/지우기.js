// node_modules
const Discord = require('discord.js');

// 자체 모듈

// settings
const d_settings = require('./../../settings/default_settings.js');

// 명령어 모듈 한정 :: 명령어 설명 정의
exports.dscr = {
    description : '명령어를 입력한 채널의 채팅을 삭제합니다.\n삭제 개수를 지정하지 않을 경우, 30개의 메시지를 삭제합니다.\n\n※ API 사정과 봇 권한에 따라 삭제되지 않는 메시지가 발생 할 수 있습니다.',
    use : [`${d_settings.normal_prefix}지우기 [개수]`]
}

// 명령어 치면 돌아가는 구역
exports.run = (dscl, message, args, opti) => {
    
}