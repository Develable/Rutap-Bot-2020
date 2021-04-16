// node_modules
const Discord = require('discord.js');
const axios = require('axios');

// 자체 모듈
const timestamp = require('../../lib/timestamp.js');
const err_module = require('./../../lib/err_perform.js');
const sql = require('../../lib/dbaseconnector.js');

// settings
const d_settings = require('../../settings/default_settings.js');

// 명령어 모듈 한정 :: 명령어 설명 정의
exports.dscr = {
    description : 'API by nekos.life\n태그를 붙이지 않을 경우, 랜덤으로 고양이 짤을 불러옵니다.\n\n2020년 이후로 nsfw 태그 기능 제공을 진행하지 않습니다.',
    use : [`${d_settings.normal_prefix}네코 도움말`, `${d_settings.normal_prefix}네코 [태그]`]
}

// 명령어 치면 돌아가는 구역
exports.run = (dscl, message, args, opti) => {
    /*
     * !! ANNOUNCEMENT !!
     * 2020-05-23 화향
     * 논란이 일어날 경우를 대비하여 nsfw 기능 자체를 제거합니다
     * 일단은 Develable DB에 태그 데이터만 남기고 코드는 전부 제거하는 방향으로 진행하겠습니다.
     * 배포용 SQL 파일에도 nsfw 태그 제거 진행한 상태입니다.
     * 만약에 nsfw 기능 되돌릴 일 있으면 프로젝트 리더한테 허가 받고 Gitlab 공지 작성일 직전 Commit 참고해서 복구 진행 해 주세요.
     */

    let ImgEmbed = new Discord.RichEmbed()
        .setFooter(`API & Image by. nekos.life\n${timestamp.returntime()}`)
        .setColor(d_settings.embed_color);

    // 도움말 경우
    if (args[1] == "도움말" && ! args[2]) {
        ImgEmbed.setTitle("네코 태그 도움말");
        ImgEmbed.setDescription(`수위 짤 태그에 관한 도움말은 \`${d_settings.normal_prefix}네코 도움말 nsfw\`를 참고하세요.\n태그 설명은 정확하지 않을 수도 있습니다.`);
        sql.connection.query("SELECT * FROM `neko_tags` WHERE nsfw=0", [], (err, rows, fields) => {
            if (err) {
                err_module.performerr(dscl, message, err);
                return;
            }

            let ntags = "", gtags = "";
            for (let i = 0; i < rows.length; i++) {
                if (rows[i]['category'] == "일반") {
                    ntags = ntags + `- **${rows[i]['kr']}** (${rows[i]['en']}) : ${rows[i]['des']}\n`;
                } else {
                    gtags = gtags + `- **${rows[i]['kr']}** (${rows[i]['en']}) : ${rows[i]['des']}\n`;
                }
            }
            ImgEmbed.addField("분류 : 일반", ntags, false);
            ImgEmbed.addField("분류 : 움짤", gtags, false);
            message.channel.send(ImgEmbed);
        });
        return;
    }

   // 태그 미입력
    if (! args[1]) {
        let requrl = `https://nekos.life/api/v2/img/neko`;
        axios.get(requrl)
        .then((res) => {
            if (res.status != 200 || res['data']['url'] == undefined) {
                message.reply(`nekos.life api 연결 실패.\`\`\`Markdown\n- url : ${requrl}\n- statsCode : ${res.status}\n- siteData--msg : ${res['data']['msg']}\`\`\``);
                return;
            }
            ImgEmbed.setTitle(`태그 : neko (네코)`);
            ImgEmbed.setImage(res['data']['url']);
            message.channel.send(ImgEmbed).then(() => {
                message.channel.send(`태그를 입력하지 않았습니다.\n\`${d_settings.normal_prefix}네코 도움말\`을 입력하여 태그를 찾아보세요.`);
            });
        }).catch((err) => {
            message.reply(`nekos.life api 연결 실패.\`\`\`Markdown\n- url : ${requrl}\n- ${err}\`\`\``);
            return;
        });
        return;
    }


    sql.connection.query("SELECT * FROM `neko_tags` WHERE kr = ? OR en = ?", [args[1], args[1]], (err, rows, fields) => {
        if (err) {
            err_module.performerr(dscl, message, err);
            return;
        }

        if (rows[0] == undefined) {
            message.reply(`유효하지 않은 태그입니다.\n\`${d_settings.normal_prefix}네코 도움말\`로 태그를 찾아보세요.`);
            return;
        }

        if (rows[0]['nsfw']) {
            message.reply("해당 태그는 이용할 수 없습니다.");
            return;
        }

        let requrl = `https://nekos.life/api/v2/img/${rows[0]['en']}`;
        axios.get(requrl)
        .then((res) => {
            if (res.status != 200 || res['data']['msg'] != undefined) {
                message.reply(`nekos.life api 연결 실패.\`\`\`Markdown\n- url : ${requrl}\n- statsCode : ${res.status}\n- siteData : ${res['data']}\`\`\``);
                return;
            }
            ImgEmbed.setTitle(`태그 : ${rows[0]['en']} (${rows[0]['kr']})`);
            ImgEmbed.setImage(res['data']['url']);
            message.channel.send(ImgEmbed);
        }).catch((err) => {
            message.reply(`nekos.life api 연결 실패.\`\`\`Markdown\n- url : ${requrl}\n- ${err}\`\`\``);
            return;
        });
    });
}