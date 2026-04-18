import axiosInstance from './axiosInstance';

export interface ProjectApiRes {
  id: number;
  title: string;
  description: string;
  requiredSkills: string;
  startTime: string;
  endTime: string;
  amountOfParticipants: number;
  status: string;
  leaderId: number;
  leaderName: string;
  createdAt: string;
}

export const projectApi = {
  getProjects: async (): Promise<ProjectApiRes[]> => {
    const response = await axiosInstance.get('/v1/projects');
    return response.data;
  },
  getProjectById: async (id: string | number): Promise<ProjectApiRes> => {
    const response = await axiosInstance.get(`/v1/projects/${id}`);
    return response.data;
  }
};
