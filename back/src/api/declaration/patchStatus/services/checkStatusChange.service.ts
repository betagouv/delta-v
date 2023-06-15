import DeclarationStatusChangeForbiddenError from '../../../common/errors/declarationStatusChangeForbidden.error';
import { DeclarationStatus } from '../../../../entities/declaration.entity';

const ALLOWED_STATUS_CHANGES_FROM_DRAFT = [
  DeclarationStatus.SUBMITTED,
  DeclarationStatus.VALIDATED,
  DeclarationStatus.PAID,
  DeclarationStatus.REFUSED_ERROR,
  DeclarationStatus.REFUSED_LITIGATION,
];
const ALLOWED_STATUS_CHANGES_FROM_SUBMITTED = [
  DeclarationStatus.VALIDATED,
  DeclarationStatus.PAID,
  DeclarationStatus.REFUSED_ERROR,
  DeclarationStatus.REFUSED_LITIGATION,
];

const ALLOWED_STATUS_CHANGES_FROM_VALIDATED = [DeclarationStatus.PAID];

const ALLOWED_STATUS_CHANGES_FROM_PAID: DeclarationStatus[] = [];
const ALLOWED_STATUS_CHANGES_FROM_REFUSED_ERROR: DeclarationStatus[] = [];
const ALLOWED_STATUS_CHANGES_FROM_REFUSED_LITIGATION: DeclarationStatus[] = [];

interface CheckStatusChangeOptions {
  initialStatus: DeclarationStatus;
  newStatus: DeclarationStatus;
}

export const checkStatusChange = ({ initialStatus, newStatus }: CheckStatusChangeOptions): void => {
  switch (initialStatus) {
    case DeclarationStatus.DRAFT:
      checkForbiddenStatusChange(newStatus, ALLOWED_STATUS_CHANGES_FROM_DRAFT);
      break;
    case DeclarationStatus.SUBMITTED:
      checkForbiddenStatusChange(newStatus, ALLOWED_STATUS_CHANGES_FROM_SUBMITTED);
      break;
    case DeclarationStatus.VALIDATED:
      checkForbiddenStatusChange(newStatus, ALLOWED_STATUS_CHANGES_FROM_VALIDATED);
      break;
    case DeclarationStatus.PAID:
      checkForbiddenStatusChange(newStatus, ALLOWED_STATUS_CHANGES_FROM_PAID);
      break;
    case DeclarationStatus.REFUSED_ERROR:
      checkForbiddenStatusChange(newStatus, ALLOWED_STATUS_CHANGES_FROM_REFUSED_ERROR);
      break;
    case DeclarationStatus.REFUSED_LITIGATION:
      checkForbiddenStatusChange(newStatus, ALLOWED_STATUS_CHANGES_FROM_REFUSED_LITIGATION);
      break;
    default:
      throw DeclarationStatusChangeForbiddenError();
  }
};

const checkForbiddenStatusChange = (
  newStatus: DeclarationStatus,
  allowedStatus: DeclarationStatus[],
): void => {
  if (!allowedStatus.includes(newStatus)) {
    throw DeclarationStatusChangeForbiddenError();
  }
};
