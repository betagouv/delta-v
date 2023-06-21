import { ResponseCodes } from '../../common/enums/responseCodes.enum';

interface SerializedPatchStatusResponse {
  message: string;
  code: ResponseCodes;
}

export default (): SerializedPatchStatusResponse => ({
  message: 'Le statut de la déclaration a été mis à jour',
  code: ResponseCodes.DECLARATION_STATUS_UPDATED,
});
