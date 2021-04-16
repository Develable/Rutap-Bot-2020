
const d_settings = require('./../settings/default_settings.js');

exports.isBotAdmin = function(id) {
    let isBotAdmin = false;
    d_settings.owner_id.some((item) => {
        if (item == id) {
            isBotAdmin = true;
            return isBotAdmin;
        }
    });
    return isBotAdmin;
};
