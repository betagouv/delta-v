import { useEffect, useState } from 'react';

import type { Alpha2Code } from 'i18n-iso-countries';
import { useMediaQuery } from 'react-responsive';
import shallow from 'zustand/shallow';

import { useGetDefaultCountry, usePutDefaultCountryMutation } from '@/api/hooks/useAPIConfig';
import { BackButton } from '@/components/molecules/BackButton';
import { AgentRoute } from '@/components/molecules/RouteGuard/AgentRoute';
import { DefaultCountrySettings } from '@/components/organisms/DefaultCountrySettings';
import { memoizedCountriesData } from '@/components/organisms/FormSelectCountry/utils';
import { ModalRemoveDefaultCountry } from '@/components/organisms/ModalRemoveDefaultCountry/ModalRemoveDefaultCountry';
import { ModalSelectCountry } from '@/components/organisms/ModalSelectCountry';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { MainAgent } from '@/templates/MainAgent';
import clsxm from '@/utils/clsxm';
import { countriesAlternatives, disabledCountries } from '@/utils/const';
import { ModalType } from '@/utils/modal';

const SetDefaultCountryPage = () => {
  const { displaySetDefaultCountry, hideSetDefaultCountry, showSetDefaultCountry } = useStore(
    (state) => ({
      displaySetDefaultCountry: state.global.appState.displaySetDefaultCountry,
      hideSetDefaultCountry: state.hideSetDefaultCountry,
      showSetDefaultCountry: state.showSetDefaultCountry,
    }),
    shallow,
  );

  const { data: defaultCountry, refetch: updateDefaultCountry } = useGetDefaultCountry();
  const usePutDefaultCountry = usePutDefaultCountryMutation({ onSuccess: updateDefaultCountry });

  const countriesData = memoizedCountriesData({ countriesAlternatives, disabledCountries });

  const [removeDefaultCountryModalOpen, setRemoveDefaultCountryModalOpen] = useState(false);
  const [selectCountryModalOpen, setSelectCountryModalOpen] = useState(false);
  const [defaultCountryLabel, setDefaultCountryLabel] = useState<string | undefined>(
    countriesData.find((country) => country.value === defaultCountry)?.label,
  );

  const onOpenRemoveDefaultModal = () => {
    setRemoveDefaultCountryModalOpen(true);
  };

  const onCloseRemoveDefaultModal = () => {
    setRemoveDefaultCountryModalOpen(false);
  };

  const onRemoveDefaultCountry = () => {
    usePutDefaultCountry.mutate({ country: null });
    if (usePutDefaultCountry.isSuccess) {
      onCloseRemoveDefaultModal();
    }
  };

  const onOpenSelectCountryModal = () => {
    setSelectCountryModalOpen(true);
  };

  const onCloseSelectCountryModal = () => {
    setSelectCountryModalOpen(false);
  };

  const onSelectCountry = (country: Alpha2Code) => {
    usePutDefaultCountry.mutate({ country });
  };

  useEffect(() => {
    setDefaultCountryLabel(
      countriesData.find((country) => country.value === defaultCountry)?.label,
    );
  }, [defaultCountry, countriesData]);

  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  return (
    <AgentRoute>
      <MainAgent
        meta={<Meta title="Déclare Douane" description="Modification du pays par défaut." />}
        isMobile={isMobile}
        withTitle
        withPadding
        titleHeader="Modifier le pays de nomenclature par défaut"
      >
        {!isMobile && <BackButton label="Retour" />}
        <div
          className={clsxm({
            'w-80 h-[365px] bg-secondary-bg rounded-[10px] p-[38px] mt-4': !isMobile,
            'pt-6 px-6': isMobile,
          })}
        >
          <DefaultCountrySettings
            displaySetDefaultCountry={displaySetDefaultCountry}
            onHideSetDefaultCountry={hideSetDefaultCountry}
            onOpenRemoveDefaultModal={onOpenRemoveDefaultModal}
            onOpenSelectCountryModal={onOpenSelectCountryModal}
            onShowSetDefaultCountry={showSetDefaultCountry}
            defaultCountryLabel={defaultCountryLabel}
          />
        </div>
        <ModalRemoveDefaultCountry
          isOpen={removeDefaultCountryModalOpen}
          onClose={onCloseRemoveDefaultModal}
          onRemove={onRemoveDefaultCountry}
          modalType={isMobile ? ModalType.DOWN : ModalType.CENTER}
        />
        <ModalSelectCountry
          isOpen={selectCountryModalOpen}
          onClose={onCloseSelectCountryModal}
          onSelect={(country) => onSelectCountry(country)}
          defaultCountry={defaultCountry}
          modalType={isMobile ? ModalType.DOWN : ModalType.CENTER}
        />
      </MainAgent>
    </AgentRoute>
  );
};

export default SetDefaultCountryPage;
