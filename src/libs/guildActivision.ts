import * as ls from './localStorage';
import * as DS from './../settings/DEFAULT_SETTING';

export enum KeyType {
    once,
    speed,
    every
}

export class Key {
    public KeyCode: string
    public KeyCount: number
    public IssuerID: string
    public KeyType: KeyType
    constructor(IssuerID: string, Keycode: string, Keytype: KeyType = KeyType.every, KeyCount: number = 1) {
        this.KeyCode = Keycode;
        this.KeyType = Keytype;
        if (this.KeyType == KeyType.once || this.KeyType == KeyType.every) this.KeyCount = 1;
        else this.KeyCount = KeyCount;
        this.IssuerID = IssuerID;
    }
}

export const isKey = function (key: string): boolean {
    let keyType: RegExp = new RegExp(/[A-Z0-9]{5}(-)[A-Z0-9]{5}(-)[A-Z0-9]{5}(-)[A-Z0-9]{5}/);
    return keyType.test(key);
}

export const isKeyVaild = function (key: string): boolean {
    if (!isKey(key)) return false;
    if (DS.activationKeyUse) return true;
    let keyList = ls.get('activateKey');
    if (Object.keys(keyList).indexOf(key) == -1) return false;
    else return true;
}

export const generateKey = function (keyInfo: Key): boolean /* 생성 성공여부 리턴 */ {
    if (!isKeyVaild(keyInfo.KeyCode)) {
        let KeyList = ls.get('activateKey');
        KeyList[keyInfo.KeyCode] = {
            Issuer: keyInfo.IssuerID,
            type: keyInfo.KeyType,
            count: keyInfo.KeyCount,
            usingGuild : []
        }
        ls.set('activateKey', KeyList);
        return true;
    } else return false;
}

export const disableKey = function (key: string): boolean {
    if (!isKeyVaild(key)) return false;
    let KeyList = ls.get('activateKey');
    KeyList[key].count = 0;
    ls.set('activateKey', KeyList);
    return true;
}

export const getKeyLists = function (getOnlyVaildKey/* 사용 가능한 키만 받을지 여부 */: boolean = false): Array<string> {
    let Keys = ls.get('activateKey');
    let KeyList: Array<string> = [];
    for (let key of Object.keys(Keys)) {
        if (Keys[key].count == 0 && getOnlyVaildKey == true) KeyList[KeyList.length] = key;
        else KeyList[KeyList.length] = key;
    }
    return KeyList;
}

export const viewKeyInfo = function (key: string): null | Key { // 얘는 키 갖다가 정보 조회하는 놈임
    let KeyList = ls.get('actiavteKey');
    if (!isKeyVaild(key)) return null;
    else return new Key(key, KeyList[key].type, KeyList[key].count, KeyList[key].Issuer);
}