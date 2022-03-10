import { service } from '../../../../src/api/product/search/service';
import { Product } from '../../../../src/entities/product.entity';
import { productEntityFactory } from '../../../helpers/factories/product.factory';
import { productRepositoryMock } from '../../../mocks/product.repository.mock';

interface PrepareContextResponse {
  allProducts: Product[];
  searchResult: Product[];
}

const prepareContext = (search: string): PrepareContextResponse => {
  const parentProduct1 = productEntityFactory({ name: `${search}` });
  const parentProduct2 = productEntityFactory({ name: 'bbdcefbb' });
  const childrenProduct1 = productEntityFactory({
    parentProductId: parentProduct1.id,
    name: 'cccezdecc',
  });
  const childrenProduct2 = productEntityFactory({
    parentProductId: parentProduct2.id,
    name: 'dddczecdd',
  });
  const subChildrenProduct1 = productEntityFactory({
    parentProductId: childrenProduct1.id,
    name: `${search}yyyyy`,
  });
  const subChildrenProduct2 = productEntityFactory({
    parentProductId: childrenProduct1.id,
    name: `zzffgf${search}zzzsdzz`,
  });
  const subChildrenProduct3 = productEntityFactory({
    parentProductId: childrenProduct2.id,
    name: `hhhhssjd`,
    info: `Bonjour, ${search} est très content de vous avoir ici.`,
  });
  const subChildrenProduct4 = productEntityFactory({
    parentProductId: childrenProduct2.id,
    name: `hhhhssjdkdelfd`,
  });

  childrenProduct1.subProducts = [subChildrenProduct1, subChildrenProduct2];
  childrenProduct2.subProducts = [subChildrenProduct3, subChildrenProduct4];
  parentProduct1.subProducts = [childrenProduct1];
  parentProduct2.subProducts = [childrenProduct2];

  return {
    allProducts: [parentProduct1, parentProduct2],
    searchResult: [parentProduct1, subChildrenProduct1, subChildrenProduct2, subChildrenProduct3],
  };
};

describe('test search products service', () => {
  it('should get all matching products', async () => {
    const { allProducts, searchResult } = prepareContext('cuire');
    const productRepository = productRepositoryMock({ getAll: allProducts });
    const result = await service({ search: 'cuire', productRepository });

    expect(searchResult).toEqual(result);
  });
});
