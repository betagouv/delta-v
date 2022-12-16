import { faker } from '@faker-js/faker';
import { MeansOfTransport } from '../../../src/api/common/enums/meansOfTransport.enum';
import { Declaration } from '../../../src/api/common/services/declaration';
import { DetailedShoppingProduct } from '../../../src/api/common/services/detailedShoppingProduct';
import { ShoppingProduct } from '../../../src/api/common/services/shoppingProducts';
import { TravelerData } from '../../../src/api/common/services/traveler';
import { DetailedShoppingProductFactory } from './detailedShoppingProduct.factory';
import { ShoppingProductFactory } from './shoppingProduct.factory';

interface DeclarationFactoryOptions {
  travelerData?: Partial<TravelerData>;
  shoppingProducts?: ShoppingProduct[];
  detailedShoppingProducts?: DetailedShoppingProduct[];
}

export const DeclarationFactory = ({
  travelerData,
  shoppingProducts,
  detailedShoppingProducts,
}: DeclarationFactoryOptions): Declaration =>
  new Declaration({
    inputDeclaration: {
      travelerData: {
        age: faker.datatype.number({ min: 1, max: 100, precision: 1 }),
        border: faker.datatype.boolean(),
        country: 'FR',
        meanOfTransport: MeansOfTransport.PLANE,
        ...travelerData,
      },
      shoppingProducts: shoppingProducts ?? [ShoppingProductFactory()],
    },
    detailedShoppingProducts: detailedShoppingProducts ?? [DetailedShoppingProductFactory({})],
  });
