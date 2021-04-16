"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = exports.CommandDescription = exports.Permission = void 0;
// 모든 명령어 클래스는 이 클래스를 상속해야 commandHandler에 등록 가능함.
var Permission;
(function (Permission) {
    Permission[Permission["DEFAULT"] = 0] = "DEFAULT";
    Permission[Permission["GUILD_ADMIN"] = 1] = "GUILD_ADMIN";
    Permission[Permission["BOT_ADMIN"] = 2] = "BOT_ADMIN";
})(Permission = exports.Permission || (exports.Permission = {}));
class CommandDescription {
    constructor(description = '설명 없음', usage = ['사용방법 없음']) {
        this.description = description;
        this.usage = usage;
    }
}
exports.CommandDescription = CommandDescription;
class Command {
    constructor(name, permission, description = '설명 없음', usage = ['사용방법 없음'], alias = []) {
        this.name = name; // 이름을 받고
        this.alias = alias; // 별칭 지정
        this.permission = permission;
        this.description = new CommandDescription(description, usage);
    }
    execute(message, args) { } // 명령어 실행 함수
}
exports.Command = Command;
//# sourceMappingURL=Command.js.map