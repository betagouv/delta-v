import React from 'react';

import { Alpha2Code } from 'i18n-iso-countries';

import { AlcoholAndorra } from './contentModal/alcoholAndorra';
import { AlcoholEu } from './contentModal/alcoholEu';
import { AlcoholNonEu } from './contentModal/alcoholNonEu';
import { TobaccoAndorra } from './contentModal/tobaccoAndorra';
import { TobaccoEu } from './contentModal/tobaccoEu';
import { TobaccoNonEu } from './contentModal/tobaccoNonEu';
import Modal from '@/components/common/Modal';
import { CountryType, getCountryType } from '@/utils/country.util';

interface ModalMaximumAmountProps {
  open: boolean;
  onClose?: () => void;
  country?: Alpha2Code;
  productType: 'alcohol' | 'tobacco';
}

interface GetValuesResponse {
  title: string;
  subTitle: string;
  content: React.ReactNode;
}

const getValues = (
  countryType: CountryType,
  productType: 'alcohol' | 'tobacco',
): GetValuesResponse => {
  const title =
    productType === 'alcohol'
      ? 'Quelle quantité d’alcool ai-je le droit de ramener ?'
      : 'Quelle quantité de tabac ai-je le droit de ramener ?';

  let subTitle = '';
  if (countryType === CountryType.EU) {
    subTitle = 'Vous venez d’un pays membre de l’Union Européenne :';
  }
  if (countryType === CountryType.NON_EU) {
    subTitle = 'Vous venez d’un pays non membre de l’Union Européenne :';
  }
  if (countryType === CountryType.ANDORRA) {
    subTitle = "Vous venez d'Andorre :";
  }

  let content = <></>;
  if (productType === 'alcohol' && countryType === CountryType.NON_EU) {
    content = <AlcoholNonEu />;
  }
  if (productType === 'alcohol' && countryType === CountryType.EU) {
    content = <AlcoholEu />;
  }
  if (productType === 'alcohol' && countryType === CountryType.ANDORRA) {
    content = <AlcoholAndorra />;
  }
  if (productType === 'tobacco' && countryType === CountryType.NON_EU) {
    content = <TobaccoNonEu />;
  }
  if (productType === 'tobacco' && countryType === CountryType.ANDORRA) {
    content = <TobaccoAndorra />;
  }
  if (productType === 'tobacco' && countryType === CountryType.EU) {
    content = <TobaccoEu />;
  }
  return {
    title,
    subTitle,
    content,
  };
};

export const ModalMaximumAmount: React.FC<ModalMaximumAmountProps> = ({
  onClose,
  open,
  country = 'FR',
  productType,
}) => {
  const countryType = getCountryType(country);
  const modalData = getValues(countryType, productType);
  return (
    <>
      <Modal title={modalData.title} subtitle={modalData.subTitle} open={open} onClose={onClose}>
        <div className="flex flex-1 flex-col">{modalData.content}</div>
      </Modal>
    </>
  );
};
