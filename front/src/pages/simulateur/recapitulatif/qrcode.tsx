import { useMemo } from 'react';

import shallow from 'zustand/shallow';

import { SummarySimulator } from '@/components/organisms/SummarySimulator';
import { simulator } from '@/core/hoc/simulator.hoc';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { Main } from '@/templates/Main';

export interface FormUpdateShoppingProduct {
  name?: string;
  value: number;
  devise: string;
}

const Summary = () => {
  const { simulate, simulatorRequest, simulatorResponse } = useStore(
    (state) => ({
      simulate: state.simulate,
      simulatorRequest: state.simulator.appState.simulatorRequest,
      simulatorResponse: state.simulator.appState.simulatorResponse,
    }),
    shallow,
  );

  useMemo(() => {
    if (!simulatorResponse) {
      simulate();
    }
  }, []);

  return (
    <Main
      meta={
        <Meta
          title="Simulateur Déclare Douanes"
          description="Simuler la déclaration de douane en quelques clics"
        />
      }
      withHeader
    >
      <div className="flex flex-col pb-4">
        <SummarySimulator
          simulatorRequest={simulatorRequest}
          simulatorResponse={simulatorResponse}
          qrCodeVersion
        />
      </div>
    </Main>
  );
};
export default simulator(Summary);
