import axios from 'axios';
import {useQuery} from '@tanstack/react-query';

export const ProductIdHook = (id: number) => {

    return useQuery({
        queryKey: ['product', id],
        queryFn: async () =>{
            const res= await axios.get('https://fakestoreapi.com/products/' + id);
            return res.data;
            
        }
    })
}