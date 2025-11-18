import axios from 'axios';
import {useMutation, useQueryClient} from '@tanstack/react-query';

export const useAddToCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey:['add-cart'],
        mutationFn: async (cart) =>{
            const res= await axios.post('https://fakestoreapi.com/carts', cart);
            return res.data;
        },
        onSuccess:() =>{
            queryClient.invalidateQueries({queryKey: ['carts']});
        }
    })
    // const cart = { userId: 1, products: [{ id: 1 }] };
}

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey:['update-cart'],
        mutationFn: async (cart) =>{
            const res= await axios.put('https://fakestoreapi.com/carts/1', cart);
            return res.data;
        },
        onSuccess:() =>{
            queryClient.invalidateQueries({queryKey: ['carts']});
        }
    })
    // const cart = { userId: 1, products: [{ id: 2 }] };
};

export function useDeleteProduct() {
  return useMutation({
    mutationFn: async (cartId: number) => {
      const response = await axios.delete(`https://fakestoreapi.com/carts/${cartId}`)
      return response.data
    },
  })
}
