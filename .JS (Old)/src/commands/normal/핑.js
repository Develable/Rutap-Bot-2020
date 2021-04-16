// node_modules
const Discord = require('discord.js');

// 자체 모듈
const timestamp = require('./../../lib/timestamp.js');

// settings
const d_settings = require('./../../settings/default_settings.js');

// 명령어 모듈 한정 :: 명령어 설명 정의
exports.dscr = {
    description : '채팅봇과 디스코드와의 연결 지연을 출력합니다.\n채팅봇 업타임도 같이 출력합니다',
    use : [`${d_settings.normal_prefix}핑`]
}

// 명령어 치면 돌아가는 구역
exports.run = (dscl, message, args, opti) => {
    let start = new Date("1970-01-01T00:00:00.000Z")
    let time = new Date(dscl.uptime)
    let y = (time.getFullYear() - start.getFullYear()) == 0 ? "" : `${(time.getFullYear() - start.getFullYear())}년 `;
    let m = (time.getMonth() - start.getMonth()) == 0 ? "" : `${(time.getMonth() - start.getMonth())}개월 `;
    let d = (time.getDate() - start.getDate()) == 0 ? "" : `${(time.getDate() - start.getDate())}일 `;
    let hh = (time.getHours() - start.getHours()) == 0 ? "" : `${(time.getHours() - start.getHours())}시간 `;
    let mm = (time.getMinutes() - start.getMinutes()) == 0 ? "" : `${time.getMinutes() - start.getMinutes()}분 `;
    let ss = (time.getSeconds() - start.getSeconds()) == 0 ? "" : `${time.getSeconds() - start.getSeconds()}초`;
    let PngEmbed = new Discord.RichEmbed()
        .setDescription(`봇의 디스코드 연결 지연은 \`${dscl.ping.toFixed(1)}ms\` 입니다.\n\`${y + m + d + hh + mm + ss}\`동안 가동 중 입니다.`)
        .setFooter(`© 2018-2020 Develable.\n${timestamp.returntime()}`)
        .setColor(d_settings.embed_color);
    message.channel.send(PngEmbed)
}