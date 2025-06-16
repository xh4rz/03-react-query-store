import { useQueryClient } from '@tanstack/react-query';
import { productActions } from '..';

export const usePrefetchProduct = () => {
	const queryCLient = useQueryClient();

	const prefetchProduct = (id: number) => {
		queryCLient.prefetchQuery({
			queryKey: ['product', id],
			queryFn: () => productActions.getProductById(id)
		});
	};

	return prefetchProduct;
};
