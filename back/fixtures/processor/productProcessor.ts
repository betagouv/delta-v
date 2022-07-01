import { IProcessor } from 'typeorm-fixtures-cli';
import { Product } from '../../src/entities/product.entity';
import { getRankFromPosition } from '../../src/utils/rank.util';

interface ProductFixture extends Product {
  position?: number;
}

const preProcessUserFixture = (fields: ProductFixture): Partial<Product> => {
  const { position, ...values } = fields;
  return { ...values, positionRank: getRankFromPosition(position) };
};

export default class UserProcessor implements IProcessor<Product> {
  preProcess(name: string, fields: ProductFixture): Partial<Product> {
    return preProcessUserFixture(fields);
  }
}
