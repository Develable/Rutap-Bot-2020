import * as express from 'express';

import * as DS from './settings/MAIN_SETTING';

const app = express();

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World!');
});

app.listen(DS.PORT, () => {
    console.log(`루탑봇 웹 서버가 ${DS.PORT}번 포트에서 작동합니다!`);
});