import * as path from 'path';
import * as fs from 'fs';

import { Error, ERR_CODE, errorHandler } from './errorHandler';

// TODO : I/O 교착(R/W가 겹칠시 그대로 멈추는거) 처리

const toStoragePath = function (storage: string): string {
    let temp: string[] = ( storage + ".json").split('/');
    let tempPath: string = path.join(__dirname, '..', '..', 'data');
    for (let item of temp) {
        tempPath = path.join(tempPath, item);
    }
    return tempPath;
};

const isAvailableStorage = function (storagePath: string): boolean {
    try {
        fs.statSync(storagePath);
        return true;
    } catch (err) {
        if (err.code == 'ENOENT') {
            return false;
        } else {
            throw err;
        }
    }
}

export const get = function (storage: string): Object {
    let storagePath = toStoragePath(storage);
    if (!isAvailableStorage(storagePath)) {
        errorHandler(new Error(ERR_CODE.STRUNEXIST));
        console.log('경로 제대로 지정좀 해라 처리하기 귀찮다. 여기서 프로그램 끄니까 알아서 처리해');
        process.exit();
    }
    if (!storagePath.endsWith('.json')) {
        console.log('JSON아니야 제대로 좀 보고 입력해');
        return {};
    }
    try {
        delete require.cache[require.resolve(storagePath)];
        let JSON = require(storagePath);
        return JSON;
    } catch (e) {
        console.log(e);
        return;
    }
}

export const set = function (storage: string, SetObject: Object): Error {
    let storagePath = toStoragePath(storage);
    if (!isAvailableStorage(storagePath)) return errorHandler(new Error(ERR_CODE.STRUNEXIST));
    let text: string = JSON.stringify(SetObject);
    fs.unlink(storagePath, (err) => {
        if (err) return errorHandler(new Error(ERR_CODE.STRDELETEFAIL));
        fs.writeFile(storagePath, text, (err) => {
            if (err) return errorHandler(new Error(ERR_CODE.STRWRITEFAIL));
            console.log('저장소 지정했어');
        });
    });
    return Error.NONE;
}

export const append = function (storage: string, appendObject: Object): Error {
    let storagePath = toStoragePath(storage);
    if (!isAvailableStorage(storagePath)) return errorHandler(new Error(ERR_CODE.STRUNEXIST));
    let tempObejct = get(storage);
    tempObejct = Object.assign(tempObejct, appendObject);
    set(storage, tempObejct);
    return Error.NONE;
}

export const create = function (storage: string): Error {
    let storagePath = toStoragePath(storage);
    if (isAvailableStorage(storagePath)) {
        console.log('OMG');
        return errorHandler(new Error(ERR_CODE.STRCREATED));
    }
    else {
        if (storage.indexOf('\\') != -1 || storage.indexOf('/') != -1) return;
        let emptyObject: Object = {};
        fs.writeFile(storagePath, emptyObject.toString(), (err) => {
            // if (err) return errorHandler(new Error(ERR_CODE.STRCREATEFAIL));
            if (err) throw err;
            console.log('저장소 만들었어');
        });
    }
    return Error.NONE;
}

export const remove = function (storage: string): Error {
    let storagePath = toStoragePath(storage);
    if (!isAvailableStorage(storagePath)) return errorHandler(new Error(ERR_CODE.STRUNEXIST));
    else fs.unlink(storagePath, (err) => {
        if (err) return errorHandler(new Error(ERR_CODE.STRDELETEFAIL));
        console.log('저장소 지웠어');
    });
    return Error.NONE;
}
