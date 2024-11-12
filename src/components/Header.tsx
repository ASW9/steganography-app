'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';

export default function Header() {
  const router = useRouter();

  return (
    <header className="bg-gray-900/50 backdrop-blur-sm shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Logo */}
          <button 
            onClick={() => router.push('/')}
            className="cursor-pointer"
          >
            <Image
              src="/logos/iconlogo.png"
              alt="University of Nottingham Logo"
              width={100}
              height={50}
              className="object-contain"
              priority
            />
          </button>

          {/* Right side - Links */}
          <div className="flex items-center gap-6">
            {/* Course Link */}
            <a
              href="https://g1ozago1ehq.typeform.com/to/d80QWhZv"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300"
            >
              <svg 
                viewBox="0 0 24 24" 
                width="24" 
                height="24" 
                className="text-orange-500"
              >
                <path
                  fill="currentColor"
                  d="M12 23a7.5 7.5 0 0 1-5.138-12.963C8.204 8.774 11.5 6.5 11 1.5c6 4 9 8 3 14 1 0 2.5 0 5-2.47.27.773.5 1.604.5 2.47A7.5 7.5 0 0 1 12 23z"
                />
              </svg>
              <span className="hidden sm:inline">Free Course</span>
            </a>

            {/* GitHub Link */}
            <a
              href="https://github.com/ASW9/steganography-app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300"
            >
              <FaGithub size={24} />
              <span className="hidden sm:inline">View on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}