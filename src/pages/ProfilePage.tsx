import { useMemo, useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { Profile, UserRole } from '@/types';
import axiosInstance from '@/api/axiosInstance';
import toast from 'react-hot-toast';

type ProfileErrors = Partial<Record<'full_name' | 'email' | 'abilities_description', string>>;

type SkillOption = {
  id: string;
  title: string;
  description: string;
};

const PROFILE_STORAGE_KEY = 'profile_data';
const ROLE_STORAGE_KEY = 'user_role';

const skillOptions: SkillOption[] = [
  { id: 'teaching', title: 'Teaching', description: 'Literacy & Math' },
  { id: 'medical', title: 'Medical', description: 'First Aid Support' },
  { id: 'engineering', title: 'Engineering', description: 'Civil & Bridge' },
  { id: 'media', title: 'Media', description: 'Content Creator' },
  { id: 'logistics', title: 'Logistics', description: 'Food & Supply' },
  { id: 'environment', title: 'Environment', description: 'Afforestation' },
];

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
  return value === 'student' || value === 'leader' || value === 'admin';
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
    return normalizeProfile(parsed, role);
  } catch {
    return defaultProfileByRole[role];
  }
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function getInputClassName(readOnly: boolean, hasError = false): string {
  return [
    'w-full rounded-xl border px-4 py-3 text-[15px] text-slate-900 outline-none transition',
    readOnly ? 'border-slate-200 bg-slate-50' : 'border-slate-300 bg-white',
    readOnly ? 'cursor-default' : 'focus:border-[#564AF7] focus:ring-4 focus:ring-[#564AF7]/10',
    hasError ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : '',
  ]
    .filter(Boolean)
    .join(' ');
}

function getSkillButtonClassName(selected: boolean, disabled: boolean): string {
  return [
    'w-full rounded-xl border p-6 text-left transition duration-200',
    selected
      ? 'border-[#564AF7] bg-[#564AF7] text-white shadow-[0_20px_40px_-18px_rgba(86,74,247,0.45)]'
      : 'border-slate-200 bg-white text-slate-900 hover:border-[#564AF7]/40 hover:shadow-[0_10px_30px_-18px_rgba(17,24,39,0.15)]',
    disabled ? 'cursor-default' : 'cursor-pointer',
  ]
    .filter(Boolean)
    .join(' ');
}

function normalizeProfile(profile: Partial<Profile>, role: UserRole): Profile {
  const legacySkills = Array.isArray((profile as { selected_skills?: unknown }).selected_skills)
    ? ((profile as { selected_skills?: unknown[] }).selected_skills ?? []).filter(
        (skill): skill is string => typeof skill === 'string'
      )
    : [];

  const abilitiesDescription =
    typeof profile.abilities_description === 'string'
      ? profile.abilities_description
      : legacySkills.join(';');

  return {
    ...defaultProfileByRole[role],
    ...profile,
    abilities_description: abilitiesDescription,
  };
}

function parseSkills(value: string): string[] {
  return value
    .split(';')
    .map((skill) => skill.trim())
    .filter(Boolean);
}

function serializeSkills(skills: string[]): string {
  return skills.join(';');
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

  const handleSkillToggle = (skillId: string) => {
    if (!isEditing || !isStudent) {
      return;
    }

    setDraftProfile((previous) => {
      const selectedSkills = parseSkills(previous.abilities_description);
      const hasSkill = selectedSkills.includes(skillId);

      return {
        ...previous,
        abilities_description: serializeSkills(
          hasSkill
            ? selectedSkills.filter((selectedSkill) => selectedSkill !== skillId)
            : [...selectedSkills, skillId]
        ),
      };
    });

    setErrors((previous) => ({
      ...previous,
      abilities_description: undefined,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const payload = {
        fullName: draftProfile.full_name,
        email: draftProfile.email,
        phoneNumber: draftProfile.phone_number,
        address: draftProfile.address,
        abilitiesDescription: draftProfile.abilities_description,
        organizationName: draftProfile.organization_name,
      };

      await axiosInstance.put('/v1/users/me/profile', payload);

      setProfile(draftProfile);
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(draftProfile));
      setSaveMessage('Profile updated successfully.');
      setIsEditing(false);
      toast.success('Hồ sơ đã được cập nhật thành công!');
    } catch (error: any) {
      console.error('Failed to update profile:', error);
      toast.error(error.response?.data?.message || 'Cập nhật hồ sơ thất bại. Vui lòng thử lại.');
    }
  };

  const profileData = isEditing ? draftProfile : profile;

  const isOrganizationReadOnly = !isEditing || isStudent;
  const selectedSkills = new Set(parseSkills(profileData.abilities_description));

  if (loading) {
    return (
      <section className="mx-auto w-full max-w-6xl py-8 lg:py-12">
        <div className="py-12 text-center">
          <p className="text-slate-600">Loading profile...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-6xl py-8 lg:py-12">
      <div className="mb-8 flex flex-col gap-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <h1 className="text-4xl font-bold tracking-tight text-[#121827] sm:text-5xl lg:text-6xl">
              Complete your profile.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Keep your profile ready for mission matching with up-to-date contact details and
              selected skills.
            </p>
          </div>

          {!isEditing && !loading ? (
            <button
              type="button"
              onClick={handleStartEditing}
              className="inline-flex w-fit items-center justify-center rounded-xl bg-[#564AF7] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-16px_rgba(86,74,247,0.5)] transition hover:bg-[#4b40dd]"
            >
              Edit Profile
            </button>
          ) : null}
        </div>
      </div>

      {fetchError && (
        <div className="mb-6 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-700 border border-yellow-200">
          {fetchError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-8">
          <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-28px_rgba(15,23,42,0.22)] sm:p-8">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#121827]">Personal Information</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Role: {isStudent ? 'Student' : 'Community Leader'}
                </p>
              </div>
              <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                {isEditing ? 'Editing mode' : 'Read only'}
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label htmlFor="full_name" className="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
                  Full legal name
                </label>
                <input
                  id="full_name"
                  name="full_name"
                  value={profileData.full_name}
                  onChange={handleFieldChange}
                  readOnly={!isEditing}
                  className={getInputClassName(!isEditing, Boolean(errors.full_name))}
                  placeholder="Nguyen Van A"
                />
                {errors.full_name ? (
                  <p className="mt-2 text-sm text-red-600">{errors.full_name}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleFieldChange}
                  readOnly={!isEditing}
                  className={getInputClassName(!isEditing, Boolean(errors.email))}
                  placeholder="example@hcmut.edu.vn"
                />
                {errors.email ? <p className="mt-2 text-sm text-red-600">{errors.email}</p> : null}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone_number" className="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
                    Phone number
                  </label>
                  <input
                    id="phone_number"
                    name="phone_number"
                    value={profileData.phone_number}
                    onChange={handleFieldChange}
                    readOnly={!isEditing}
                    className={getInputClassName(!isEditing)}
                    placeholder="0909090909"
                  />
                </div>

                <div>
                  <label htmlFor="organization_name" className="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
                    Organization
                  </label>
                  <input
                    id="organization_name"
                    name="organization_name"
                    value={profileData.organization_name}
                    onChange={handleFieldChange}
                    readOnly={isOrganizationReadOnly}
                    className={getInputClassName(isOrganizationReadOnly)}
                    placeholder="Green Summer Youth Union"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  value={profileData.address}
                  onChange={handleFieldChange}
                  readOnly={!isEditing}
                  className={getInputClassName(!isEditing)}
                  placeholder="268 Ly Thuong Kiet Street, District 10, Ho Chi Minh City"
                />
              </div>

              {saveMessage ? <p className="text-sm font-medium text-emerald-700">{saveMessage}</p> : null}
            </div>
          </section>

          <section className="rounded-[24px] border border-slate-200 bg-[#F8F9FF] p-6 shadow-[0_18px_50px_-28px_rgba(15,23,42,0.2)] sm:p-8">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold text-[#121827]">Skill Matrix</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Select your strongest areas for mission matching.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {skillOptions.map((skill) => {
                const selected = selectedSkills.has(skill.id);

                return (
                  <button
                    key={skill.id}
                    type="button"
                    onClick={() => handleSkillToggle(skill.id)}
                    disabled={!isEditing || !isStudent}
                    className={getSkillButtonClassName(selected, !isEditing || !isStudent)}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-current/10 text-current">
                        <span className="text-sm font-bold uppercase tracking-[0.16em]">
                          {skill.title.slice(0, 2)}
                        </span>
                      </div>
                      {selected ? (
                        <span className="rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-inherit">
                          Selected
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-4 space-y-1">
                      <h3 className="text-base font-semibold leading-6">{skill.title}</h3>
                      <p className={selected ? 'text-sm text-white/80' : 'text-sm text-slate-500'}>
                        {skill.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 rounded-2xl bg-white p-4 shadow-[0_10px_25px_-20px_rgba(15,23,42,0.25)]">
              <p className="text-sm font-medium text-slate-600">
                {isStudent
                  ? `${parseSkills(profileData.abilities_description).length} skill${parseSkills(profileData.abilities_description).length === 1 ? '' : 's'} selected`
                  : 'Skill selection is available for student profiles only.'}
              </p>
              {errors.abilities_description ? (
                <p className="mt-2 text-sm text-red-600">{errors.abilities_description}</p>
              ) : null}
            </div>
          </section>
        </div>

        {isEditing ? (
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleCancelEditing}
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Back
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-[#564AF7] px-7 py-3 text-sm font-bold text-white shadow-[0_22px_45px_-18px_rgba(86,74,247,0.5)] transition hover:bg-[#4b40dd]"
            >
              Save Changes
            </button>
          </div>
        ) : null}
      </form>
    </section>
  );
}