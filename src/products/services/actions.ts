import { type Product, productsApi } from '..';

interface GetProductsOptions {
	filterkey?: string;
}

export const getProducts = async ({ filterkey }: GetProductsOptions) => {
	const { data } = await productsApi.get<Product[]>('/products');

	return data;
};
