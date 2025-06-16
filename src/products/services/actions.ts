import { type Product, productsApi } from '..';

interface GetProductsOptions {
	filterkey?: string;
}

export const sleep = (seconds: number): Promise<boolean> => {
	return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

export const getProducts = async ({
	filterkey
}: GetProductsOptions): Promise<Product[]> => {
	const filterUrl = filterkey ? `?category=${filterkey}` : '';

	const { data } = await productsApi.get<Product[]>(`/products${filterUrl}`);

	return data;
};

export const getProductById = async (id: number): Promise<Product> => {
	const { data } = await productsApi.get<Product>(`/products/${id}`);

	return data;
};

export interface ProductLike {
	id?: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
}

export const createProduct = async (product: ProductLike) => {
	const { data } = await productsApi.post<Product>(`/products`, product);

	return data;
};
