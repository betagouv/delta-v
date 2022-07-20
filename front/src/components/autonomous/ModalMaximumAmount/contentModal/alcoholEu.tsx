import { SvgIcon } from '@/components/common/SvgIcon';
import { Typography } from '@/components/common/Typography';

export const AlcoholEu: React.FC = () => (
  <div className="flex flex-col">
    <div className="flex flex-row justify-around">
      <div className="flex flex-col items-center text-center">
        <div className="h-14 w-auto">
          <SvgIcon name="categorySpiritDrink" />
        </div>
        <span className="font-bold">10 litres</span>
        <p className="leading-tight">
          <span className="font-bold">
            boissons <br />
            spiritueuses <br />
          </span>
          (whisky, gin,
          <br /> vodka, ect.)
        </p>
      </div>
      <div className="flex flex-col pt-6 text-center">
        <Typography size="text-base" weight="bold">
          ET
        </Typography>
      </div>
      <div className="flex flex-col items-center text-center">
        <div className="h-14 w-auto">
          <SvgIcon name="categoryAlcoholIntermediate" />
        </div>
        <span className="font-bold">10 litres</span>
        <p className="leading-tight">
          <span className="font-bold">
            produits <br />
            intermédiaires <br />
          </span>
          (vermouth,
          <br /> porto, madère,
          <br />
          ect.)
        </p>
      </div>
    </div>
    <div className="my-4 w-full " />
    <div className="flex flex-row justify-around">
      <div className="flex flex-col items-center text-center">
        <div className="h-14 w-auto">
          <SvgIcon name="categoryWine" />
        </div>
        <span className="font-bold">90 litres</span>
        <p className="leading-tight">
          <span className="font-bold">vins</span> (dont 60 <br />
          litres au
          <br />
          maximum de <br />
          vins non <br />
          mousseux)
        </p>
      </div>
      <div className="flex flex-col pt-6 text-center">
        <Typography size="text-base" weight="bold">
          ET
        </Typography>
      </div>
      <div className="flex min-w-[100px] flex-col items-center text-center">
        <div className="h-14 w-auto">
          <SvgIcon name="categoryBeer" />
        </div>
        <span className="font-bold">110 litres</span>
        <p className="leading-tight">bières</p>
      </div>
    </div>
  </div>
);
