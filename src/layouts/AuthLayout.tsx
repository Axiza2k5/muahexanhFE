import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  imageSide?: 'left' | 'right';
  showBackButton?: boolean;
  imageContent?: {
    title?: string;
    description?: string;
    theme?: 'rocket' | 'darkside';
    imageUrl?: string;
  };
}

export default function AuthLayout({
  children,
  title,
  subtitle,
  imageSide = 'right',
  showBackButton = true,
  imageContent,
}: AuthLayoutProps) {
  const isImageRight = imageSide === 'right';
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left side (could be form or image depending on imageSide) */}
      {!isImageRight && imageContent && (
        <AuthImageSection {...imageContent} />
      )}

      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 relative">
        {showBackButton && (
          <Link 
            to="/" 
            className={`absolute top-8 ${isImageRight ? 'left-8' : 'right-8'} flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-darkside transition-colors`}
          >
            {isImageRight ? (
              <>
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </>
            ) : (
              <>
                <span>Back to Home</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Link>
        )}
        <div className="w-full max-w-md space-y-8 mt-10 lg:mt-0">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-darkside mb-2">{title}</h1>
            <p className="text-gray-500 text-sm">{subtitle}</p>
          </div>
          
          {children}
        </div>
      </div>

      {/* Right side */}
      {isImageRight && imageContent && (
        <AuthImageSection {...imageContent} />
      )}
    </div>
  );
}

function AuthImageSection({ title, description, theme, imageUrl }: AuthLayoutProps['imageContent'] & {}) {
  if (imageUrl) {
    return (
      <div className="hidden lg:flex w-1/2 relative">
        <img 
          src={imageUrl} 
          alt="Authentication background" 
          className="absolute inset-0 w-full h-full object-cover" 
        />
      </div>
    );
  }

  const bgClass = theme === 'rocket' ? 'bg-rocket' : 'bg-darkside';
  
  return (
    <div className={`hidden lg:flex w-1/2 ${bgClass} text-white p-12 flex-col justify-center items-center relative overflow-hidden`}>
      <div className={`absolute top-0 left-0 w-full h-full ${theme === 'rocket' ? 'opacity-10' : 'opacity-5'}`}>
        {theme === 'rocket' ? (
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <polygon points="0,0 100,0 100,100" fill="currentColor"/>
          </svg>
        ) : (
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
        )}
      </div>
      <div className="relative z-10 max-w-lg text-center space-y-6">
        <h2 className="text-4xl font-bold leading-tight">{title}</h2>
        <p className="text-lg opacity-90">{description}</p>
      </div>
    </div>
  );
}
