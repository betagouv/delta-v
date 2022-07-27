import { Tuto } from '../Tuto';
import StepFourTuto from '@/assets/images/Step-Four-Tuto.jpg';

export const StepFour: React.FC = () => {
  return (
    <Tuto image={StepFourTuto} title="Un outil qui continue à s’améliorer !" lastOne>
      <p className="mt-4">
        DéclareDouane propose des <span className="font-bold">informations indicatives</span> sur
        les produits que vous ramenez de l’étranger. Il ne vous dispense pas du passage par le
        guichet “Douane” à votre retour en France !<br />
        <span className="font-bold">
          L'outil vous permettra bientôt de déclarer vos marchandises et de payer en ligne.
        </span>
      </p>
    </Tuto>
  );
};
