import { SvgIcon } from '@/components/common/SvgIcon';
import { Typography } from '@/components/common/Typography';

export const AlcoholNonEu: React.FC = () => (
  <div className="flex flex-col md:text-xs">
    <div className="flex flex-row justify-around">
      <div className="flex flex-col items-center text-center">
        <div className="h-14 w-auto">
          <SvgIcon name="categoryStrongAlcohol" />
        </div>
        <span className="font-bold">1 litre</span>
        <p className="leading-tight">
          d’alcool <br />
          de <span className="font-bold"> +22°</span>
        </p>
      </div>
      <div className="flex flex-col pt-6 text-center">
        <Typography size="text-base" weight="bold">
          OU
        </Typography>
      </div>
      <div className="flex flex-col items-center text-center">
        <div className="h-14 w-auto">
          <SvgIcon name="categorySoftAlcohol" />
        </div>
        <span className="font-bold">2 litres</span>
        <p className="leading-tight">
          d’alcool <br />
          de <span className="font-bold"> -22°</span>
        </p>
      </div>
    </div>
    <div className="my-4 px-4">
      <div className="w-full border-b border-secondary-900" />
    </div>
    <div className="flex flex-row justify-around">
      <div className="flex flex-col items-center text-center">
        <div className="flex flex-row">
          <div className="mr-2 pt-6">
            <Typography size="text-base" weight="bold">
              ET
            </Typography>
          </div>
          <div className="h-14 w-auto">
            <SvgIcon name="categoryWine" />
          </div>
        </div>
        <div className="ml-6">
          <span className="font-bold">4 litres</span>
          <p className="leading-tight">
            vin non <br />
            mousseux
          </p>
        </div>
      </div>
      <div />
      <div className="flex flex-col items-center text-center">
        <div className="flex flex-row">
          <div className="mr-2 pt-6">
            <Typography size="text-base" weight="bold">
              ET
            </Typography>
          </div>
          <div className="h-14 w-auto">
            <SvgIcon name="categoryBeer" />
          </div>
        </div>
        <div className="ml-7">
          <span className="font-bold">16 litres</span>
          <p className="leading-tight">bière</p>
        </div>
      </div>
    </div>
  </div>
);
