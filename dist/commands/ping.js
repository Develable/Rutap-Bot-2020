"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ping = void 0;
// Local modules
const Command_1 = require("./../types/Command");
// EventHandler
class Ping extends Command_1.Command {
    constructor() {
        super('ping', Command_1.Permission.DEFAULT, '핑 표시 명령어', ['ping'], ['핑']);
    }
    execute(message, args) {
        process.exit();
    }
}
exports.Ping = Ping;
//# sourceMappingURL=ping.js.map