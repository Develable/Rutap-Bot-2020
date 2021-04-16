// node_modules
const request = require('request');
const fs = require('fs');

// 자체 모듈

// settings

exports.fdload_withfilename = (url, savedir) => {
    var requestOptions = {
        method: "GET",
        uri: url,
        headers: {"User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1941.0 Safari/537.36"},
        encoding: null
    };
    request(requestOptions).pipe(fs.createWriteStream(`${savedir}`));

    return `${savedir}`;
};

exports.fdload_withoutfilename = (url, savedir) => {
    var requestOptions = {
        method: "GET",
        uri: url,
        headers: {"User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1941.0 Safari/537.36"},
        encoding: null
    };
    request(requestOptions).pipe(fs.createWriteStream(`${savedir}/${url.split("/")[url.split("/").length - 1]}`));

    return `${savedir}/${url.split("/")[url.split("/").length - 1]}`;
};
