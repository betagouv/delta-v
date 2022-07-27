import { useState } from 'react';

import { useRouter } from 'next/router';

import { ModalResumeSimulator } from '@/components/autonomous/ModalResumeSimulator';
import { ModalUnderConstruction } from '@/components/autonomous/ModalUnderConstruction';
import { Search } from '@/components/business/search';
import { Card } from '@/components/common/Card';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/components/common/Link';
import { SvgIcon } from '@/components/common/SvgIcon';
import { Typography } from '@/components/common/Typography';
import { DisplayTuto } from '@/core/hoc/displayTuto.hoc';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { Main } from '@/templates/Main';
import { Routing } from '@/utils/const';
import { getLevelWithData } from '@/utils/simulator';

const Index = () => {
  const [openModalUnderConstruction, setOpenModalUnderConstruction] = useState<boolean>(false);
  const [openModalResumeSimulator, setOpenModalResumeSimulator] = useState<boolean>(false);
  const router = useRouter();

  const { simulatorRequest } = useStore((state) => ({
    simulatorRequest: state.simulator.appState.simulatorRequest,
  }));

  const openSimulator = () => {
    if (getLevelWithData(simulatorRequest) === 1) {
      router.push(Routing.simulator);
    }
    setOpenModalResumeSimulator(true);
  };
  return (
    <Main
      meta={
        <Meta
          title="Déclaration Douane"
          description="Déclaration Douane est un outil pour les particuliers qui permet de déclarer..."
        />
      }
    >
      <div className="-mt-2 -mb-3 flex flex-col items-center">
        <div className="h-6 ">
          <SvgIcon name="logo" />
        </div>
      </div>
      <div className="mb-4 flex flex-col gap-6">
        <div>
          <Typography
            weight="bold"
            variant="h1"
            tag="h1"
            size="text-3xl"
            color="secondary"
            lineHeight="leading-none"
          >
            Bonjour
          </Typography>
          <Typography
            weight="bold"
            variant="h1"
            tag="h1"
            size="text-3xl"
            color="primary"
            lineHeight="leading-none"
          >
            Bienvenue !
          </Typography>
        </div>

        <div onClick={() => setOpenModalUnderConstruction(true)}>
          <Search onSearch={() => []} withSearchIcon searchType="faq" disabled />
        </div>

        <div className="flex flex-col gap-4">
          <Link to={Routing.prepareMyTrip}>
            <Card
              title="Préparer mon voyage"
              description="Les documents à prévoir avant votre voyage, les conseils..."
              svgName="luggages"
              rounded="lg"
              fullWidth
            />
          </Link>

          <Card
            title="Simulateur de droits et taxes"
            description="Calculez les taxes sur les produits que vous ramenez de l'étranger"
            svgName="calculator"
            rounded="lg"
            fullWidth
            onClick={() => openSimulator()}
          />

          <Link to={Routing.faq}>
            <Card
              title="FAQ"
              description="Une question ? Retrouvez toutes nos réponses ici"
              svgName="question"
              rounded="lg"
              fullWidth
            />
          </Link>
        </div>
      </div>
      <div className="-mx-4 flex flex-col gap-6 bg-primary-100 px-4 py-7">
        <Typography weight="bold" size="text-2xl" color="secondary">
          Pourquoi déclarer mes achats effectués à l’étranger ?
        </Typography>
        <Typography
          weight="normal"
          variant="body1"
          tag="p"
          color="secondary"
          lineHeight="leading-4"
        >
          Pour vous permettre d’être facilement en règle si vous avez acheté des produits à
          l’étranger et vous assurer un passage rapide et fluide lors de votre retour en France.
        </Typography>
        <Link to={Routing.faq}>
          <div className="flex flex-row items-center">
            <Typography weight="bold" variant="body1" tag="div" color="link">
              <div className="flex flex-row">
                En savoir plus
                <div className="ml-1 h-3.5 w-3.5">
                  <Icon name="arrow-right" />
                </div>
              </div>
            </Typography>
          </div>
        </Link>
      </div>
      <div className="flex flex-col gap-6 py-7">
        <Typography weight="bold" size="text-2xl" color="secondary">
          Besoin d’aide ?
        </Typography>
        <div className="flex flex-row gap-6">
          <div className="grow">
            <Link to={Routing.faq}>
              <Card
                title="FAQ"
                variant="vertical"
                description="Une question ? Retrouvez toutes nos réponses ici"
                svgName="question"
                rounded="lg"
                fullWidth
              />
            </Link>
          </div>
          <div className="flex grow flex-col">
            <Link href="mailto: ids@douane.finances.gouv.fr">
              <Card
                title="Mail"
                description="Vous pouvez nous poser votre question par mail"
                svgName="mail"
                rounded="lg"
                variant="vertical"
                fullWidth
              />
            </Link>
          </div>
        </div>
        <Link href="tel:0800944040">
          <Card
            title="Info Douane Service"
            subtitle="0 800 94 40 40"
            description={
              'Du lundi au vendredi, sauf jours \nfériés, de 8h30 à 18h.\nService et appel gratuits.'
            }
            svgName="phone"
            rounded="lg"
            variant="horizontal"
            fullWidth
          />
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <div className="-mx-4 border-t-2 border-primary-700" />
        <div className="flex flex-row">
          <div className="h-32">
            <SvgIcon name="logoFrenchRepublic" />
          </div>
          <div className="h-14">
            <SvgIcon name="logoFrenchDouane" />
          </div>
        </div>
        <Typography color="secondary" lineHeight="leading-normal">
          Pour plus d'informations vous pouvez consulter les sites suivants :
        </Typography>
        <div className="flex flex-row">
          <div className="flex flex-1 flex-col gap-4">
            <Link href="https://www.legifrance.gouv.fr/" external>
              <div className="flex flex-row gap-1">
                <Typography color="secondary" weight="bold" tag="div">
                  legifrance.gouv.fr{' '}
                </Typography>
                <span className="flex items-center text-black">
                  <Icon name="link" size="sm" />
                </span>
              </div>
            </Link>
            <Link href="https://www.service-public.fr/" external>
              <div className="flex flex-row gap-1">
                <Typography color="secondary" weight="bold" tag="div">
                  service-public.fr{' '}
                </Typography>
                <span className="flex items-center text-black">
                  <Icon name="link" size="sm" />
                </span>
              </div>
            </Link>
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <Link href="https://www.gouvernement.fr/" external>
              <div className="flex flex-row gap-1">
                <Typography color="secondary" weight="bold" tag="div">
                  gouvernement.fr{' '}
                </Typography>
                <span className="flex items-center text-black">
                  <Icon name="link" size="sm" />
                </span>
              </div>
            </Link>
            <Link href="https://www.data.gouv.fr/" external>
              <div className="flex flex-row gap-1">
                <Typography color="secondary" weight="bold" tag="div">
                  data.gouv.fr{' '}
                </Typography>
                <span className="flex items-center text-black">
                  <Icon name="link" size="sm" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-200" />
      <Typography color="middle-gray" lineHeight="leading-10" size="text-xs" tag="div">
        <span>Plan du site</span>
        <span className="mx-2 text-gray-200">|</span>
        <span>Accessibilité</span>
        <span className="mx-2 text-gray-200">|</span>
        <Link to={`${Routing.about}?id=1`} tag="span">
          Mentions légales
        </Link>
        <span className="mx-2 text-gray-200">|</span>

        <Link to={`${Routing.about}?id=2`} tag="span">
          Données personnelles
        </Link>
        <span className="mx-2 text-gray-200">|</span>
        <Link to={`${Routing.about}?id=2`} tag="span">
          Gestion des cookies
        </Link>
        <span className="mx-2 text-gray-200">|</span>
        <Link to={Routing.about} tag="span">
          <span>A propos</span>
        </Link>
      </Typography>
      <div>
        <Typography color="middle-gray" tag="div" size="text-xs" lineHeight="leading-6">
          Sauf mention contraire, tous les contenus de ce site sont sous{' '}
          <Link href="https://github.com/etalab/licence-ouverte/blob/master/LO.md" external>
            <div className="inline-flex flex-row gap-1">
              <span className="underline">licence etalab-2.0</span>
              <span className="flex items-center">
                <Icon name="link" size="sm" />
              </span>
            </div>
          </Link>
        </Typography>
      </div>
      <ModalResumeSimulator
        open={openModalResumeSimulator}
        onClose={() => setOpenModalResumeSimulator(false)}
        simulatorRequest={simulatorRequest}
      />
      <ModalUnderConstruction
        open={openModalUnderConstruction}
        onClose={() => setOpenModalUnderConstruction(false)}
      />
    </Main>
  );
};

export default DisplayTuto(Index);
