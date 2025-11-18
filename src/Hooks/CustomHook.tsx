import axios from 'axios'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

const fetchUsers = async () => {
    const res = await axios.get('http://localhost:4000/nonUsers')
    return res.data ?? []
}
const AddPerson = (info: any) => {
    return axios.post("http://localhost:4000/nonUsers", info);

}

export const CustomHook = () =>{
    return useQuery({
        queryKey: ['nonUsers'],
        queryFn: fetchUsers,
        // cacheTime: 5000,
        // staleTime: 3000,
        // refetchOnMount: true,
        // refetchOnWindowFocus: 'always',
        // refetchInterval: 2000,
        // refetchIntervalInBackground: true,
        // enabled: false,
        select: (data) => Array.isArray(data) ? data.map(u => u.name) : []
    })
}
export const useAddPerson = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: AddPerson,
        onSuccess: (data) =>{
            queryClient.setQueryData(['nonUsers'], (oldData)=>{
                return [...oldData as any[], data.data];
            });
            // queryClient.invalidateQueries({ queryKey: ['nonUsers'] });
        }
    });
}