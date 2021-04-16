export const commandNotFound: string[] = ["명령어를 찾을 수 없습니다!", "알 수 없는 명령어입니다!"];

export const randomText = function (text: string[]): string {
    return text[Math.floor(Math.random()*(text.length+1))];
}