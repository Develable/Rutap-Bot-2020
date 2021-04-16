const Discord = require('discord.js');

const d_settings = require('./../../settings/default_settings.js');

exports.dscr = {
    description : `유저전용 명령어는 ${d_settings.normal_prefix}투표하기 입니다.\n\n투표를 관리할 수 있습니다. (투표는 찬반만 가능합니다.)\n투표 종료 뒤에 '비공개'를 붙여 자신만 결과를 확인 할 수도 있습니다.`,
    use : [`${d_settings.normal_prefix}투표 시작 <안건> [투표 종료일(YYYYMMDD)]`, `${d_settings.normal_prefix}투표 종료 [비공개]`]
}

exports.run = (dscl, message, args, opti) => {
    
}