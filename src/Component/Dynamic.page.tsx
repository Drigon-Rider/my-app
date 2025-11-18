import axios from 'axios'
import {useQueries} from '@tanstack/react-query'

const fetchResult = async(id) =>{
    const res = await axios.get('https://fakestoreapi.com/products/'+id);
    return res.data;
}
const Dynamic = ({hid}) => {
    const reslut = useQueries({
        queries: hid.map((id) =>({
            queryKey: ['cloths', id],
            queryFn: () => fetchResult(id),
        })),
    });
    console.log(reslut);
  return <div>This is a dynamically loaded page.</div>;
};
export default Dynamic; 