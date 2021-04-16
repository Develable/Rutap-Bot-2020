import * as Discord from 'discord.js';

export enum ERR_CODE {
    UNK,
    NOTERROR,
    STRUNEXIST,
    STRCREATED,
    STRCREATEFAIL,
    STRDELETEFAIL,
    STRWRITEFAIL,
}

export const errDescription: Map<ERR_CODE, string> = new Map<ERR_CODE, string>();
errDescription.set(ERR_CODE.UNK, '알 수 없는 오류입니다!');
errDescription.set(ERR_CODE.NOTERROR, '에러가 아닙니다 (?) - 처리용');
errDescription.set(ERR_CODE.STRUNEXIST, '존재하지 않는 저장소입니다.');
errDescription.set(ERR_CODE.STRCREATED, '이미 생성된 저장소입니다.');
errDescription.set(ERR_CODE.STRCREATEFAIL, '저장소 생성에 실패했습니다.');
errDescription.set(ERR_CODE.STRDELETEFAIL, '저장소 삭제에 실패했습니다.');
errDescription.set(ERR_CODE.STRWRITEFAIL, '저장소 쓰기에 실패했습니다.');

const generateErrorID = function (): string {
    let date = new Date();
    let dateString = date.getFullYear().toString(); // 년
    if (date.getMonth() < 10) dateString += '0' + date.getMonth().toString(); // 월
    else dateString += date.getMonth().toString();
    if (date.getDate() < 10) dateString += '0' + date.getDate().toString(); // 일
    else dateString += date.getDate().toString();
    if (date.getHours() < 10) dateString += '0' + date.getHours().toString(); // 시
    else dateString += date.getHours().toString();

    let randomCode = Math.random().toString(36).substr(2,8); // 랜덤문자열 8글자

    return dateString + '-' + randomCode; // YYYYMMDDHH-asdfqwer(랜덤 8글자)
}

export class Error {
    public errCode: ERR_CODE
    public errDescription: string
    public errID: string
    constructor(errCode: ERR_CODE) {
        this.errCode = errCode;
        this.errDescription = errDescription.get(errCode);
        this.errID = generateErrorID();
        return;
    }
    public static NONE = new Error(ERR_CODE.NOTERROR);
}

export const errorHandler = function (error: Error): Error {
    console.log(`에러 발생! 에러코드 : ${error.errCode}, 에러ID : ${error.errID}`);
    // TODO : 로깅
    return error;
}