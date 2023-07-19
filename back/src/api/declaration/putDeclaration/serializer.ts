import { ResponseCodes } from '../../common/enums/responseCodes.enum';

export interface PutDeclarationResponse {
  message: string;
  code: ResponseCodes;
}

export const serializeSimulator = (): PutDeclarationResponse => ({
  message: 'Declaration mise à jour avec succès',
  code: ResponseCodes.DECLARATION_UPDATED,
});
