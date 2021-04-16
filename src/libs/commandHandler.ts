import * as Discord from 'discord.js';
import {Command} from './../types/Command';
import * as T from './../settings/TEXT';
import * as ls from './localStorage';

export let sCommand: Object = {}; // 명령어 저장소
export const runCommand = function (commandName: string, message: Discord.Message, args?: any[]): void { // 명령어 실행 (이름과 discord.message를 필수 인자로)
    let guildData = ls.get(message.guild.id);
    if (!guildData["activated"]) {
        message.reply('활성화가 되지 않은 서버입니다.\n서버장은 !활성화 명령어를 입력하여 봇의 활성화를 진행 해 주세요.');
        return;
    }
    if (Object.keys(this.sCommand).indexOf(commandName) == -1) { // 명령어 저장소에 명령어가 없다면
        message.reply(T.randomText(T.commandNotFound)); // 명령어가 없다는 메세지 출력
        return;
    }
    this.sCommand[commandName].execute(message, args); // 명렁어 실행
    return;
}

export const addCommand = function (command: Command): void {
    sCommand[command.name] = command;
    for (let alias of command.alias) {
        this.sCommand[alias] = command;
    }
    return;
}