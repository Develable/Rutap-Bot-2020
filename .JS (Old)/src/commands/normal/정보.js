// node_modules
const Discord = require('discord.js');

// 자체 모듈
const err_perform = require('./../../lib/err_perform.js')
const timestamp = require('./../../lib/timestamp.js');

// settings
const d_settings = require('./../../settings/default_settings.js');

// 명령어 모듈 한정 :: 명령어 설명 정의
exports.dscr = {
    description : '자신/타인/서버/채널의 정보를 확인 할 수 있습니다.\n자세한 내용은 하단 사용법을 참고하세요.',
    use : [
        `${d_settings.normal_prefix}정보`,
        `${d_settings.normal_prefix}정보 [@멘션]`,
        `${d_settings.normal_prefix}정보 서버`,
        `${d_settings.normal_prefix}정보 채널`
    ]
};

// 명령어 치면 돌아가는 구역
exports.run = (dscl, message, args, opti) => {
    let today = new Date();
    let InfEmbed = new Discord.RichEmbed()
        .setFooter(`© 2018-2020 Develable.\n${timestamp.returntime()}`)
        .setColor(d_settings.embed_color);
    if (!args[1]) {
        // 가정 1 :: /정보

        // 변수 초기화
        let week = ['일', '월', '화', '수', '목', '금', '토'];
        let y = message.author.createdAt.getFullYear();
        let m = ("0" + (parseInt(message.author.createdAt.getMonth())+1)).slice(-2); // 이 주석은 검열되었습니다.
        let d = ("0" + message.author.createdAt.getDate()).slice(-2);
        let hh = ("0" + message.author.createdAt.getHours()).slice(-2);
        let mm = ("0" + message.author.createdAt.getMinutes()).slice(-2);
        let ss = ("0" + message.author.createdAt.getSeconds()).slice(-2);
        let typedate = new Date(`${y}-${m}-${d}`);

        // 모바일 detect
        let statusplatform = (message.author.presence.clientStatus == null) ? "접속 정보 없음" : ((message.author.presence.clientStatus.mobile != undefined) ? "모바일 접속" : ((message.author.presence.clientStatus.desktop != undefined) ? "PC 접속" : "접속 정보 없음"));

        // 기초 스테이터스
        let statusdisplay = (message.author.presence.status == 'online') ? `**:green_circle: 온라인** (${statusplatform})` : ((message.author.presence.status == 'idle') ? `**:yellow_circle: 자리비움** (${statusplatform})` : ((message.author.presence.status == 'dnd') ? `**:red_circle: 다른 용무 중** (${statusplatform})` : `**:black_circle: 오프라인** (${statusplatform})`));

        // 리치 프레즌스 스테이터스
        // 2020-03-11 :: 머야 일반 프레즌스도 게임 처리됨???
        //               미친 이거 어케 대응해
        // 2020-05-23 :: 저거 위에 뭔소리에요 ;;
        let rich, richstatus, richinf, party = "";
        if (message.author.presence.game == null) rich = false;
        else {
            rich = true;
            switch (message.author.presence.game.type) {
                case 0:
                    richstatus = "게임 하는 중";
                    if (message.author.presence.game.party != null) {
                        party = ` (${message.author.presence.game.party.size[0]} 중 ${message.author.presence.game.party.size[1]})`;
                    }
                    richinf = `\`${message.author.presence.game.name}\`\n\`\`\`${message.author.presence.game.details}\n${message.author.presence.game.state}${party}\`\`\``;
                    break;
                case 1:
                    richstatus = `${message.author.presence.game.name}에서 방송 하는 중`;
                    richinf = `\`${message.author.presence.game.details}\`\n${message.author.presence.game.state} 하는 중\n\n[방송 보기](${message.author.presence.game.url})`;
                    break;
                case 2:
                    /* TO-DO :: 이거 무조건 `끝나는 시간 - 시작시간`이라 음수로 나오는 경우 있음 나중에 대응하셈 */
                    let start = new Date(message.author.presence.game.timestamps.start);
                    let end = new Date(message.author.presence.game.timestamps.end);
                    let y = (end.getFullYear() - start.getFullYear()) == 0 ? "" : `${(end.getFullYear() - start.getFullYear())}년 `;
                    let m = (end.getMonth() - start.getMonth()) == 0 ? "" : `${(end.getMonth() - start.getMonth())}개월 `;
                    let d = (end.getDate() - start.getDate()) == 0 ? "" : `${(end.getDate() - start.getDate())}일 `;
                    let hh = (end.getHours() - start.getHours()) == 0 ? "" : `${(end.getHours() - start.getHours())}시간 `;
                    let mm = (end.getMinutes() - start.getMinutes()) == 0 ? "" : `${end.getMinutes() - start.getMinutes()}분 `;
                    let ss = (end.getSeconds() - start.getSeconds()) == 0 ? "" : `${end.getSeconds() - start.getSeconds()}초`;
                    let artist = message.author.presence.game.state.replace(/;/g, ", ");
                    richstatus = `${message.author.presence.game.name}에서 음악 듣는 중`;
                    richinf = `\`${message.author.presence.game.details}\`\n길이 : ${y + m + d + hh + mm + ss} **(실제 길이와 다르게 표시 될 수도 있음)**\n아티스트 : ${artist}`;
                    break;
                case 3:
                    richstatus = "영상 보는 중";
                    richinf = "이거 보시면 개발자한테 DM 주세요\n주변에 쓰는 사람 없어서 구현 못함";
                    break;
                case 4:
                    richstatus = "Custom Status 사용 중";
                    richinf = `\`${message.author.presence.game.state}\``;
                    break;
                default:
                    richstatus = "뭐하는지 모르겠음";
                    richinf = '이거 보시면 개발자한테 DM 주세요\n도대체 뭘 하길래 이게 나왔을까';
                    break;
            }
        }
        
        // 서버 별칭
        let servernick = (message.member.displayName == message.author.username) ? "(별칭 없음)" : message.member.displayName;

        // 디데이
        let dday = Math.floor((typedate.getTime() - (today.getTime()+1000)) / (1000 * 60 * 60 * 24)) * -1;

        // 기본 프로필 경우
        let userurl = (message.author.avatarURL == null) ? message.author.defaultAvatarURL : message.author.avatarURL;

        // 임베드
        InfEmbed.setTitle(`${message.author.tag} 유저 정보`);
        InfEmbed.setDescription(statusdisplay);
        InfEmbed.addField("이 서버에서의 별칭", servernick, false);
        InfEmbed.addField("디스코드 가입일", `${y}-${m}-${d} (${week[typedate.getDay()]}요일) ${hh}:${mm}:${ss} (${d_settings.server_timezone})\n가입한 지 **${dday}일**이 지났습니다.`, false);
        if (rich) InfEmbed.addField(richstatus, richinf, false); else InfEmbed.addField("아무것도 하지 않는 중", "⠀", false);
        InfEmbed.setThumbnail(userurl);
        message.channel.send(InfEmbed);
        return;
    } else {
        if (message.mentions.users.first()) {
            try {
                let User = message.mentions.users.first();
                // 변수 초기화
                let week = ['일', '월', '화', '수', '목', '금', '토'];
                let y = User.createdAt.getFullYear();
                let m = ("0" + (parseInt(User.createdAt.getMonth())+1)).slice(-2);
                let d = ("0" + User.createdAt.getDate()).slice(-2);
                let hh = ("0" + User.createdAt.getHours()).slice(-2);
                let mm = ("0" + User.createdAt.getMinutes()).slice(-2);
                let ss = ("0" + User.createdAt.getSeconds()).slice(-2);
                let typedate = new Date(`${y}-${m}-${d}`);
        
                // 모바일 detect
                // 봇도 null 되버림
                let statusplatform = (User.presence.clientStatus == null) ? "접속 정보 없음" : ((User.presence.clientStatus.mobile != undefined) ? "모바일 접속" : ((User.presence.clientStatus.desktop != undefined) ? "PC 접속" : "접속 정보 없음"));
        
                // 기초 스테이터스
                let statusdisplay = (User.presence.status == 'online') ? `**:green_circle: 온라인** (${statusplatform})` : ((User.presence.status == 'idle') ? `**:yellow_circle: 자리비움** (${statusplatform})` : ((User.presence.status == 'dnd') ? `**:red_circle: 다른 용무 중** (${statusplatform})` : `**:black_circle: 오프라인** (${statusplatform})`));
        
                // 리치 프레즌스 스테이터스
                let rich, richstatus, richinf, party = "";
                if (User.presence.game == null) rich = false;
                else {
                    rich = true;
                    switch (User.presence.game.type) {
                        case 0:
                            richstatus = "게임 하는 중";
                            if (User.presence.game.party != null) {
                                party = ` (${User.presence.game.party.size[0]} 중 ${User.presence.game.party.size[1]})`;
                            }
                            richinf = `\`${User.presence.game.name}\`\n\`\`\`${User.presence.game.details}\n${User.presence.game.state}${party}\`\`\``;
                            break;
                        case 1:
                            richstatus = `${User.presence.game.name}에서 방송 하는 중`;
                            richinf = `\`${User.presence.game.details}\`\n${User.presence.game.state} 하는 중\n\n[방송 보기](${User.presence.game.url})`;
                            break;
                        case 2:
                            let start = new Date(User.presence.game.timestamps.start);
                            let end = new Date(User.presence.game.timestamps.end);
                            let y = (end.getFullYear() - start.getFullYear()) == 0 ? "" : `${(end.getFullYear() - start.getFullYear())}년 `;
                            let m = (end.getMonth() - start.getMonth()) == 0 ? "" : `${(end.getMonth() - start.getMonth())}개월 `;
                            let d = (end.getDate() - start.getDate()) == 0 ? "" : `${(end.getDate() - start.getDate())}일 `;
                            let hh = (end.getHours() - start.getHours()) == 0 ? "" : `${(end.getHours() - start.getHours())}시간 `;
                            let mm = (end.getMinutes() - start.getMinutes()) == 0 ? "" : `${end.getMinutes() - start.getMinutes()}분 `;
                            let ss = (end.getSeconds() - start.getSeconds()) == 0 ? "" : `${end.getSeconds() - start.getSeconds()}초`;
                            let artist = User.presence.game.state.replace(/;/g, ", ");
                            richstatus = `${User.presence.game.name}에서 음악 듣는 중`;
                            richinf = `\`${User.presence.game.details}\`\n길이 : ${y + m + d + hh + mm + ss} **(실제 길이와 다르게 표시 될 수도 있음)**\n아티스트 : ${artist}`;
                            break;
                        case 3:
                            richstatus = "영상 보는 중";
                            richinf = "이거 보시면 개발자한테 DM 주세요\n주변에 쓰는 사람 없어서 구현 못함";
                            break;
                        case 4:
                            richstatus = "Custom Status 사용 중";
                            richinf = `\`${User.presence.game.state}\``;
                            break;
                        default:
                            richstatus = "뭐하는지 모르겠음";
                            richinf = '이거 보시면 개발자한테 DM 주세요\n도대체 뭘 하길래 이게 나왔을까';
                            break;
                    }
                }
        
                // 서버 별칭
                let displayName = message.guild.member(User).displayName;
                let servernick = (displayName == User.username) ? "(별칭 없음)" : displayName;
        
                // 디데이
                let dday = Math.floor((typedate.getTime() - (today.getTime()+1000)) / (1000 * 60 * 60 * 24)) * -1;
        
                // 기본 프로필 경우
                let userurl = (User.avatarURL == null) ? User.defaultAvatarURL : User.avatarURL;
        
                // 봇 식별
                let isusrorbot = (User.bot) ? "봇" : "유저";
        
                // 최근 메시지
                let lastdes = (User.lastMessage == null) ? "(봇 가동 이후 입력한 채팅 없음)" : `<#${User.lastMessage.channel.id}>\n\`\`\`${User.lastMessage.content}⠀\`\`\``;
        
                // 임베드
                InfEmbed.setTitle(`${User.tag} ${isusrorbot} 정보`);
                InfEmbed.setDescription(statusdisplay);
                InfEmbed.addField("이 서버에서의 별칭", servernick, false);
                InfEmbed.addField("디스코드 가입일", `${y}-${m}-${d} (${week[typedate.getDay()]}요일) ${hh}:${mm}:${ss} (${d_settings.server_timezone})\n가입한 지 **${dday}일**이 지났습니다.`, false);
                InfEmbed.addField("최근 메시지", lastdes, false);
                if (rich) InfEmbed.addField(richstatus, richinf, false); else InfEmbed.addField("아무것도 하지 않는 중", "⠀", false);
                InfEmbed.setThumbnail(userurl);
                message.channel.send(InfEmbed);
            } catch (err) {
                if (err.message.indexOf("404: Not Found") != -1) {
                    message.reply(`입력값이 유효하지 않습니다.\n\`${d_settings.normal_prefix}도움말 정보\`를 확인하세요.`);
                    return;
                }
                err_perform.performerr(dscl, message, err);
            }
        } else switch (args[1]) {
            case "서버":
                // 가정 3 :: /정보 서버
                break;
            case "채널":
                // 가정 4 :: /정보 채널
                if (message.channel.type != 'text') { // 설마,,
                    err_perform.performerr(dscl, message, `WTF? :: channeltype ${message.channel.type}`);
                    return;
                }
        
                // 변수 초기화
                let week = ['일', '월', '화', '수', '목', '금', '토'];
                let y = message.channel.createdAt.getFullYear();
                let m = ("0" + (parseInt(message.channel.createdAt.getMonth())+1)).slice(-2);
                let d = ("0" + message.channel.createdAt.getDate()).slice(-2);
                let hh = ("0" + message.channel.createdAt.getHours()).slice(-2);
                let mm = ("0" + message.channel.createdAt.getMinutes()).slice(-2);
                let ss = ("0" + message.channel.createdAt.getSeconds()).slice(-2);
                let typedate = new Date(`${y}-${m}-${d}`);
        
                // 디데이
                let dday = Math.floor((typedate.getTime() - (today.getTime()+1000)) / (1000 * 60 * 60 * 24)) * -1;

                // 후방주의
                let nsfwallow = (message.channel.nsfw) ? `이 채널은 **후방주의 채널입니다.**` : `이 채널은 **후방주의 채널이 아닙니다.**`;
        
                // 토픽
                let topic = (message.channel.topic == "") ? "(채널 주제가 없습니다.)" : message.channel.topic;

                // 페어런트된 카테고리
                let pcatefory = (message.channel.parent == undefined) ? "(상위 카테고리가 없습니다.)" : message.channel.parent;

                InfEmbed.setTitle(`#${message.channel.name} 채널 정보`);
                InfEmbed.setDescription(`\`${topic}\`\n\n${nsfwallow}`);
                InfEmbed.addField("상위 카테고리", `${pcatefory}`, false)
                InfEmbed.addField("채널 생성일", `${y}-${m}-${d} (${week[typedate.getDay()]}요일) ${hh}:${mm}:${ss} (${d_settings.server_timezone})\n생성된 지 **${dday}일**이 지났습니다.`, false)
                message.channel.send(InfEmbed);
                break;
            default:
                message.reply(`입력값이 유효하지 않습니다.\n\`${d_settings.normal_prefix}도움말 정보\`를 확인하세요.`);
                break;
        }
    }
}