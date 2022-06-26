import { fireEvent, render } from '@testing-library/react';

import { Search } from './Search';
import { Product } from '@/model/product';
import { productFactory } from '@/tests/factories/Product.factory';

describe('Search', () => {
  it('should render results', () => {
    const searchResult: Product[] = [productFactory(), productFactory()];
    const wrapper = render(<Search onSearch={() => searchResult} />);
    const searchElement = wrapper.getByTestId('search-element');
    const inputSearch = searchElement.querySelector('input');

    if (inputSearch) {
      fireEvent.change(inputSearch, { target: { value: 'te' } });
    }
    const results = wrapper.getAllByTestId('result-product-search-element');
    expect(results.length).toEqual(2);
  });
  it('should render empty result', () => {
    const wrapper = render(<Search onSearch={() => []} />);
    const searchElement = wrapper.getByTestId('search-element');
    const inputSearch = searchElement.querySelector('input');

    if (inputSearch) {
      fireEvent.change(inputSearch, { target: { value: 'te' } });
    }
    const results = wrapper.queryAllByTestId('result-product-search-element');
    expect(results.length).toEqual(0);

    const emptyElement = wrapper.getByTestId('empty-result-product-search-element');
    expect(emptyElement).toBeVisible();
  });
  it('should onChange to be trigger', () => {
    const testFunction = jest.fn();
    const searchResult: Product[] = [productFactory(), productFactory()];
    const wrapper = render(<Search onSearch={() => searchResult} onChange={testFunction} />);
    const searchElement = wrapper.getByTestId('search-element');
    const inputSearch = searchElement.querySelector('input');

    if (inputSearch) {
      fireEvent.change(inputSearch, { target: { value: 'te' } });
    }
    expect(testFunction).toBeCalled();
  });
});
