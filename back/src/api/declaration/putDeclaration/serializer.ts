import { ResponseCodes } from '../../common/enums/responseCodes.enum';

export interface PutDeclarationResponse {
  message: string;
  code: ResponseCodes;
}

export const serializeSimulator = (): PutDeclarationResponse => ({
  message: 'Declaration updated successfully',
  code: ResponseCodes.DECLARATION_UPDATED,
});
