import { type Product, productsApi } from '..';

interface GetProductsOptions {
	filterkey?: string;
}

const sleep = (seconds: number): Promise<boolean> => {
	return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

export const getProducts = async ({
	filterkey
}: GetProductsOptions): Promise<Product[]> => {
	await sleep(2);

	const filterUrl = filterkey ? `?category=${filterkey}` : '';

	const { data } = await productsApi.get<Product[]>(`/products${filterUrl}`);

	return data;
};

export const getProductById = async (id: number): Promise<Product> => {
	const { data } = await productsApi.get<Product>(`/products/${id}`);

	return data;
};
