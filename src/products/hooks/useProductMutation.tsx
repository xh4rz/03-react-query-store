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

			return { optimisticProduct };
		},
		onSuccess: (data, variables, context) => {
			// queryClient.invalidateQueries({
			// 	queryKey: ['products', { filterkey: data.category }]
			// });

			console.log({ data, variables, context });

			queryClient.removeQueries({
				queryKey: ['product', context?.optimisticProduct.id]
			});

			queryClient.setQueryData<Product[]>(
				['products', { filterkey: data.category }],
				(oldData: Product[] | undefined) => {
					if (!oldData) return [data];

					return oldData.map((cacheProduct) => {
						return cacheProduct.id === context?.optimisticProduct.id
							? data
							: cacheProduct;
					});
				}
			);
		},
		onError: (error, variables, context) => {
			console.log({ error, variables, context });

			queryClient.removeQueries({
				queryKey: ['product', context?.optimisticProduct.id]
			});

			queryClient.setQueryData<Product[]>(
				['products', { filterkey: variables.category }],
				(oldData: Product[] | undefined) => {
					if (!oldData) return [];

					return oldData.filter((cacheProduct) => {
						return cacheProduct.id !== context?.optimisticProduct.id;
					});
				}
			);
		}
	});

	return mutation;
};
