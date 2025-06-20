import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Product, productActions } from '..';

export const useProductMutation = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: productActions.createProduct,
		onSuccess: (data) => {
			// queryClient.invalidateQueries({
			// 	queryKey: ['products', { filterkey: data.category }]
			// });

			queryClient.setQueryData<Product[]>(
				['products', { filterkey: data.category }],
				(oldData: Product[] | undefined) => {
					if (!oldData) return [data];

					return [...oldData, data];
				}
			);
		}
	});

	return mutation;
};
