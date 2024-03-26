import { Tuto } from '../Tuto';
import StepOneTuto from '@/assets/images/Step-One-Tuto.png';

export const StepOne: React.FC = () => {
  return (
    <Tuto image={StepOneTuto} title="Bienvenue sur DéclareDouane !">
      <p className="mt-4">
        Ce service concerne
        <br />
        <span className="font-bold"> les produits que vous ramenez en France</span> métropolitaine
        avec vous et
        <span className="font-bold">
          {' '}
          au retour d’un voyage <br />à l’étranger.
        </span>
      </p>
    </Tuto>
  );
};
