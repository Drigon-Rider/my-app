import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export const ProductHook = () => {

    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await axios.get('https://fakestoreapi.com/products');
            return response.data;
        }
    });
}
