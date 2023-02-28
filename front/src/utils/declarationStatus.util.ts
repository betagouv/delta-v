export enum DeclarationStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  VALIDATED = 'validated',
  PAID = 'paid',
  REFUSED = 'refused',
}

export const getDeclarationStatusLabel = (status: DeclarationStatus): string => {
  switch (status) {
    case DeclarationStatus.DRAFT:
      return 'Brouillon';
    case DeclarationStatus.SUBMITTED:
      return 'Envoyé';
    case DeclarationStatus.VALIDATED:
      return 'Validé';
    case DeclarationStatus.PAID:
      return 'Payé';
    case DeclarationStatus.REFUSED:
      return 'Refusé';
    default:
      return '';
  }
};
