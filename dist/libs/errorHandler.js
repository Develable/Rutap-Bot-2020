"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.botErrorHandler = void 0;
const crypto = require("crypto");
const Discord = require("discord.js");
const ERR_CODE_1 = require("./../settings/ERR_CODE");
const generateErrorID = function () {
    let date = new Date();
    let dateString = date.getFullYear().toString(); // 년
    if (date.getMonth() < 10)
        dateString += '0' + date.getMonth().toString(); // 월
    else
        dateString += date.getMonth().toString();
    if (date.getDate() < 10)
        dateString += '0' + date.getDate().toString(); // 일
    else
        dateString += date.getDate().toString();
    if (date.getHours() < 10)
        dateString += '0' + date.getHours().toString(); // 시
    else
        dateString += date.getHours.toString();
    let randomCode = crypto.randomBytes(2).toString() + crypto.randomBytes(2).toString(); // 랜덤문자열 8글자
    return dateString + '-' + randomCode; // YYYYMMDDHH-asdfqwer(랜덤 8글자)
};
exports.botErrorHandler = function (message, errCode) {
    // TODO : 로그 남기기
    if (!ERR_CODE_1.ERR_CODE.has(errCode))
        exports.botErrorHandler(message, 'UNK');
    let errEmbed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle('봇에 에러가 발생했습니다.')
        .setDescription('에러가 발생했으니, 관리자에게 연락하시기 바랍니다.')
        .addField(`에러코드 : ${errCode}`, ERR_CODE_1.ERR_CODE.get(errCode))
        .setTimestamp(new Date());
    message.reply(errEmbed);
};
//# sourceMappingURL=errorHandler.js.map