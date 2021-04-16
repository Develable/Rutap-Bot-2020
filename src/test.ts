import * as GA from './libs/guildActivision';

let testKey = new GA.Key('asdf', 'AAAAA-BBBBB-CCCCC-DDDDD-EEEEE', GA.KeyType.every, 1);

GA.generateKey(testKey);