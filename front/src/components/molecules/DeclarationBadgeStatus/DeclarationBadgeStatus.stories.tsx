import { Meta } from '@storybook/react';

import { DeclarationBadgeStatus } from './DeclarationBadgeStatus';
import { DeclarationStatus } from '@/utils/declarationStatus.util';

const meta: Meta<typeof DeclarationBadgeStatus> = {
  title: 'Components/Molecules/DeclarationBadgeStatus',
  component: DeclarationBadgeStatus,
};

export default meta;

export const Base = () => {
  return (
    <div className="flex flex-col gap-8">
      <DeclarationBadgeStatus status={DeclarationStatus.PAID} />
      <DeclarationBadgeStatus status={DeclarationStatus.DRAFT} />
      <DeclarationBadgeStatus status={DeclarationStatus.LITIGATION} />
      <DeclarationBadgeStatus status={DeclarationStatus.ERROR} />
      <DeclarationBadgeStatus status={DeclarationStatus.VALIDATED} />
      <DeclarationBadgeStatus status={DeclarationStatus.SUBMITTED} />
    </div>
  );
};
