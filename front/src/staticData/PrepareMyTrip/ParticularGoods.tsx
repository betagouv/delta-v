import { DataElement } from '..';
import { Link } from '@/components/common/Link';

export const ParticularGoods: DataElement[] = [
  {
    id: '4',
    question: 'Les marchandises soumises à une règlementation particulière',
    iconName: 'officerCap',
    answer: (
      <div className="mt-4 flex w-full flex-col">
        <div>
          Il est interdit de ramener certains végétaux ou produits végétaux car ces derniers{' '}
          <span className="font-bold">
            peuvent être dangereux pour votre santé ou pour l’écosystème français.
          </span>{' '}
          Certains de ces produits sont soumis à des{' '}
          <Link
            href="https://www.douane.gouv.fr/demarche/vous-rapportez-des-vegetaux-fruits-et-legumes-en-provenance-dun-pays-non-membre-de-lunion"
            tag="span"
            external
          >
            <span className="text-link underline">formalités particulières</span>
          </Link>
          .
        </div>
      </div>
    ),
  },
];
