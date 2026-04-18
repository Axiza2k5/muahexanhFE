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
const ROLE_STORAGE_KEY = 'role'; // Standardized to match rest of app

const skillOptions: SkillOption[] = [
  { id: 'teaching', title: 'Teaching', description: 'Literacy & Math' },
  { id: 'medical', title: 'Medical', description: 'First Aid Support' },
  { id: 'engineering', title: 'Engineering', description: 'Civil & Bridge' },
  { id: 'media', title: 'Media', description: 'Content Creator' },
  { id: 'logistics', title: 'Logistics', description: 'Food & Supply' },
  { id: 'environment', title: 'Environment', description: 'Afforestation' },
];

const defaultProfileByRole: Record<UserRole, Profile> = {
  STUDENT: {
    user_id: 1,
    full_name: '',
    email: '',
    phone_number: '',
    address: '',
    abilities_description: '',
    organization_name: 'Green Summer Youth Union',
  },
  COMMUNITY_LEADER: {
    user_id: 1,
    full_name: '',
    email: '',
    phone_number: '',
    address: '',
    abilities_description: '',
    organization_name: '',
  },
  UNI_ADMIN: {
    user_id: 1,
    full_name: '',
    email: '',
    phone_number: '',
    address: '',
    abilities_description: '',
    organization_name: '',
  },
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function getInputClassName(readOnly: boolean, hasError = false): string {
  return [
    'w-full rounded-2xl border px-4 py-3 text-[15px] text-darkside outline-none transition duration-200',
    readOnly ? 'border-gray-100 bg-gray-50' : 'border-gray-200 bg-white',
    readOnly ? 'cursor-default' : 'focus:border-rocket focus:ring-4 focus:ring-rocket/10',
    hasError ? 'border-maul focus:border-maul focus:ring-maul/10' : '',
  ]
    .filter(Boolean)
    .join(' ');
}

function getSkillButtonClassName(selected: boolean, disabled: boolean): string {
  return [
    'w-full rounded-2xl border p-6 text-left transition duration-300',
    selected
      ? 'border-rocket bg-rocket text-white shadow-xl shadow-rocket/20'
      : 'border-gray-100 bg-white text-darkside hover:border-rocket/40 hover:shadow-lg hover:shadow-rocket/5',
    disabled ? 'cursor-default' : 'cursor-pointer',
  ]
    .filter(Boolean)
    .join(' ');
}

function parseSkills(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(';')
    .map((skill) => skill.trim())
    .filter(Boolean);
}

function serializeSkills(skills: string[]): string {
  return skills.join(';');
}

export default function ProfilePage() {
  const userRole = (localStorage.getItem(ROLE_STORAGE_KEY) || 'STUDENT') as UserRole;
  const [profile, setProfile] = useState<Profile>(defaultProfileByRole[userRole]);
  const [draftProfile, setDraftProfile] = useState<Profile>(defaultProfileByRole[userRole]);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [loading, setLoading] = useState(true);

  const isStudent = userRole === 'STUDENT';

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/v1/users/me/profile');
        const apiProfile = response.data;
        
        const mappedProfile: Profile = {
          user_id: apiProfile.userId || 1,
          full_name: apiProfile.fullName || '',
          email: apiProfile.email || '',
          phone_number: apiProfile.phoneNumber || '',
          address: apiProfile.address || '',
          abilities_description: apiProfile.abilitiesDescription || '',
          organization_name: apiProfile.organizationName || '',
        };

        setProfile(mappedProfile);
        setDraftProfile(mappedProfile);
      } catch (error: any) {
        console.error('Failed to fetch profile:', error);
        toast.error('Using local profile session.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userRole]);

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
    setErrors({});
    setDraftProfile(profile);
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setErrors({});
    setDraftProfile(profile);
    setIsEditing(false);
  };

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setDraftProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillToggle = (skillId: string) => {
    if (!isEditing || !isStudent) return;

    setDraftProfile((prev) => {
      const selected = parseSkills(prev.abilities_description);
      const exists = selected.includes(skillId);
      const nextSkills = exists ? selected.filter(s => s !== skillId) : [...selected, skillId];
      
      return {
        ...prev,
        abilities_description: serializeSkills(nextSkills),
      };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) return;

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
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      console.error('Failed to update profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile.');
    }
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-rocket border-t-transparent shadow-xl shadow-rocket/20"></div>
          <p className="text-sm font-bold text-darkside animate-pulse">Syncing Profile...</p>
        </div>
      </div>
    );
  }

  const currentProfile = isEditing ? draftProfile : profile;
  const selectedSkills = new Set(parseSkills(currentProfile.abilities_description));

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <p className="inline-block px-3 py-1 rounded-full bg-rocket/5 text-rocket text-[10px] font-black uppercase tracking-widest">
            {userRole.replace('_', ' ')} Settings
          </p>
          <h1 className="text-6xl font-extrabold text-darkside tracking-tighter leading-none">
            Your Profile
          </h1>
          <p className="max-w-xl text-gray-500 font-medium text-lg leading-relaxed">
            Personalize your identity and optimize your skill matching for upcoming missions.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={handleStartEditing}
            className="flex items-center gap-2 bg-rocket text-white font-bold py-4 px-8 rounded-2xl shadow-xl shadow-rocket/20 hover:shadow-rocket/30 hover:-translate-y-1 transition-all active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit Profile
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white border border-gray-100 rounded-[32px] p-8 space-y-8 shadow-sm">
             <div className="flex items-center justify-between border-b border-gray-50 pb-6">
                <h2 className="text-2xl font-bold text-darkside tracking-tight">Identity Details</h2>
                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${isEditing ? 'bg-orange-50 text-orange-500' : 'bg-green-50 text-green-500'}`}>
                  {isEditing ? 'Drafting' : 'Verified'}
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                  <input
                    name="full_name"
                    value={currentProfile.full_name}
                    onChange={handleFieldChange}
                    readOnly={!isEditing}
                    className={getInputClassName(!isEditing, !!errors.full_name)}
                    placeholder="Nguyen Van A"
                  />
                  {errors.full_name && <p className="text-xs text-maul font-semibold ml-1">{errors.full_name}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Email</label>
                  <input
                    name="email"
                    value={currentProfile.email}
                    onChange={handleFieldChange}
                    readOnly={!isEditing}
                    className={getInputClassName(!isEditing, !!errors.email)}
                    placeholder="example@edu.vn"
                  />
                  {errors.email && <p className="text-xs text-maul font-semibold ml-1">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Phone</label>
                  <input
                    name="phone_number"
                    value={currentProfile.phone_number}
                    onChange={handleFieldChange}
                    readOnly={!isEditing}
                    className={getInputClassName(!isEditing)}
                    placeholder="0909..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Organization</label>
                  <input
                    name="organization_name"
                    value={currentProfile.organization_name}
                    onChange={handleFieldChange}
                    readOnly={!isEditing || isStudent}
                    className={getInputClassName(!isEditing || isStudent)}
                    placeholder="N/A"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Address</label>
                  <input
                    name="address"
                    value={currentProfile.address}
                    onChange={handleFieldChange}
                    readOnly={!isEditing}
                    className={getInputClassName(!isEditing)}
                    placeholder="Full permanent address"
                  />
                </div>
             </div>
          </section>

          <section className="bg-white border border-gray-100 rounded-[32px] p-8 space-y-8 shadow-sm">
             <div className="space-y-1">
                <h2 className="text-2xl font-bold text-darkside tracking-tight">Skill Matrix</h2>
                <p className="text-gray-400 text-sm font-medium italic">What are your primary fields of expertise?</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-2 rounded-lg ${selected ? 'bg-white/20' : 'bg-rocket/5 text-rocket'}`}>
                           <span className="text-xs font-black uppercase">{skill.id.slice(0,3)}</span>
                        </div>
                        {selected && (
                           <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                           </svg>
                        )}
                      </div>
                      <p className="font-bold text-[15px] mb-1">{skill.title}</p>
                      <p className={`text-[11px] font-medium leading-tight ${selected ? 'text-white/80' : 'text-gray-400'}`}>
                        {skill.description}
                      </p>
                    </button>
                  );
                })}
             </div>
          </section>
        </div>

        <aside className="space-y-8">
          {isEditing && (
            <div className="bg-white border border-gray-100 rounded-[32px] p-6 space-y-4 shadow-xl shadow-rocket/5">
               <h3 className="text-lg font-bold text-darkside">Ready to update?</h3>
               <p className="text-xs text-gray-400 font-medium leading-relaxed">
                  Carefully review all changes. Accurate profiles increase your mission acceptance rate.
               </p>
               <div className="space-y-2 pt-2">
                 <button
                   type="submit"
                   className="w-full bg-rocket text-white font-bold py-4 rounded-2xl shadow-xl shadow-rocket/20 hover:bg-indigo-700 transition-all active:scale-95"
                 >
                   Save Changes
                 </button>
                 <button
                   type="button"
                   onClick={handleCancelEditing}
                   className="w-full border-2 border-gray-100 text-gray-400 font-bold py-3 rounded-2xl hover:bg-gray-50 transition-all"
                 >
                   Cancel
                 </button>
               </div>
            </div>
          )}

          <div className="bg-darkside text-white rounded-[32px] p-8 space-y-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rocket/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-rocket/20 transition-all duration-500"></div>
            
            <div className="space-y-1 relative">
              <h3 className="text-xl font-bold tracking-tight">Trust Status</h3>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">Verified Member</p>
            </div>

            <div className="space-y-6 relative">
              <div className="flex items-center gap-4 group/item">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-rocket transition-transform group-hover/item:scale-110">
                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                   </svg>
                </div>
                <div>
                   <p className="text-sm font-bold">Identity Confirmed</p>
                   <p className="text-[10px] text-gray-500 font-medium">Synced with Campus</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group/item">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-yoda transition-transform group-hover/item:scale-110">
                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
                   </svg>
                </div>
                <div>
                   <p className="text-sm font-bold">Trust Badge: 100</p>
                   <p className="text-[10px] text-gray-500 font-medium">Premium Contributor</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}