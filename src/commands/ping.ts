// TS modules
import * as Discord from 'discord.js';

// Local modules
import { Command, Permission } from './../types/Command'; 

// EventHandler
export class Ping extends Command {
    // HelpMsg
    constructor() {
        super('ping', Permission.DEFAULT, '핑 표시 명령어', ['ping'], ['핑']);
    }
    public execute(message: Discord.Message, args?: any[]): any {
        process.exit();
    }
}