import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useDeclarationMutation } from '@/api/hooks/useAPIDeclaration';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { TextLink } from '@/components/atoms/TextLink';
import { Typography } from '@/components/atoms/Typography';
import { SummaryDeclaration } from '@/components/organisms/SummaryDeclaration';
import { SummaryDeclarationExport } from '@/components/organisms/SummaryDeclarationExport';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';
import { Routing } from '@/utils/const';
import { isUUIDRegex } from '@/utils/formatTools';

const DeclarationSearch = () => {
  const router = useRouter();
  const query = router.query as { id: string };
  const id = isUUIDRegex(query.id) ? query.id : '';

  const getDeclarationMutation = useDeclarationMutation({});

  const { isLoading, data: declarationResponse } = getDeclarationMutation;

  useEffect(() => {
    getDeclarationMutation.mutate({ id });
  }, [id]);

  return (
    <>
      <Main
        meta={
          <Meta
            title="Simulateur Déclare Douanes"
            description="Simuler la déclaration de douane en quelques clics"
          />
        }
        method="declaration"
        withHeader
        linkButton={Routing.home}
      >
        {!isLoading && declarationResponse && (
          <div className="flex flex-col gap-4 pb-4">
            <SummaryDeclaration declarationResponse={declarationResponse} qrCodeVersion />
            <div className="flex flex-col">
              <Typography weight="bold" color="black" lineHeight="leading-loose">
                Merci d’avoir déclarer vos achats !
              </Typography>
              <div className="flex flex-col gap-2">
                <Typography color="black">
                  Une copie de votre déclaration a été envoyé sur votre adresse mail : <br />
                  <b>{declarationResponse.declarantEmail}</b>
                </Typography>
                <Typography color="black">
                  En cas de contrôle, présentez le QR code à nos agents.
                </Typography>
                <Typography color="black">
                  Vous pouvez également enregistrer votre déclaration dans les photos de votre
                  téléphone en cliquant sur le bouton ci-dessous.
                </Typography>
              </div>
            </div>
            <div className="mt-2">
              <SummaryDeclarationExport declarationResponse={declarationResponse} />
            </div>
            <div className="mb-2">
              <Link to={Routing.home}>
                <Button fullWidth variant="outlined">
                  Revenir à l’accueil
                </Button>
              </Link>
            </div>
            <Typography weight="bold" color="secondary">
              Des questions ?
            </Typography>
            <div className="flex flex-col gap-2">
              <TextLink underline to={`${Routing.faq}?id=payment-1`}>
                Pourquoi n’ai-je rien à payer ?
              </TextLink>
              <TextLink underline to={`${Routing.faq}?id=declaration-3`}>
                Pourquoi dois-je payer des droits et taxes ?
              </TextLink>
              <TextLink underline to={`${Routing.faq}?id=payment-4`}>
                Comment payer ce que je dois ?
              </TextLink>
              <TextLink underline to={`${Routing.faq}?id=declaration-3`}>
                Pourquoi dois-je passer au guichet Douane ?
              </TextLink>
            </div>
            <TextLink bold withArrow to={Routing.faq}>
              En savoir plus
            </TextLink>
          </div>
        )}
      </Main>
    </>
  );
};
export default DeclarationSearch;
