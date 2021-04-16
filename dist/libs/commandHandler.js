"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCommand = exports.runCommand = exports.sCommand = void 0;
const T = require("./../settings/TEXT");
exports.sCommand = {}; // 명령어 저장소
exports.runCommand = function (commandName, message, args) {
    if (Object.keys(this.sCommand).indexOf(commandName) == -1) { // 명령어 저장소에 명령어가 없다면
        message.reply(T.randomText(T.commandNotFound)); // 명령어가 없다는 메세지 출력
        return;
    }
    this.sCommand[commandName].execute(message, args); // 명렁어 실행
    return;
};
exports.addCommand = function (command) {
    exports.sCommand[command.name] = command;
    for (let alias of command.alias) {
        this.sCommand[alias] = command;
    }
    return;
};
//# sourceMappingURL=commandHandler.js.map