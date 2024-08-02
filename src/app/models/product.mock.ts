import { faker } from '@faker-js/faker';

import { Product } from './product.model';

export const generateOneProduct = (): Product => {
  return {
    id: faker.string.uuid(),
    title: faker.commerce.productName(),
    price: parseInt(faker.commerce.price(), 10),
    images: [faker.image.url.toString(), faker.image.url.toString()],
    description: faker.commerce.productDescription(),
    category: {
      id: parseInt(faker.string.uuid()),
      name: faker.commerce.department()
    }
  };
};

export const generateManyProducts = (quantity = 10): Product[] => {
    const products: Product[] = [];
    for (let i = 0; i < quantity; i++) {
        products.push(generateOneProduct());
    }
    return [...products];
}
    
