import axios from 'axios';
import {useMutation,QueryClient} from '@tanstack/react-query';

export const useUpdateProduct = () => {
    const queryClient = new QueryClient();
    return useMutation<any, unknown, { product: any; id: number }>({
        mutationKey:['updat-product'],
        mutationFn: async ({ product, id }) =>{
            const res= await axios.put(`https://fakestoreapi.com/products/${id}`, product);
            return res.data;
        },
        onSuccess:() =>{
            queryClient.invalidateQueries({queryKey: ['products']});
        }
    })
    // const product = { title: 'Updated Product', price: 39.99 };
}

export const useDeleteProduct = () => {
    const queryClient = new QueryClient();
    return useMutation<any, unknown, number>({
        mutationKey:['delete-product'],
        mutationFn: async (id) =>{
            const res= await axios.delete(`https://fakestoreapi.com/products/${id}`);
            return res.data;
        },
        onSuccess:() =>{
            queryClient.invalidateQueries({queryKey: ['products']});
        }
    })
}