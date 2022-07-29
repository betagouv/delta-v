import { Info } from '@/components/common/Info';
import { SvgIcon } from '@/components/common/SvgIcon';
import { Typography } from '@/components/common/Typography';

export const TobaccoEu: React.FC = () => (
  <div className="flex flex-col">
    <div className="flex flex-row justify-around">
      <div className="flex flex-col items-center text-center">
        <div className="h-14 w-auto">
          <SvgIcon name="categoryCigarette" />
        </div>
        <span className="font-bold">800 unités</span>
        <p className="leading-tight">de cigarettes</p>
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
            <SvgIcon name="categoryCigarillos" />
          </div>
        </div>
        <div className="ml-7">
          <span className="font-bold">400 unités</span>
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
              ET
            </Typography>
          </div>
          <div className="h-14 w-auto">
            <SvgIcon name="categoryCigar" />
          </div>
        </div>
        <div className="ml-7">
          <span className="font-bold">200 unités</span>
          <p className="leading-tight">de cigares</p>
        </div>
      </div>
      <div />
      <div className="flex flex-col items-center text-center">
        <div className="flex h-14 flex-row ">
          <div className="mr-2 pt-6">
            <Typography size="text-base" weight="bold">
              ET
            </Typography>
          </div>
          <div className="h-10 w-auto self-end">
            <SvgIcon name="categoryTobacco" />
          </div>
        </div>
        <div className="ml-8">
          <span className="font-bold">1000 grammes</span>
          <p className="leading-tight">
            de tabac
            <br />à fumer
          </p>
        </div>
      </div>
    </div>
  </div>
);
