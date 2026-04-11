export type UserRole = 'STUDENT' | 'COMMUNITY_LEADER' | 'UNI_ADMIN';

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}
