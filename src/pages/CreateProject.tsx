import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Briefcase, Calendar, Users } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import axiosInstance from '@/api/axiosInstance';
import toast from 'react-hot-toast';

export default function CreateProjectPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requiredSkills: '',
    startTime: '',
    endTime: '',
    amountOfParticipants: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate required fields
    if (!formData.title.trim()) {
      const errorMessage = 'Project title is required';
      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    if (!formData.description.trim()) {
      const errorMessage = 'Project description is required';
      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    if (formData.startTime && formData.endTime && new Date(formData.startTime) >= new Date(formData.endTime)) {
      const errorMessage = 'End time must be after start time';
      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    setLoading(true);

    try {
      // Create FormData object
      const createProjectData = new FormData();
      createProjectData.append('title', formData.title);
      createProjectData.append('description', formData.description);
      createProjectData.append('requiredSkills', formData.requiredSkills);
      if (formData.startTime) createProjectData.append('startTime', formData.startTime);
      if (formData.endTime) createProjectData.append('endTime', formData.endTime);
      if (formData.amountOfParticipants) createProjectData.append('amountOfParticipants', formData.amountOfParticipants);

      const response = await axiosInstance.post('/v1/projects', createProjectData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Project created successfully!');
      navigate('/projects');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.response?.data?.error || 'Project creation failed.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-8 pt-8 max-w-4xl mx-auto">
      {/* Header */}
      <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Create</p>
      <h1 className="text-6xl font-extrabold text-darkside tracking-tight mb-2">Create a New Project</h1>
      <p className="text-base text-gray-500 mb-8 max-w-lg">
        Share your project idea with the community and find talented collaborators to bring it to life.
      </p>

      {/* Form Container */}
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-600 rounded-r-lg p-4 mb-6">
              <p className="text-sm font-semibold text-red-600">{error}</p>
            </div>
          )}

          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-2">
              Project Title *
            </label>
            <Input
              id="title"
              type="text"
              placeholder="e.g., AI-Powered Chat Application"
              icon={<Book className="h-5 w-5 text-gray-400" />}
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description Input */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">
              Project Description *
            </label>
            <textarea
              id="description"
              placeholder="Describe your project in detail... What are the goals, target audience, and expected impact?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rocket focus:border-transparent resize-none"
              rows={6}
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Required Skills Input */}
          <div>
            <label htmlFor="requiredSkills" className="block text-sm font-semibold text-gray-900 mb-2">
              Required Skills
            </label>
            <Input
              id="requiredSkills"
              type="text"
              placeholder="e.g., React, Node.js, MongoDB, UI/UX Design"
              icon={<Briefcase className="h-5 w-5 text-gray-400" />}
              value={formData.requiredSkills}
              onChange={handleChange}
            />
          </div>

          {/* Date/Time Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="startTime" className="block text-sm font-semibold text-gray-900 mb-2">
                Start Time
              </label>
              <Input
                id="startTime"
                type="datetime-local"
                icon={<Calendar className="h-5 w-5 text-gray-400" />}
                value={formData.startTime}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="endTime" className="block text-sm font-semibold text-gray-900 mb-2">
                End Time
              </label>
              <Input
                id="endTime"
                type="datetime-local"
                icon={<Calendar className="h-5 w-5 text-gray-400" />}
                value={formData.endTime}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Participants Input */}
          <div>
            <label htmlFor="amountOfParticipants" className="block text-sm font-semibold text-gray-900 mb-2">
              Maximum Participants
            </label>
            <Input
              id="amountOfParticipants"
              type="number"
              placeholder="e.g., 5"
              icon={<Users className="h-5 w-5 text-gray-400" />}
              value={formData.amountOfParticipants}
              onChange={handleChange}
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-6 flex gap-4">
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className="flex-1"
            >
              {loading ? 'Creating Project...' : 'Create Project'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/projects')}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
