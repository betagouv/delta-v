import { service } from '../../../../src/api/product/getAll/service';
import { productEntityFactory } from '../../../helpers/factories/product.factory';
import { productRepositoryMock } from '../../../mocks/product.repository.mock';

describe('test get all product service', () => {
  it('should get all the products', async () => {
    const product = productEntityFactory();
    const productRepository = productRepositoryMock({ getAll: [product] });
    const result = await service({ productRepository });
    expect(result).toEqual([product]);
  });
});
