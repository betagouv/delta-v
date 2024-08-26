import { agentConnectService } from '../../../../../src/core/agentConnect/client';
import { service } from '../../../../../src/api/authentication/agentConnect/logout/service';

jest.mock('../../../../../src/core/agentConnect/client');
jest.mock('../../../../../src/utils/generateRandomString', () => ({
  generateRandomString: jest.fn().mockReturnValue('mockRandomString'),
}));

describe('AgentConnect logout service', () => {
  it('should return logoutUrl', () => {
    const mockLogoutUrl = 'https://mock-logout-url.com';
    (agentConnectService.getLogoutUrl as jest.Mock).mockReturnValue(mockLogoutUrl);

    const result = service({ idToken: 'mockIdToken', agentConnectService });

    expect(result).toEqual({ logoutUrl: mockLogoutUrl });
    expect(agentConnectService.getLogoutUrl).toHaveBeenCalledWith(
      'mockIdToken',
      'mockRandomString',
      'mockRandomString',
    );
  });
});
