import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAuthHook = () => {
  const queryClient = useQueryClient();

  return useMutation<any, unknown, { username: string; password: string }>({
    mutationKey: ['auth'],
    mutationFn: async ({ username, password }) => {
      const credentials = { username, password };
      const res = await axios.post('https://fakestoreapi.com/auth/login', credentials);
      return res.data;
    },
    onSuccess: (data) => {
      sessionStorage.setItem('sessionData', JSON.stringify(data))
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
};

export const useLogout = () =>{
  const queryClient = useQueryClient();
  return () => {
    sessionStorage.removeItem('sessionData');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('authUsername');
    queryClient.invalidateQueries({ queryKey: ['auth'] });
  }
}