/*{
    "use": 1,
    "loop_timeout": 3000,
    "game": [
        {"name": "TESTING01", "type": "PLAYING"},
        {"name": "TESTING02", "type": "PLAYING"},
        {"name": "TESTING03", "type": "PLAYING"},
        {"name": "TESTING04", "type": "PLAYING"},
        {"name": "TESTING05", "type": "PLAYING"},
        {"name": "TESTING06", "type": "PLAYING"},
        {"name": "TESTING07", "type": "PLAYING"},
        {"name": "TESTING08", "type": "PLAYING"},
        {"name": "TESTING09", "type": "PLAYING"}
    ]
}*/

module.exports = class Presence {
    constructor () {  // {status: RPC_settings.status, game: RPC_settings.game[i]}
        this.use = 1;
        this.loop_timeout = 3000;
        this.count = 0;
        this.status = "online"
        this.game = [
            {"name": "TESTING01", "type": "PLAYING"},
            {"name": "TESTING02", "type": "PLAYING"},
            {"name": "TESTING03", "type": "PLAYING"},
            {"name": "TESTING04", "type": "PLAYING"},
            {"name": "TESTING05", "type": "PLAYING"},
            {"name": "TESTING06", "type": "PLAYING"},
            {"name": "TESTING07", "type": "PLAYING"},
            {"name": "TESTING08", "type": "PLAYING"},
            {"name": "TESTING09", "type": "PLAYING"},
            {"name": "TESTING10", "type": "PLAYING"}
        ]
    }

    getPresence () {
        let status = {status: this.status, game: this.game[this.count]};
        this.count += 1;
        if (this.count == this.game.length) this.count = 0;
        return status;
    }
    
    getTimeout () {
        return this.loop_timeout;
    }
}