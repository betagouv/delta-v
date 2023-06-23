export enum DeclarationStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  VALIDATED = 'validated',
  PAID = 'paid',
  ERROR = 'refused-error',
  LITIGATION = 'refused-litigation',
}

export const getDeclarationStatusLabel = (status: DeclarationStatus): string => {
  switch (status) {
    case DeclarationStatus.DRAFT:
      return 'En cours de traitement';
    case DeclarationStatus.SUBMITTED:
      return 'En attente de validation';
    case DeclarationStatus.VALIDATED:
      return 'En attente de paiement';
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
    case DeclarationStatus.SUBMITTED:
      return 'bg-[#B45FFA]';
    case DeclarationStatus.VALIDATED:
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
    case DeclarationStatus.SUBMITTED:
      return 'clock';
    case DeclarationStatus.VALIDATED:
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
