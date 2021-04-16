// node_modules
const sql = require('mysql');

// 자체 모듈

// settings
const p_settings = require('./../settings/private_settings.json');

exports.connection = sql.createConnection({
    host     : p_settings.sql_ip,
    user     : p_settings.sql_id,
    password : p_settings.sql_pw,
    database : p_settings.sql_db
});

exports.test_connection = () => {
    connection.connect(function(err){  
        if(err) {
            console.log(`Mysql 연결에 실패했습니다 :: ${err}`);
            return false;
        }
    });
    return true;
}

/*exports.perform_query = (q, pholder) => {
    // 2020-03-09 망할 비동기!!!!
    // let res;
    // connection.query(q, pholder, function(err, rows, fields) {
    //     res = rows;
    // }).then(() => {return res;});
}*/