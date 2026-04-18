export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export type UserRole = 'student' | 'leader' | 'admin';

export interface Profile {
  user_id: number;
  full_name: string;
  email: string;
  phone_number: string;
  address: string;
  abilities_description: string;
  organization_name: string;
}
