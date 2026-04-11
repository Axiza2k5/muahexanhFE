import { useMemo, useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { Profile, UserRole } from '@/types';
import axiosInstance from '@/api/axiosInstance';

type ProfileErrors = Partial<Record<keyof Pick<Profile, 'full_name' | 'email'>, string>>;

const PROFILE_STORAGE_KEY = 'profile_data';
const ROLE_STORAGE_KEY = 'user_role';

const defaultProfileByRole: Record<UserRole, Profile> = {
  student: {
    user_id: 1,
    full_name: '',
    email: '',
    phone_number: '',
    address: '',
    abilities_description: '',
    organization_name: 'Green Summer Youth Union',
  },
  leader: {
    user_id: 1,
    full_name: '',
    email: '',
    phone_number: '',
    address: '',
    abilities_description: '',
    organization_name: '',
  },
  admin: {
    user_id: 1,
    full_name: '',
    email: '',
    phone_number: '',
    address: '',
    abilities_description: '',
    organization_name: '',
  },
};

function isUserRole(value: string | null): value is UserRole {
  return value === 'student' || value === 'leader';
}

function getCurrentRole(): UserRole {
  const role = localStorage.getItem(ROLE_STORAGE_KEY);
  return isUserRole(role) ? role : 'student';
}

function getStoredProfile(role: UserRole): Profile {
  const rawProfile = localStorage.getItem(PROFILE_STORAGE_KEY);

  if (!rawProfile) {
    return defaultProfileByRole[role];
  }

  try {
    const parsed = JSON.parse(rawProfile) as Partial<Profile>;

    return {
      ...defaultProfileByRole[role],
      ...parsed,
    };
  } catch {
    return defaultProfileByRole[role];
  }
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function getFieldClassName(readOnly: boolean): string {
  return `w-full rounded-xl border px-4 py-2.5 text-sm text-gray-900 outline-none transition ${
    readOnly
      ? 'border-gray-200 bg-gray-100'
      : 'border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
  }`;
}

export default function ProfilePage() {
  const role = useMemo(() => getCurrentRole(), []);
  const [profile, setProfile] = useState<Profile>(() => getStoredProfile(role));
  const [draftProfile, setDraftProfile] = useState<Profile>(profile);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [saveMessage, setSaveMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  const isStudent = role === 'student';

  // Fetch profile from API on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setFetchError('');

        // Get JWT token from localStorage (stored as 'accessToken' during login)
        const token = localStorage.getItem('accessToken');
        console.log('Access token from localStorage:', token);
        
        if (!token) {
          setFetchError('Not authenticated. Please log in first.');
          throw new Error('Not authenticated');
        }

        console.log('Using token:', token.substring(0, 20) + '...');

        // Fetch profile from API (axios interceptor will add the token automatically)
        const response = await axiosInstance.get('/v1/users/me/profile');
        const apiProfile = response.data;
        console.log('Profile fetched:', apiProfile);

        // Map API response to local Profile format
        const mappedProfile: Profile = {
          user_id: apiProfile.userId,
          full_name: apiProfile.fullName || '',
          email: apiProfile.email || '',
          phone_number: apiProfile.phoneNumber || '',
          address: apiProfile.address || '',
          abilities_description: apiProfile.abilitiesDescription || '',
          organization_name: apiProfile.organizationName || '',
        };

        setProfile(mappedProfile);
        setDraftProfile(mappedProfile);
        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(mappedProfile));
      } catch (error: any) {
        console.error('Failed to fetch profile:', error);
        setFetchError(error.response?.data?.message || error.message || 'Failed to load profile. Using cached data.');
        // Fall back to stored profile on error
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const validate = (): boolean => {
    const nextErrors: ProfileErrors = {};

    if (!draftProfile.full_name.trim()) {
      nextErrors.full_name = 'Full name is required.';
    }

    if (!draftProfile.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!isValidEmail(draftProfile.email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleStartEditing = () => {
    setSaveMessage('');
    setErrors({});
    setDraftProfile(profile);
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setSaveMessage('');
    setErrors({});
    setDraftProfile(profile);
    setIsEditing(false);
  };

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setDraftProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setProfile(draftProfile);
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(draftProfile));
    setSaveMessage('Profile updated successfully.');
    setIsEditing(false);

    // TODO: Add API call to update profile on backend
    // await axiosInstance.put('/v1/users/me/profile', draftProfile);
  };

  const profileData = isEditing ? draftProfile : profile;

  const isOrganizationReadOnly = !isEditing || isStudent;

  return (
    <section className="mx-auto w-full max-w-3xl">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
            <p className="mt-1 text-sm text-gray-500">
              Role: {isStudent ? 'Student' : 'Community Leader'}
            </p>
          </div>

          {!isEditing && !loading ? (
            <button
              type="button"
              onClick={handleStartEditing}
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Edit Profile
            </button>
          ) : null}
        </div>

        {loading ? (
          <div className="py-12 text-center">
            <p className="text-gray-600">Loading profile...</p>
          </div>
        ) : (
          <>
            {fetchError && (
              <div className="mb-4 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-700 border border-yellow-200">
                {fetchError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="full_name" className="mb-1.5 block text-sm font-medium text-gray-800">
              Full Name
            </label>
            <input
              id="full_name"
              name="full_name"
              value={profileData.full_name}
              onChange={handleFieldChange}
              readOnly={!isEditing}
              className={getFieldClassName(!isEditing)}
            />
            {errors.full_name ? (
              <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-800">
              Email
            </label>
            <input
              id="email"
              name="email"
              value={profileData.email}
              onChange={handleFieldChange}
              readOnly={!isEditing}
              className={getFieldClassName(!isEditing)}
            />
            {errors.email ? <p className="mt-1 text-sm text-red-600">{errors.email}</p> : null}
          </div>

          <div>
            <label
              htmlFor="phone_number"
              className="mb-1.5 block text-sm font-medium text-gray-800"
            >
              Phone Number
            </label>
            <input
              id="phone_number"
              name="phone_number"
              value={profileData.phone_number}
              onChange={handleFieldChange}
              readOnly={!isEditing}
              className={getFieldClassName(!isEditing)}
            />
          </div>

          <div>
            <label htmlFor="address" className="mb-1.5 block text-sm font-medium text-gray-800">
              Address
            </label>
            <input
              id="address"
              name="address"
              value={profileData.address}
              onChange={handleFieldChange}
              readOnly={!isEditing}
              className={getFieldClassName(!isEditing)}
            />
          </div>

          {isStudent ? (
            <div>
              <label
                htmlFor="abilities_description"
                className="mb-1.5 block text-sm font-medium text-gray-800"
              >
                Skills & Abilities
              </label>
              <textarea
                id="abilities_description"
                name="abilities_description"
                value={profileData.abilities_description}
                onChange={handleFieldChange}
                readOnly={!isEditing}
                rows={4}
                className={getFieldClassName(!isEditing)}
              />
            </div>
          ) : null}

          <div>
            <label
              htmlFor="organization_name"
              className="mb-1.5 block text-sm font-medium text-gray-800"
            >
              Organization
            </label>
            <input
              id="organization_name"
              name="organization_name"
              value={profileData.organization_name}
              onChange={handleFieldChange}
              readOnly={isOrganizationReadOnly}
              className={getFieldClassName(isOrganizationReadOnly)}
            />
          </div>

          {saveMessage ? <p className="text-sm text-green-700">{saveMessage}</p> : null}

          {isEditing ? (
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleCancelEditing}
                className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          ) : null}
        </form>
      </>
        )}
      </div>
    </section>
  );
}