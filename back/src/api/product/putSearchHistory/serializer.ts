import { ResponseCodes } from '../../common/enums/responseCodes.enum';

interface SerializedPutSearchProductHistoryResponse {
  message: string;
  code: ResponseCodes;
}

export default (): SerializedPutSearchProductHistoryResponse => ({
  message: "L'historique de recherche des produits été mis à jour",
  code: ResponseCodes.SEARCH_PRODUCT_HISTORY_UPDATED,
});
