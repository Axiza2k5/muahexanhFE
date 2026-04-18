import axiosInstance from './axiosInstance';

export const authApi = {
  login: async (data: any) => {
    const response = await axiosInstance.post('/v1/auth/login', data);
    return response.data;
  },
  registerStudent: async (data: any) => {
    const response = await axiosInstance.post('/v1/auth/register/student', data);
    return response.data;
  }
};
