/* eslint-disable @typescript-eslint/no-misused-promises */
import { EventEmitter } from 'events';
import { connectAndSendEmail, IMailerSendOptions } from '../mailer';

export enum EventName {
  SEND_EMAIL = 'send-email',
  SEND_EMAIL_VALIDATE_ACCOUNT = 'send-email-validate-account',
}

export interface CustomEventEmitterInterface {
  emitSendEmail(options: IMailerSendOptions): void;
}

class CustomEventEmitter implements CustomEventEmitterInterface {
  private static instance: CustomEventEmitter;
  private eventEmitter: EventEmitter;

  private constructor() {
    this.eventEmitter = new EventEmitter();
    this.eventEmitter.on(EventName.SEND_EMAIL, connectAndSendEmail);
  }

  public static getInstance(): CustomEventEmitter {
    if (!CustomEventEmitter.instance) {
      CustomEventEmitter.instance = new CustomEventEmitter();
    }
    return CustomEventEmitter.instance;
  }

  public emitSendEmail(options: IMailerSendOptions): void {
    this.eventEmitter.emit(EventName.SEND_EMAIL, options);
  }
}

export const eventEmitter = CustomEventEmitter.getInstance();
export const initEventEmitter = (): CustomEventEmitter => CustomEventEmitter.getInstance();
