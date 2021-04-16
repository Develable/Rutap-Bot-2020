
// TODO : 에러 핸들러 생성 (핸들링/코드저장 분리)

import * as Discord from 'discord.js'; // Discord 기본 모듈
export const client: Discord.Client = new Discord.Client(); // Client 정의

import * as moment from 'moment';

import * as ls from "./libs/localStorage";
import { BOT_TOKEN } from './settings/SECRET_SETTING'; // SECRET_SETTING 불러오기
import { runCommand, addCommand } from './libs/commandHandler'; // commandHandler 사용
import { Error } from './libs/errorHandler';

import { Ping } from './commands/ping';
addCommand(new Ping());

require('./web/server');

client.on("ready", (): void => {
    console.log("I'm ready!");
    return;
});

// 봇이 서버에 참가 시 기본 틀 작성
client.on("guildCreate", (guild): void => {
    let now = moment();
    let timestamp = `${now.year()}-${now.month()}-${now.date()} ${now.hour()}:${now.minute()}:${now.second()}`;
    let template: Object = {
        activated: false,
        prefix: '!',
        last_used: timestamp,
        custom_commands: [],
        eventUse: {
            memberJoin: false,
            memberLeft: false
        },
        eventMsg: {
            OnMemberJoin: {},
            OnMemberLeft: {}
        },
        logging: {
            use: false
        },
        notice_webhookURL: null,
        warninf: {
            maxWarn: 10
        },
        voteinf: {
            use: false,
            voteCount: 0,
            voteIDCount: 1,
            voteList: {}
        }
    }
    ls.create(guild.id);
    ls.set(guild.id, template);
});

// 봇이 서버에서 나가면 데이터 지움
// 2020-07-09 향 : 이거 구조 조금 바꿀꺼임
//client.on("guildDelete", (guild): void => {
//    ls.remove(guild.id);
//});

client.on("message", (message: Discord.Message): void => {
    let guildData = ls.get(message.guild.id);
    if (message.author.bot) return;
    // 길드 활성화는 commandHandler에서 처리
    let Gprefix: string = guildData["prefix"]; // 길드 프리픽스 구해오기
    if (message.content.startsWith(Gprefix)) { // 길드 프리픽스로 시작한다면
        let args = message.content.split(' '); // 스페이스로 나누고
        let cmd = args.shift().split(Gprefix)[1]; // 명령어 구해서
        runCommand(cmd, message, args); // runCommand에 넘겨주기
    }
    return; // E
});

client.login(BOT_TOKEN);