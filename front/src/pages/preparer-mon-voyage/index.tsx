import Error from 'next/error';
import { useRouter } from 'next/router';

import { PrepareMyTrip } from '@/components/business/PrepareMyTrip';
import { Typography } from '@/components/common/Typography';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';
import { CountryType } from '@/utils/country.util';

const index = () => {
  const router = useRouter();
  const { countryType, border, id } = router.query;
  if (countryType === undefined || typeof countryType !== 'string') {
    return <Error statusCode={404} />;
  }
  if (!(border === 'true' || border === 'false')) {
    return <Error statusCode={404} />;
  }

  if (
    !(
      countryType === `${CountryType.EU}` ||
      countryType === `${CountryType.NON_EU}` ||
      countryType === `${CountryType.ANDORRA}`
    )
  ) {
    return <Error statusCode={404} />;
  }

  const finalCountryType = parseInt(countryType, 10) as CountryType;
  const finalBorder = border === 'true';
  const linkId = id as string;

  const getOriginTravel = (): React.ReactNode => {
    if (finalCountryType === CountryType.EU) {
      return (
        <>
          d'un <span className="text-link">pays de l'Union européenne (UE)</span>.
        </>
      );
    }
    if (finalCountryType === CountryType.ANDORRA) {
      return (
        <>
          d'<span className="text-link">Andorre</span>.
        </>
      );
    }

    if (finalBorder) {
      return (
        <>
          de <span className="text-link">Suisse</span> (Frontalier).
        </>
      );
    }
    return (
      <>
        d'un <span className="text-link">pays hors Union européenne (UE)</span>.
      </>
    );
  };

  return (
    <Main
      meta={
        <Meta
          title="Simulateur Déclare Douanes"
          description="Simuler la déclaration de douane en quelques clics"
        />
      }
      withHeader
      withTitle
      titleIcon="luggages"
      titleValue="Préparer mon voyage"
    >
      <div className="mt-5">
        <Typography size="text-lg" color="secondary" lineHeight="leading-7" tag="div">
          Vous arrivez en France et vous venez {getOriginTravel()}
        </Typography>
      </div>
      <PrepareMyTrip countryType={finalCountryType} border={finalBorder} linkId={linkId} />
    </Main>
  );
};

export default index;
