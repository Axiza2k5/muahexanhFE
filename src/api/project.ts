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

export interface ProjectApplicationRes {
  id: number;
  projectId: number;
  projectTitle: string;
  studentId: number;
  studentName: string;
  status: string;
  appliedAt: string;
}

export interface ProjectMemberRes {
  studentId: number;
  username: string;
  fullName: string;
  email: string;
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
  getProjectsByLeader: async (leaderId: number): Promise<ProjectApiRes[]> => {
    const response = await axiosInstance.get(`/v1/projects/leader/${leaderId}`);
    return response.data;
  },
  getPendingApplications: async (): Promise<ProjectApplicationRes[]> => {
    const response = await axiosInstance.get('/v1/projects/applications/pending');
    return response.data;
  },
  getAcceptedStudents: async (projectId: string | number): Promise<ProjectMemberRes[]> => {
    const response = await axiosInstance.get(`/v1/projects/${projectId}/students`);
    return response.data;
  },
  reviewApplication: async (applicationId: number, status: 'ACCEPTED' | 'REJECTED'): Promise<ProjectApplicationRes> => {
    const response = await axiosInstance.patch(`/v1/projects/applications/${applicationId}/status`, { status });
    return response.data;
  },
  banStudent: async (projectId: string | number, studentId: number): Promise<ProjectApplicationRes> => {
    const response = await axiosInstance.patch(`/v1/projects/${projectId}/students/ban`, { studentId });
    return response.data;
  }
};
