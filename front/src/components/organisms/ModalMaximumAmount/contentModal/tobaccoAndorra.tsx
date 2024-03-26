import { Info } from '@/components/atoms/Info';
import { Typography } from '@/components/atoms/Typography';
import { SvgIcon } from '@/components/molecules/SvgIcon';

export const TobaccoAndorra: React.FC = () => (
  <div className="flex flex-col md:text-xs">
    <div className="flex flex-row justify-around">
      <div className="flex flex-col items-center text-center">
        <div className="h-14 w-auto">
          <SvgIcon name="categoryCigarette" />
        </div>
        <span className="font-bold">300 unités</span>
        <p className="leading-tight">de cigarettes</p>
      </div>
      <div className="flex-1"></div>
      <div className="flex flex-col items-center text-center">
        <div className="flex flex-row">
          <div className="mr-2 pt-6">
            <Typography size="text-base" weight="bold">
              OU
            </Typography>
          </div>
          <div className="h-14 w-auto">
            <SvgIcon name="categoryCigarillos" />
          </div>
        </div>
        <div className="ml-7">
          <span className="font-bold">150 unités</span>
          <p className="leading-tight">de cigarillos</p>
        </div>
      </div>
    </div>
    <div className="my-4 w-full">
      <Info>
        <div className="leading-tight">
          <p>
            Une cartouche = 200 cigarettes
            <br />
            Un paquet = 20 cigarettes
          </p>
        </div>
      </Info>
    </div>
    <div className="flex flex-row justify-around">
      <div className="flex flex-col items-center text-center">
        <div className="flex flex-row">
          <div className="mr-2 pt-6">
            <Typography size="text-base" weight="bold">
              OU
            </Typography>
          </div>
          <div className="h-14 w-auto">
            <SvgIcon name="categoryCigar" />
          </div>
        </div>
        <div className="ml-7">
          <span className="font-bold">75 unités</span>
          <p className="leading-tight">de cigares</p>
        </div>
      </div>
      <div className="flex flex-col items-center text-center">
        <div className="flex h-14 flex-row ">
          <div className="mr-2 pt-6">
            <Typography size="text-base" weight="bold">
              OU
            </Typography>
          </div>
          <div className="h-10 w-auto self-end">
            <SvgIcon name="categoryTobacco" />
          </div>
        </div>
        <div className="ml-8">
          <span className="font-bold">400 grammes</span>
          <p className="leading-tight">
            de tabac
            <br />à fumer
          </p>
        </div>
      </div>
    </div>
  </div>
);
