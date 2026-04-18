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
  },
  applyToProject: async (projectId: number): Promise<ProjectApplicationRes> => {
    const response = await axiosInstance.post('/v1/projects/applications', { projectId });
    return response.data;
  },
  getMyApplications: async (): Promise<ProjectApplicationRes[]> => {
    const response = await axiosInstance.get('/v1/projects/applications/my');
    return response.data;
  },
  getApplicationStatus: async (projectId: string | number): Promise<ProjectApplicationRes> => {
    const response = await axiosInstance.get(`/v1/projects/${projectId}/application-status`);
    return response.data;
  }
};

export interface ProjectApplicationRes {
  id: number;
  projectId: number;
  projectTitle: string;
  studentId: number;
  studentName: string;
  status: 'APPLIED' | 'ACCEPTED' | 'REJECTED';
  appliedAt: string;
}
