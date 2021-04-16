// node_modules
const moment = require('moment');

// 자체 모듈

// settings
const d_settings = require('../settings/default_settings.js');

exports.returntime = () => {
    return `${moment().format('YYYY/MM/DD a hh:mm')}`.toUpperCase() + ` (${d_settings.server_timezone})`;
};

exports.returntime_useinput = (i) => {
    a = moment(i)
    return `${a.format('YYYY/MM/DD a hh:mm')}`.toUpperCase() + ` (${d_settings.server_timezone})`;
};