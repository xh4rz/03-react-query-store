import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productActions } from '..';

export const useProductMutation = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: productActions.createProduct,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ['products', { filterkey: data.category }]
			});
		}
	});

	return mutation;
};
