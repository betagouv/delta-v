import { ResponseCodes } from '../../common/enums/responseCodes.enum';

interface SerializedPatchStatusResponse {
  message: string;
  code: ResponseCodes;
}

export default (): SerializedPatchStatusResponse => ({
  message: 'Status successfully updated',
  code: ResponseCodes.DECLARATION_STATUS_UPDATED,
});
