import { Tuto } from '../Tuto';
import StepTwoTuto from '@/assets/images/Step-Two-Tuto.png';

export const StepTwo: React.FC = () => {
  return (
    <Tuto
      image={StepTwoTuto}
      title={
        <>
          Vous envisagez de <br />
          revenir l’étranger avec un produit ?
        </>
      }
    >
      <p className="mt-4">
        Vous pouvez calculer, grâce au <span className="font-bold"> Simulateur</span>, les éventuels
        <span className="font-bold"> droits et taxes</span> à payer à votre retour en France pour un
        produit que vous achèteriez ou que l’on vous offrirait à
        <span className="font-bold"> lors d’un voyage de l’étranger</span>
      </p>
    </Tuto>
  );
};
