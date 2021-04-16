// node_modules
const Discord = require("discord.js");

// 자체 모듈
const sqldo = require('./dbaseconnector.js');
const timestamp = require('./timestamp.js');

// settings
const d_settings = require('./../settings/default_settings.js');

module.exports = class EventHandler {
    constructor (client) {
        let a;
        // 카테고리별로 정리합니다

        /* 채널 관련 */
        client.on("channelCreate", (channel) => {a=this.log_enabled(channel.guild);if(a){this.create_channel(channel)}});
        client.on("channelDelete", (channel) => {a=this.log_enabled(channel.guild);if(a){this.delete_channel(channel)}});
        client.on("channelPinsUpdate", (channel, time) => {a=this.log_enabled(channel.guild);if(a){this.update_channel_pin(channel, time)}});
        client.on("channelUpdate", (oldChannel, newChannel) => {a=this.log_enabled(oldChannel.guild);if(a){this.update_channel(oldChannel, newChannel)}});

        /* 반응 관련 */
        client.on("emojiCreate", (emoji) => {a=this.log_enabled(emoji.guild);if(a){this.create_emoji(emoji)}});
        client.on("emojiDelete", (emoji) => {a=this.log_enabled(emoji.guild);if(a){this.delete_emoji(emoji)}});
        client.on("emojiUpdate", (oldEmoji, newEmoji) => {a=this.log_enabled(oldEmoji.guild);if(a){this.update_emoji(oldEmoji, newEmoji)}});

        /* 길드 모더레이팅 - 베이직 */
        client.on("guildBanAdd", (guild, user) => {a=this.log_enabled(guild);if(a){this.add_guild_ban(guild, user)}});
        client.on("guildBanRemove", (guild, user) => {a=this.log_enabled(guild);if(a){this.remove_guild_ban(guild, user)}});
        client.on("guildUpdate", (oldGuild, newGuild) => {a=this.log_enabled(oldGuild);if(a){this.guild_update(oldGuild, newGuild)}});
        client.on("guildMemberUpdate", (oldMember, newMember) => {a=this.log_enabled(oldMember.guild);if(a){this.user_state_changed(oldMember, newMember)}}); 
        client.on("voiceStateUpdate", (oldState, newState) => {a=this.log_enabled(oldState.channel.guild);if(a){this.user_voice_state_updated(oldState, newState)}});
        client.on("webhookUpdate", (channel) => {a=this.log_enabled(channel.guild);if(a){this.webhook_updated(channel)}});

        /* 길드 모더레이팅 - 초대 */
        client.on("inviteCreate", (invite) => {a=this.log_enabled(invite.guild);if(a){this.guild_created_invite(invite)}});
        client.on("inviteDelete", (invite) => {a=this.log_enabled(invite.guild);if(a){this.guild_deleted_invite(invite)}});

        /* 길드 모더레이팅 - 역할 */
        client.on("roleCreate", (role) => {a=this.log_enabled(role.guild);if(a){this.created_role(role)}});
        client.on("roleDelete", (role) => {a=this.log_enabled(role.guild);if(a){this.deleted_role(role)}});
        client.on("roleUpdate", (role) => {a=this.log_enabled(role.guild);if(a){this.updated_role(role)}});

        /* 참여, 퇴장 */
        client.on("guildCreate", (guild) => {a=this.log_enabled(guild);if(a){this.bot_joined_guild(guild)}});
        client.on("guildDelete", (guild) => {a=this.log_enabled(guild);if(a){this.bot_left_guild(guild)}});
        client.on("guildMemberAdd", (member) => {a=this.log_enabled(member.guild);if(a){this.user_joined_guild(member)}});
        client.on("guildMemberRemove", (member) => {a=this.log_enabled(member.guild);if(a){this.user_left_guild(member)}});

        /* 메시지 */
        client.on("messageDelete", (message) => {a=this.log_enabled(message.guild);if(a){this.message_deleted(message)}});
        client.on("messageReactionAdd", (messateReaction, user) => {a=this.log_enabled(messateReaction.message.guild);if(a){this.message_reaction_added(messateReaction, user)}});
        client.on("messageReactionRemove", (messateReaction, user) => {a=this.log_enabled(messateReaction.message.guild);if(a){this.message_reaction_removed(messateReaction, user)}});
        client.on("messageReactionRemoveAll", (member) => {a=this.log_enabled(member.guild);if(a){this.message_reaction_all_removed(member)}});
        client.on("messageUpdate", (oldMessage, newMessage) => {a=this.log_enabled(oldMessage.guild);if(a){this.message_updated(oldMessage, newMessage)}});

        /* 기타 */
        client.on("guildUnavailable", (guild) => {a=this.log_enabled(guild);if(a){this.guild_unavailable(guild)}});
        //client.on("userUpdate", (oldUser, newUser) => {this.user_updated(oldUser, newUser)}); // 길드정보 어케 찾아와 망할
    }

    // 에러 핸들링
    error_handler(error) {
        console.log('error at eventhandler.js');
        console.log(error);
    }
    
    // 임베드 기본 셋업
    event_setup_return() {
        return DefaultEmbed = new Discord.MessageEmbed()
            .setFooter(`© 2018-2020 Develable.\n${timestamp.returntime()}`)
            .setColor(d_settings.embed_color);
    }
    
    // 2020-04-22일자 API Docs 순으로 함수 나열합니다
    create_channel(channel) {
        try{
            // Your some codes here ..
        } catch (err) {
            this.error_handler(err)
        }
    }

    delete_channel(channel) {
        try{
            // Your some codes here ..
        } catch (err) {
            this.error_handler(err)
        }
    }

    update_channel_pin(chanel, time) {
        try{
            // Your some codes here ..
        } catch (err) {
            this.error_handler(err)
        }
    }

    update_channel(old_ch, new_ch) {
        try{
            // Your some codes here ..
        } catch (err) {
            this.error_handler(err)
        }
    }

    create_emoji(emoji) {
        try{
            // Your some codes here ..
        } catch (err) {
            this.error_handler(err)
        }
    }

    delete_emoji(emoji) {
        try{
            // Your some codes here ..
        } catch (err) {
            this.error_handler(err)
        }
    }
    
    update_emoji(emoji) {
        try{
            // Your some codes here ..
        } catch (err) {
            this.error_handler(err)
        }
    }

    add_guild_ban(guild, user) {
        try{
            // Your some codes here ..
        } catch (err) {
            this.error_handler(err)
        }
    }

    remove_guild_ban(guild, user) {
        try{
            // Your some codes here ..
        } catch (err) {
            this.error_handler(err)
        }
    }

    bot_joined_guild(guild) {
        try{
            // Your some codes here ..
        } catch (err) {
            this.error_handler(err)
        }
    }

    bot_left_guild(guild) {
        try{
            // Your some codes here ..
        } catch (err) {
            this.error_handler(err)
        }
    }

    user_joined_guild(member) {
        try{
            // Your some codes here ..
        } catch (err) {
            this.error_handler(err)
        }
    }

    user_left_guild(member) {
        try{
            // Your some codes here ..
        } catch (err) {
            this.error_handler(err)
        }
    }

    user_state_changed(old_mb, new_mb) {
        try{
            // Your some codes here ..
        } catch (err) {
            this.error_handler(err)
        }
    }

    guild_unavailable(guild) {
        try{
            // Your some codes here ..
        } catch (err) {
            this.error_handler(err)
        }
    }

    guild_update(old_g, new_g) {
        try{
            // Your some codes here ..
        } catch (err) {
            this.error_handler(err)
        }
    }

    guild_created_invite(invite) {
        try{
            // Your some codes here ..
        } catch (err) {
            this.error_handler(err)
        }
    }

    guild_deleted_invite(invite) {
        try{
            // Your some codes here ..
        } catch (err) {
            this.error_handler(err)
        }
    }

    message_deleted(message) {
        try{
            // Your some codes here ..
        } catch (err) {
            this.error_handler(err)
        }
    }

    message_reaction_added(msg_reaction, user) {
        try{
            // Your some codes here ..
        } catch (err) {
            this.error_handler(err)
        }
    }

    message_reaction_removed(msg_reaction, user) {
        try{
            // Your some codes here ..
        } catch (err) {
            this.error_handler(err)
        }
    }

    message_reaction_all_removed(msg_reactoin, user) {
        try{
            // Your some codes here ..
        } catch (err) {
            this.error_handler(err)
        }
    }

    message_updated(old_msg, new_msg) {
        try{
            // Your some codes here ..
        } catch (err) {
            this.error_handler(err)
        }
    }

    created_role(role) {
        try{
            // Your some codes here ..
        } catch (err) {
            this.error_handler(err)
        }
    }

    deleted_role(role) {
        try{
            // Your some codes here ..
        } catch (err) {
            this.error_handler(err)
        }
    }

    updated_role(old_r, new_r) {
        try{
            // Your some codes here ..
        } catch (err) {
            this.error_handler(err)
        }
    }

    user_updated(old_u, new_u) {
        // 잘봐라 user_state_changed하고 다르다!!
        try{
            // Your some codes here ..
        } catch (err) {
            this.error_handler(err)
        }
    }

    user_voice_state_updated(old_s, new_s) {
        try{
            // Your some codes here ..
        } catch (err) {
            this.error_handler(err)
        }
    }

    webhook_updated(channel) {
        try{
            // Your some codes here ..
        } catch (err) {
            this.error_handler(err)
        }
    }
}

// End of code.