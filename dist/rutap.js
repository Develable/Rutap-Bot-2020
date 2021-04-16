"use strict";
// TODO : 에러 핸들러 생성 (핸들링/코드저장 분리)
Object.defineProperty(exports, "__esModule", { value: true });
exports.prefix = exports.client = void 0;
const Discord = require("discord.js"); // Discord 기본 모듈
exports.client = new Discord.Client(); // Client 정의
const ls = require("./libs/localStorage");
const SECRET_SETTING_1 = require("./settings/SECRET_SETTING"); // SECRET_SETTING 불러오기
const commandHandler_1 = require("./libs/commandHandler"); // commandHandler 사용
exports.prefix = ls.get('prefix'); // prefix 불러오기
ls.create('test/test'); // TODO : 이부분 왜 문제 생기지
ls.create('test');
const ping_1 = require("./commands/ping");
commandHandler_1.addCommand(new ping_1.Ping());
exports.client.on("ready", () => {
    console.log("I'm ready!");
    return;
});
exports.client.on("guildCreate", (guild) => {
});
exports.client.on("message", (message) => {
    if (message.author.bot)
        return;
    let Gprefix = exports.prefix[message.guild.id]; // 길드 프리픽스 구해오기
    if (message.content.startsWith(Gprefix)) { // 길드 프리픽스로 시작한다면
        let args = message.content.split(' '); // 스페이스로 나누고
        let cmd = args.shift().split(Gprefix)[1]; // 명령어 구해서
        commandHandler_1.runCommand(cmd, message, args); // runCommand에 넘겨주기
    }
    return; // 콜백함수 종료
});
exports.client.login(SECRET_SETTING_1.BOT_TOKEN); // 봇 로그인
//# sourceMappingURL=rutap.js.map