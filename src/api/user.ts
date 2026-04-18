import axiosInstance from './axiosInstance';

export interface UserProfileRes {
  userId: number;
  username: string;
  email: string;
  role: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  avatarUrl: string;
}

export const userApi = {
  getMyProfile: async (): Promise<UserProfileRes> => {
    const response = await axiosInstance.get('/v1/users/me/profile');
    return response.data;
  }
};
