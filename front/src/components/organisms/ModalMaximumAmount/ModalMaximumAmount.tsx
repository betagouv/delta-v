import React from 'react';

import type { Alpha2Code } from 'i18n-iso-countries';

import { AlcoholAndorra } from './contentModal/alcoholAndorra';
import { AlcoholBorder } from './contentModal/alcoholBorder';
import { AlcoholEu } from './contentModal/alcoholEu';
import { AlcoholNonEu } from './contentModal/alcoholNonEu';
import { TobaccoAndorra } from './contentModal/tobaccoAndorra';
import { TobaccoBorder } from './contentModal/tobaccoBorder';
import { TobaccoEu } from './contentModal/tobaccoEu';
import { TobaccoNonEu } from './contentModal/tobaccoNonEu';
import Modal from '@/components/molecules/Modal';
import { CountryType, getCountryType } from '@/utils/country.util';

interface ModalMaximumAmountProps {
  open: boolean;
  onClose?: () => void;
  country?: Alpha2Code;
  border?: boolean;
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
  border = false,
): GetValuesResponse => {
  const title =
    productType === 'alcohol'
      ? 'Quelle quantité d’alcool ai-je le droit de ramener ?'
      : 'Quelle quantité de tabac ai-je le droit de ramener ?';

  let subTitle = '';
  if (countryType === CountryType.EU) {
    subTitle = 'Vous arrivez d’un pays membre de l’Union Européenne :';
  }
  if (countryType === CountryType.NON_EU) {
    if (border) {
      subTitle = 'Vous arrivez de Suisse (Frontalier).';
    } else {
      subTitle = 'Vous arrivez d’un pays non membre de l’Union Européenne :';
    }
  }
  if (countryType === CountryType.ANDORRA) {
    subTitle = "Vous arrivez d'Andorre :";
  }

  let content = <></>;
  if (productType === 'alcohol' && countryType === CountryType.NON_EU) {
    if (border) {
      content = <AlcoholBorder />;
    } else {
      content = <AlcoholNonEu />;
    }
  }
  if (productType === 'alcohol' && countryType === CountryType.EU) {
    content = <AlcoholEu />;
  }
  if (productType === 'alcohol' && countryType === CountryType.ANDORRA) {
    content = <AlcoholAndorra />;
  }
  if (productType === 'tobacco' && countryType === CountryType.NON_EU) {
    if (border) {
      content = <TobaccoBorder />;
    } else {
      content = <TobaccoNonEu />;
    }
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
  border,
}) => {
  const countryType = getCountryType(country);
  const modalData = getValues(countryType, productType, border);
  return (
    <>
      <Modal
        title={modalData.title}
        subtitle={modalData.subTitle}
        open={open}
        onClose={onClose}
        desktopTitleSize="text-sm"
        desktopSubtitleSize="text-sm"
      >
        <div className="flex flex-1 flex-col">{modalData.content}</div>
      </Modal>
    </>
  );
};
