export enum DeclarationStatus {
  PENDING = 'pending',
  PAID = 'paid',
  ERROR = 'error',
  LITIGATION = 'litigation',
}

export const getDeclarationStatusLabel = (status: DeclarationStatus): string => {
  switch (status) {
    case DeclarationStatus.PENDING:
      return 'En attente de validation';
    case DeclarationStatus.PAID:
      return 'Payée';
    case DeclarationStatus.ERROR:
      return 'Non conforme pour erreur';
    case DeclarationStatus.LITIGATION:
      return 'Non conforme pour contentieux';
    default:
      return '';
  }
};

export const getDeclarationStatusColor = (status: DeclarationStatus): string => {
  switch (status) {
    case DeclarationStatus.PENDING:
      return 'bg-[#B45FFA]';
    case DeclarationStatus.PAID:
      return 'bg-[#5FB1FA]';
    case DeclarationStatus.ERROR:
      return 'bg-[#7A54DE]';
    case DeclarationStatus.LITIGATION:
      return 'bg-[#7A54DE]';
    default:
      return '';
  }
};

export const getDeclarationStatusIcon = (status: DeclarationStatus): string => {
  switch (status) {
    case DeclarationStatus.PENDING:
      return 'clock';
    case DeclarationStatus.PAID:
      return 'checkmark';
    case DeclarationStatus.ERROR:
      return 'loop2';
    case DeclarationStatus.LITIGATION:
      return 'cancel-circle';
    default:
      return '';
  }
};
