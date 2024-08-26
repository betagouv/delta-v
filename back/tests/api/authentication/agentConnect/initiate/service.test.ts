/* eslint-disable @typescript-eslint/unbound-method */
import { agentConnectService } from '../../../../../src/core/agentConnect/client';
import { service } from '../../../../../src/api/authentication/agentConnect/initiate/service';

jest.mock('../../../../../src/core/agentConnect/client');
jest.mock('../../../../../src/utils/generateRandomString', () => ({
  generateRandomString: jest.fn().mockReturnValue('mockRandomString'),
}));

describe('AgentConnect initiate service', () => {
  it('should return state, nonce, and authorizationUrl', () => {
    const mockAuthorizationUrl = 'https://mock-auth-url.com';
    (agentConnectService.getAuthorizationUrl as jest.Mock).mockReturnValue(mockAuthorizationUrl);

    const result = service({ agentConnectService });

    expect(result).toEqual({
      state: 'mockRandomString',
      nonce: 'mockRandomString',
      authorizationUrl: mockAuthorizationUrl,
    });
    expect(agentConnectService.getAuthorizationUrl).toHaveBeenCalledWith(
      'mockRandomString',
      'mockRandomString',
    );
  });
});
