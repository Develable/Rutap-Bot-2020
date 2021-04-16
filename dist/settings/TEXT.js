"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomText = exports.commandNotFound = void 0;
exports.commandNotFound = ["명령어를 찾을 수 없습니다!", "알 수 없는 명령어입니다!"];
exports.randomText = function (text) {
    return text[Math.floor(Math.random() * (text.length + 1))];
};
//# sourceMappingURL=TEXT.js.map