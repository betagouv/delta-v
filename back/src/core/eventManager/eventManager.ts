/* eslint-disable @typescript-eslint/no-misused-promises */
import { EventEmitter } from 'events';
import { connectAndSendEmail, IMailerSendOptions } from '../mailer';
import {
  SaveAndSendValidationEmailTokenOptions,
  sendValidationEmailToken,
} from '../../api/authentication/common/services/validationToken.service';

export enum EventName {
  SEND_EMAIL = 'send-email',
  SEND_EMAIL_VALIDATE_ACCOUNT = 'send-email-validate-account',
}

export interface CustomEventEmitterInterface {
  emitSendEmail(options: IMailerSendOptions): void;
  emitSendEmailValidateAccount(options: SaveAndSendValidationEmailTokenOptions): void;
}

class CustomEventEmitter implements CustomEventEmitterInterface {
  private static instance: CustomEventEmitter;
  private eventEmitter: EventEmitter;

  private constructor() {
    this.eventEmitter = new EventEmitter();
    this.eventEmitter.on(EventName.SEND_EMAIL, connectAndSendEmail);
    this.eventEmitter.on(EventName.SEND_EMAIL_VALIDATE_ACCOUNT, sendValidationEmailToken);
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

  public emitSendEmailValidateAccount(options: SaveAndSendValidationEmailTokenOptions): void {
    this.eventEmitter.emit(EventName.SEND_EMAIL_VALIDATE_ACCOUNT, {
      options,
    });
  }
}

export const eventEmitter = CustomEventEmitter.getInstance();
export const initEventEmitter = (): CustomEventEmitter => CustomEventEmitter.getInstance();
