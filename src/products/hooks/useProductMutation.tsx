import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Product, productActions } from '..';

export const useProductMutation = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: productActions.createProduct,
		onMutate: (data) => {
			console.log('Mutando - Optimistic update');

			// Optimistic Product
			const optimisticProduct = { id: Math.random(), ...data };

			console.log({ optimisticProduct });

			// Almacenar el producto en el cache del query client
			queryClient.setQueryData<Product[]>(
				['products', { filterkey: data.category }],
				(oldData) => {
					if (!oldData) return [optimisticProduct];

					return [...oldData, optimisticProduct];
				}
			);
		},
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
