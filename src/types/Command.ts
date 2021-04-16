import * as Discord from 'discord.js';

// 모든 명령어 클래스는 이 클래스를 상속해야 commandHandler에 등록 가능함.

export enum Permission {
    DEFAULT,
    GUILD_ADMIN,
    BOT_ADMIN,
}

export class CommandDescription {
    public description: string;
    public usage: string[];
    constructor(description: string = '설명 없음', usage: string[] = ['사용방법 없음']) {
        this.description = description;
        this.usage = usage;
    }
}

export class Command { // Command 클래스 정의
    public name: string; // 명령어 이름
    public alias: string[]; // 명령어 별칭
    public permission: Permission; // 명령어 실행에 필요한 권한 정의
    public description: CommandDescription; // /도움말 [명령어] 입력시 설명 + 예제 정의
    constructor(name: string, permission: Permission, description: string = '설명 없음', usage: string[] = ['사용방법 없음'], alias: string[] = []) { // 명령어 생성자
        this.name = name; // 이름을 받고
        this.alias = alias; // 별칭 지정
        this.permission = permission;
        this.description = new CommandDescription(description, usage);
    }
    public execute(message: Discord.Message, args?: any[]): any {} // 명령어 실행 함수
}