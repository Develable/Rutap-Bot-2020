export const logUse: boolean = true; // default : true
export const activationKeyUse: boolean = false; // default : false
export const BotManagers: Array<string> = ['357857022974230538', '362198954257154051'] // 관리자 ID

/* ========================================== */

export const isManager = function (id: string): boolean {
    if (BotManagers.indexOf(id) == -1) return false;
    else return true;
}