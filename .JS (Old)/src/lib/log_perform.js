// node_modules
const fs = require('fs');
const moment = require('moment');
var mkdirp = require('mkdirp');

// 자체 모듈
const fdload = require('./filedownload.js');
const err_module = require('./err_perform.js');

// settings
const l_settings = require('../settings/log_settings.js');
const err_settings = require('../settings/err_settings.js');

// 자체 함수
function getfileSize(x) {
    var s = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    var e = Math.floor(Math.log(x) / Math.log(1024));
    return (x / Math.pow(1024, e)).toFixed(2) + " " + s[e];
}

exports.msglog = async (dscl, message) => {
    // 모듈 사용 안 할 경우
    if (!l_settings.module_use) return;

    // 2020-04-20 지금 수정 못해서 임시
    if (message.channel.type == 'dm') {
        console.log("DMChannel");
        return;
    }

    /*  [TASK]
        폴더 Dir :: log_dir/id_'guild_name'/id_'channel_name'/[attachments]
        메세지 로그는 날짜별로 구분 (폴더 Dir/log_yyyy_mm_dd.log)
        attachments 로그는 날짜별로 폴더 구분 (폴더 Dir/yyyy_mm_dd/msgid_filename.ext)
    */
    
    let default_dir = `${l_settings.log_dir}/${message.guild.id}_${message.guild.name}/${message.channel.id}_${message.channel.name}`;
    let tod = moment().format('YYYY_MM_DD');

    // 1차 검증 : 폴더 Dir 존재?
    try {
        fs.statSync(default_dir);
        //console.log(`${default_dir} 폴더 찾음.`);
    } catch (err) {
      if (err.code === 'ENOENT') {
        //console.log('file or directory does not exist');
        //console.log(`${default_dir} 폴더 찾지 못함.`);
        try {
            mkdirp.sync(default_dir);
            //console.log(`${default_dir}폴더 생성 성공.`);
        } catch (err) {
            err_module.performerr(dscl, message, `log_perform.js ==> L50 예상하지 못한 오류. 상세 : ${err}`);
            return;
        }
      } else {
        err_module.performerr(dscl, message, `log_perform.js ==> L54 예상하지 못한 오류. 상세 : ${err}`);
        return;
      }
    }
    
    // 2차 검증 : 로그 파일 존재?
    try {
        fs.statSync(`${default_dir}/log_${tod}.log`);
    } catch (err) {
      if (err.code === 'ENOENT') {
        //console.log('file or directory does not exist');
        fs.writeFileSync(`${default_dir}/log_${tod}.log`, 'NOTICE || Timezone은 서버를 기준으로 합니다. 24시간 기준입니다.\nNOTICE || 메시지 상의 줄바꿈은 /n으로 처리합니다.', (err) => {
            err_module.performerr(dscl, message, `${default_dir}/log_${tod}.log 파일 생성에 실패했습니다. (log_perform.js ==> L66) 상세 : ${err}`); return;
        });
        console.log(`${default_dir}/log_${tod}.log 파일을 찾지 못하여, 파일을 새로 생성했습니다.`);
      }
    }

    // message.createdAt -> Ronly, Return Date.
    // Tue Mar 03 2020 18:44:53 GMT+0900 (Korean Standard Time) {}
    // hh(24):mm:ss

    let embed = "N";
    if (message.embeds.length != 0) embed = "Y"; // array
    let attach = "N";
    if (message.attachments.size != 0) attach = "Y"; // map    

    fs.appendFileSync(`${default_dir}/log_${tod}.log`, `\n${message.createdAt.toTimeString().split(" ")[0]} || LOG-MSG || Embed : ${embed} || Attach : ${attach} || User : ${message.author.username}#${message.author.discriminator} (${message.author.id}) || msgid : ${message.id} || msg : ${message.content}`, (err) => {
        if (err) err_module.performerr(dscl, message, `${default_dir}/log_${tod}.log 에 메시지 로그를 작성하지 못했습니다. (log_perform.js ==> L82) 상세 : ${err}`); return;
    });

    if (embed == "Y" && l_settings.include_embed) {
        for (const now of message.embeds) {
            let des = "";
            let fdes = "";
            if (! now.description == undefined) des = now.description.replace(/\r?\n/g, "/n");
            if (! now.description == undefined) fdes = now.footer.text.replace(/\r?\n/g, "/n");
            fs.appendFileSync(`${default_dir}/log_${tod}.log`, `\n${message.createdAt.toTimeString().split(" ")[0]} || LOG_EMBED for ${message.id} || Field : ${now.fields.length}개 || Type : ${now.type} || Color : ${now.hexColor} || Thumb : ${now.thumbnail} || Title : ${now.title} || Description : ${des} || Footer : [IMG] ${now.footer.iconURL} [TEXT] ${fdes}`, (err) => {
                if (err) err_module.performerr(dscl, message, `${default_dir}/log_${tod}.log 에 메시지 로그를 작성하지 못했습니다. (log_perform.js ==> L88) 상세 : ${err}`); return;
            });
            // field Y?
            if (now.fields.length != 0) {
                for (const nfield of now.fields) {
                    fs.appendFileSync(`${default_dir}/log_${tod}.log`, `\n${message.createdAt.toTimeString().split(" ")[0]} || LOG_EMBED_FIELD for ${message.id} || Name : ${nfield.name} || Value : ${nfield.value} || Inline : ${nfield.inline}`, (err) => {
                        if (err) err_module.performerr(dscl, message, `${default_dir}/log_${tod}.log 에 메시지 로그를 작성하지 못했습니다. (log_perform.js ==> L94) 상세 : ${err}`); return;
                    });
                }
            }
        }
    }

    // 중간 관문 : 다운로드 허용함? + 첨부파일 있음?
    if (l_settings.download_media && attach == "Y") {
        // 3차 검증 : 다운로드 폴더 Dir 존재?
        let dload_dir = `${default_dir}/attachments/${tod}`;
        try {
            fs.statSync(dload_dir);
        } catch (err) {
          if (err.code === 'ENOENT') {
            //console.log('file or directory does not exist');
            try {
                mkdirp.sync(dload_dir);
            } catch (err) {
                err_module.performerr(dscl, message, `${dload_dir} 에 폴더를 생성하지 못했습니다. (log_perform.js ==> L113) 상세 : ${err}`); return;
            }
            console.log(`${dload_dir} 폴더를 찾지 못하여, 폴더를 새로 생성했습니다.`);
          }
        }

        // 4차 : 링크와 함께 다운로드 떠넘기기
        for (const natt of message.attachments.array()) {
            fs.appendFileSync(`${default_dir}/log_${tod}.log`, `\n${message.createdAt.toTimeString().split(" ")[0]} || LOG-ATTACH for ${message.id} || SAVE AT : ${dload_dir}/${message.id}_${natt.filename} || ID : ${natt.id} || Filename : ${natt.filename} || Size : ${getfileSize(natt.filesize)}`, (err) => {
                if (err) err_module.performerr(dscl, message, `${default_dir}/log_${tod}.log 에 메시지 로그를 작성하지 못했습니다. (log_perform.js ==> L122) 상세 : ${err}`); return;
            });

            fdload.fdload_withfilename(natt.url, `${dload_dir}/${message.id}_${natt.filename}`)
        }
    }
}

// NOTICE :: 얘는 err_perform.js에서 호출하는 함수입니다 함부로 손대거나 호출하지 마세요!!
exports.errlog = (message, errcode, e) => {
    try {
        fs.statSync(`${l_settings.log_dir}/${err_settings.err_name}`);
    } catch (err) {
      if (err.code === 'ENOENT') {
        //console.log('file or directory does not exist');
        fs.writeFileSync(`${l_settings.log_dir}/${err_settings.err_name}`, `NOTICE || Timezone은 서버를 기준으로 합니다. 12시간 기준입니다.\nNOTICE || 메시지 상의 줄바꿈은 /n으로 처리합니다.\n${moment().format('YYYY/MM/DD a hh:mm:ss')} || INFO || 파일 새로 생성함`, function(err) {
            err_module.performerr(dscl, message, `${l_settings.log_dir}/${err_settings.err_name} 파일 생성에 실패했습니다. (log_perform.js ==> L137) 상세 : ${err}`); return;
        });
        console.log(`${l_settings.log_dir}/${err_settings.err_name} 파일을 찾지 못하여, 파일을 새로 생성했습니다.`);
      }
    }

    fs.appendFileSync(`${l_settings.log_dir}/${err_settings.err_name}`, `\n${moment().format('YYYY/MM/DD a hh:mm:ss')} || INFO || Guild : ${message.guild.name} (${message.guild.id}) || Ch : ${message.channel.name} (${message.channel.id}) || User : ${message.author.username}#${message.author.discriminator} (${message.author.id}) || Msg : ${message.content.replace(/\r?\n/g, "/n")} || Code : ${errcode} || Inf : ${e}`, (err) => {
        if (err) err_module.performerr(dscl, message, `${l_settings.log_dir}/${err_settings.err_name} 에 애러 로그를 작성하지 못했습니다. (log_perform.js ==> L144) 상세 : ${err}`); return;
    });
    
    console.log(`"${errcode}" 애러 로그가 ${l_settings.log_dir}/${err_settings.err_name} 에 작성되었습니다.`);
}