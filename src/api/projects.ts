import axiosInstance from './axiosInstance';

export interface Project {
  id: number;
  title: string;
  description: string;
  requiredSkills: string;
  startTime: string;
  endTime: string;
  amountOfParticipants: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'IN_PROGRESS' | 'COMPLETED';
  leaderId: number;
  leaderName: string;
  createdAt: string;
}

export interface UpdateProjectRequest {
  status?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'IN_PROGRESS' | 'COMPLETED';
  title?: string;
  description?: string;
  requiredSkills?: string;
  startTime?: string;
  endTime?: string;
  amountOfParticipants?: number;
}

export const projectsApi = {
  getAllProjects: async (): Promise<Project[]> => {
    const response = await axiosInstance.get('/v1/projects');
    return response.data || [];
  },

  getProjectById: async (id: number): Promise<Project> => {
    const response = await axiosInstance.get(`/v1/projects/${id}`);
    return response.data;
  },

  updateProject: async (id: number, data: UpdateProjectRequest): Promise<Project> => {
    const response = await axiosInstance.patch(`/v1/projects/${id}`, data);
    return response.data;
  },

  updateProjectStatus: async (id: number, status: string): Promise<Project> => {
    return projectsApi.updateProject(id, { status: status as any });
  },
};
