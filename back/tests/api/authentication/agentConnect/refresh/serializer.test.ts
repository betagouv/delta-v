import serializer from '../../../../../src/api/authentication/agentConnect/refresh/serializer';
import { ResponseCodes } from '../../../../../src/api/common/enums/responseCodes.enum';

describe('Refresh serializer', () => {
  it('should return the correct response object', () => {
    const result = serializer();

    expect(result).toEqual({
      message: 'Mot de passe modifié avec succès',
      code: ResponseCodes.USER_PASSWORD_RESET,
    });
  });
});
