import { useMemo } from 'react';

import { Header } from '@/components/business/header';
import { SummarySimulator } from '@/components/business/summarySimulator';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { Main } from '@/templates/Main';

export interface FormUpdateShoppingProduct {
  name?: string;
  price: number;
  devise: string;
}

const Summary = () => {
  const simulate = useStore((state) => state.simulate);
  const simulatorRequest = useStore((state) => state.simulator.appState.simulatorRequest);
  const simulatorResponse = useStore((state) => state.simulator.appState.simulatorResponse);

  useMemo(() => {
    simulate();
  }, []);

  return (
    <Main
      meta={
        <Meta
          title="Simulateur Déclaration Douanes"
          description="Simuler la déclaration de douane en quelques clics"
        />
      }
    >
      <div className="flex flex-col gap-4 pb-4">
        <Header />
        <SummarySimulator
          simulatorRequest={simulatorRequest}
          simulatorResponse={simulatorResponse}
          qrCodeVersion
        />
      </div>
    </Main>
  );
};
export default Summary;
