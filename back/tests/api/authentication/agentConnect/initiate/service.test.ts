/* eslint-disable @typescript-eslint/unbound-method */
import { service } from '../../../../../src/api/authentication/agentConnect/initiate/service';
import { AgentConnectService } from '../../../../../src/core/agentConnect/service';
import { agentConnectServiceMock } from '../../../../mocks/agentConnect.service.mock';

jest.mock('../../../../../src/utils/generateRandomString', () => ({
  generateRandomString: jest.fn().mockReturnValue('mockRandomString'),
}));

describe('AgentConnect initiate service', () => {
  it('should return state, nonce, and authorizationUrl', () => {
    const mockAuthorizationUrl = 'https://mock-auth-url.com';
    const mockAgentConnectService = agentConnectServiceMock({
      getAuthorizationUrl: mockAuthorizationUrl,
    });

    const result = service({ agentConnectService: mockAgentConnectService as AgentConnectService });

    expect(result).toEqual({
      state: 'mockRandomString',
      nonce: 'mockRandomString',
      authorizationUrl: mockAuthorizationUrl,
    });
    expect(mockAgentConnectService.getAuthorizationUrl).toHaveBeenCalledWith(
      'mockRandomString',
      'mockRandomString',
    );
  });
});
