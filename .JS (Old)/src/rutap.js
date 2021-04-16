// node_modules
const Discord = require("discord.js");
const dscl = new Discord.Client();

// 자체 모듈
const log_module = require('./lib/log_perform.js');
const err_module = require('./lib/err_perform.js');
const msgresolver = require('./lib/msgresolver.js');
const sqldo = require('./lib/dbaseconnector.js');
const command_pl = require('./lib/command_plugin.js');
const EventHandler = require('./lib/eventhandler.js');

// settings
const d_settings = require('./settings/default_settings.js');
const p_settings = require('./settings/private_settings.json');
let Presence = require('./settings/presense.js');
let RPC_settings = new Presence();

let prarg = process.argv;
prarg.shift(); prarg.shift();
let ns = { // node setting
    "cmdar" : 0
};

let opti = { // 명령어에 데이터 넘길때 여따가 정의함!
    nodesetting : ns
};

let eHand; // EventHandler Return.

dscl.on('ready', () => {
    if (prarg.indexOf('-ar') != -1) ns.cmdar = 1; // arg에 -ar 들어가있으면 cmdar 값 변경
    //eHand = new EventHandler(dscl);
    console.log('ready to listening!');
    if (RPC_settings.use) {
        // 한바퀴 돌 때마다 js 리셋
        // 2020-05-30 TO-DO: 나중에 DB 이전 고려
        // for (let i in RPC_settings.game) {
        //     let presenceSet = setTimeout(() => {
        //         dscl.user.setPresence(RPC_settings.getPresence());
        //     }, RPC_settings.loop_timeout);
        // }
        
        // delete require.cache[require.resolve('./settings/presense.js')];
        // Presence = require('./settings/presense.js');
        // RPC_settings = new Presence();
        let presenceSet = setInterval(() => {
            let status = RPC_settings.getPresence();
            console.log(status);
            dscl.user.setPresence(status);
        }, RPC_settings.getTimeout());
    }
});

// 2020-03-03 TO-DO: try-catch 잡아놔라ㅏㅏ
dscl.on('message', (message) => {
    // 메시지 리턴보다 로그가 우선임!!!!!
    // 2020-05-03 TO-DO: 메시지 채널 DM일 경우 Guild 없는거 대응 요함!
    log_module.msglog(dscl, message);

    // 가1 : 잠수중인 본인이 채팅
    command_pl.afk_disable(message);

    // 가2 : 타인이 잠수중인 사람 언급
    if (message.mentions.users.size != 0) { // 역할 멘션은 안쳐줌
        command_pl.afk_noti(message); 
    }

    // 가3 : 해당 메시지가 커스텀 커맨드에 등록 경우
    if (command_pl.msg_cc_check(dscl, message) == true) {
        command_pl.msg_cc_perform(dscl, message);
        return;
    }

    // 틸토 바보,, message.channel이 아니라 message.channel.type,,
    if (message.author.bot || message.channel.type == 'dm') return;
    let args = message.content.split(' ');
    msgresolver.run(dscl, message, args, opti);
});

dscl.login(p_settings.token);