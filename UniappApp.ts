import {
    IAppAccessors,
    IHttp,
    ILogger,
    IPersistence,
    IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IMessage } from '@rocket.chat/apps-engine/definition/messages';
import { IPreMessageSentPrevent } from '@rocket.chat/apps-engine/definition/messages/IPreMessageSentPrevent';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';

export class UniappApp extends App implements IPreMessageSentPrevent {
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
        logger.debug("Cabaceira University Logging Log");

    }
    async checkPreMessageSentPrevent?(message: IMessage, read: IRead, http: IHttp): Promise<boolean> {
        if (message.room.slugifiedName == 'general') {
            return false;
        } else {
            return true;
        }


    }
    async executePreMessageSentPrevent(message: IMessage, read: IRead, http: IHttp, persistence: IPersistence): Promise<boolean> {
        return message.text == 'test';
    }
}
