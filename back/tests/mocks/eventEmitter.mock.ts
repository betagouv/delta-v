import { CustomEventEmitterInterface } from '../../src/core/eventManager/eventManager';

class EventEmitterMock implements CustomEventEmitterInterface {
  public emitSendEmail = jest.fn(() => true);
  public emitSendEmailValidateAccount = jest.fn(() => true);
}
export const eventEmitterMock = new EventEmitterMock();

export const clearEventEmitterMock = (): void => {
  eventEmitterMock.emitSendEmail.mockClear();
  eventEmitterMock.emitSendEmailValidateAccount.mockClear();
};
