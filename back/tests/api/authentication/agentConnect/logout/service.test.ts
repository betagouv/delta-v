import { service } from '../../../../../src/api/authentication/agentConnect/logout/service';
import { AgentConnectService } from '../../../../../src/core/agentConnect/service';
import { agentConnectServiceMock } from '../../../../mocks/agentConnect.service.mock';

jest.mock('../../../../../src/utils/generateRandomString', () => ({
  generateRandomString: jest.fn().mockReturnValue('mockRandomString'),
}));

describe('AgentConnect logout service', () => {
  it('should return logoutUrl', () => {
    const mockLogoutUrl = 'https://mock-logout-url.com';
    const mockAgentConnectService = agentConnectServiceMock({
      getLogoutUrl: mockLogoutUrl,
    });

    const result = service({
      idToken: 'mockIdToken',
      agentConnectService: mockAgentConnectService as AgentConnectService,
    });

    expect(result).toEqual({ logoutUrl: mockLogoutUrl, state: 'mockRandomString' });
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockAgentConnectService.getLogoutUrl).toHaveBeenCalledWith(
      'mockIdToken',
      'mockRandomString',
    );
  });
});
