import { Tuto } from '../Tuto';
import StepThreeTuto from '@/assets/images/Step-Three-Tuto.jpg';

export const StepThree: React.FC = () => {
  return (
    <Tuto
      image={StepThreeTuto}
      title={
        <>
          Une question sur ce que vous ramenez de
          <br /> l’étranger ?
        </>
      }
    >
      <p className="mt-4">
        DéclareDouane vous donne{' '}
        <span className="font-bold">toutes les informations nécessaires</span> quant aux produits
        que vous ramenez avec vous de l’étranger et aux règles qui leur sont appliquées.
      </p>
    </Tuto>
  );
};
