import { Typography } from '@/components/atoms/Typography';
import { SvgIcon } from '@/components/molecules/SvgIcon';

export const AlcoholAndorra: React.FC = () => (
  <div className="flex flex-col md:text-xs">
    <div className="flex flex-row justify-around">
      <div className="flex flex-col items-center text-center">
        <div className="h-14 w-auto">
          <SvgIcon name="categoryStrongAlcohol" />
        </div>
        <span className="font-bold">1.5 litre</span>
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
        <span className="font-bold">3 litres</span>
        <p className="leading-tight">
          d’alcool <br />
          de <span className="font-bold"> -22°</span>
        </p>
      </div>
    </div>
    <div className="my-4 px-4">
      <div className="w-full border-b border-secondary-900" />
    </div>
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col items-center text-center">
        <div className="flex flex-row">
          <div className="-ml-6 mr-2 pt-6">
            <Typography size="text-base" weight="bold">
              ET
            </Typography>
          </div>
          <div className="h-14 w-auto">
            <SvgIcon name="categoryWine" />
          </div>
        </div>
        <span className="font-bold">5 litres</span>
        <p className="leading-tight">
          vin non <br />
          mousseux
        </p>
      </div>
    </div>
  </div>
);
