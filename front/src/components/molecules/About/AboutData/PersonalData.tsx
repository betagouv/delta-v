import { AccordionData } from '@/components/atoms/Accordion/Accordion';

export const PersonalData: AccordionData[] = [
  {
    id: '2',
    question: 'Données personnelles',
    answer: (
      <div className="flex flex-col gap-4">
        <p>
          La direction générale des Douanes et Droits indirects (DGDDI) informe l’usager que la
          présente version du site declare-douane.beta.gouv.fr ne récolte ni ne conserve aucune
          donnée nominative sur ses usagers.
        </p>
        <p>
          <span className="font-bold">Politique de protection des données</span>
          <br />
          Le site declare-douane.beta.gouv.fr est hébergé par le service Clever Cloud qui assure,
          avec la DGDDI, la protection des données présentes sur le site. La solution Clever Cloud
          assure la sécurité du site grâce à une isolation forte par machine virtuelle (et non par
          container) ainsi que des authentifications 2FA & oAuth.
        </p>
        <p>
          <span className="font-bold">
            Information des internautes sur le service de mesure d'audience
          </span>
          <br />
          Afin de mieux vous servir, nous mesurons l'activité des visiteurs sur le service
          DéclareDouane grâce à l’outil Matomo. Matomo est une solution de mesure d’audience
          recommandée par la Commission nationale de l'informatique et des libertés (CNIL) dans le
          cadre des outils étatiques.
        </p>
        <p>
          <span className="font-bold">Cookies</span>
          <br />
          L’outil Matomo, utilisé par le site declare-douane.beta.gouv.fr, ne dépose pas de cookies
          pour assurer son fonctionnement, respectant ainsi la vie privée et les données des usagers
          du service.
        </p>
      </div>
    ),
  },
];
