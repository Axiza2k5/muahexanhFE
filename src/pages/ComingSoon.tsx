import { useNavigate } from 'react-router-dom';

export default function ComingSoon() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-8 bg-white">
      <div className="max-w-md w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="relative inline-block">
          <div className="w-24 h-24 bg-indigo-50 rounded-3xl flex items-center justify-center text-rocket text-4xl mx-auto shadow-sm">
            ✨
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full border-4 border-white animate-pulse"></div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold text-darkside tracking-tight">Coming Soon</h1>
          <p className="text-gray-500 font-medium leading-relaxed">
            We're working hard to bring you this feature. Stay tuned for more updates to the Mua He Xanh Volunteer Portal!
          </p>
        </div>

        <button
          onClick={() => navigate('/projects')}
          className="inline-flex items-center gap-2 bg-rocket text-white font-bold py-3.5 px-8 rounded-xl text-sm hover:shadow-lg hover:shadow-rocket/20 transition-all hover:-translate-y-0.5"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Projects
        </button>
      </div>
    </div>
  );
}
