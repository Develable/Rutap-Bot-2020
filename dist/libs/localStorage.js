"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.append = exports.set = exports.get = void 0;
const path = require("path");
const fs = require("fs");
// TODO : I/O 교착(R/W가 겹칠시 그대로 멈추는거) 처리
const toStoragePath = function (storage) {
    let temp = (storage + ".json").split('/');
    let tempPath = path.join(__dirname, '..', '..', 'data');
    for (let item of temp) {
        tempPath = path.join(tempPath, item);
    }
    return tempPath;
};
const isAvailableStorage = function (storagePath) {
    try {
        fs.statSync(storagePath);
        return true;
    }
    catch (err) {
        if (err.code == 'ENOENT') {
            return false;
        }
        else {
            throw err;
        }
    }
};
exports.get = function (storage) {
    let storagePath = toStoragePath(storage);
    if (!storagePath.endsWith('.json')) {
        console.log('error! it\'s not a JSON file. return empty objects.');
        return {};
    }
    try {
        delete require.cache[require.resolve(storagePath)];
        let JSON = require(storagePath);
        return JSON;
    }
    catch (e) {
        console.log(e);
        return;
    }
};
exports.set = function (storage, Object, isReturn = false) {
    let storagePath = toStoragePath(storage);
    if (!isAvailableStorage(storagePath)) { } // TODO : 에러 핸들러로 변경
    let text = JSON.stringify(Object);
    fs.unlink(storagePath, (err) => {
        if (err)
            if (isReturn)
                return false;
            else
                throw err; // TODO : 에러 핸들러로 변경
        fs.writeFile(storagePath, text, (err) => {
            if (err)
                if (isReturn)
                    return false;
                else
                    throw err; // TODO : 에러 핸들러로 변경
            console.log('file writed');
        });
    });
};
exports.append = function (storage, appendObject, isReturn = false) {
    let storagePath = toStoragePath(storage);
    if (!isAvailableStorage(storagePath)) { } // TODO : 에러 핸들러로 변경
    let tempObejct = exports.get(storage);
    tempObejct = Object.assign(tempObejct, appendObject);
    exports.set(storage, tempObejct, isReturn);
    return;
};
exports.create = function (storage, isReturn = false) {
    let storagePath = toStoragePath(storage);
    if (isAvailableStorage(storagePath)) {
        console.log('error! already created storage');
        return; // TODO : 에러핸들러 변경
    }
    else {
        let temp = storage.split('/');
        if (temp.length != 1) {
            temp.pop();
            let tempPath = path.join(__dirname, '..', '..', 'data');
            for (let folder of temp) {
                tempPath = path.join(tempPath, folder);
                fs.stat(tempPath, (err, stats) => {
                    if (err.code == 'ENOENT') {
                        console.log('Missing');
                    }
                    else {
                        throw err;
                    }
                    if (stats.isFile()) {
                        console.log('error! storage folder is file'); // TODO : 에러핸들러 변경
                        return;
                    }
                    else if (stats.isDirectory()) {
                        console.log('Folder is Already Created. skip.');
                    }
                    console.log(stats.isFile());
                    console.log(stats.isDirectory());
                });
            }
        }
        else
            fs.writeFile(storagePath, '{}', (err) => {
                if (err)
                    if (isReturn)
                        return false;
                    else
                        throw err; // TODO : 에러 핸들러로 변경
                console.log('storage created');
            });
    }
};
//# sourceMappingURL=localStorage.js.map