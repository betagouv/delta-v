import { ResponseCodes } from '../../common/enums/responseCodes.enum';

interface SerializedPatchSearchProductHistoryResponse {
  message: string;
  code: ResponseCodes;
}

export default (): SerializedPatchSearchProductHistoryResponse => ({
  message: "L'historique de recherche des produits été mis à jour",
  code: ResponseCodes.SEARCH_PRODUCT_HISTORY_UPDATED,
});
