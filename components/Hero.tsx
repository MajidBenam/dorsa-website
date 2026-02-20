import Link from 'next/link';
import Image from 'next/image';
import { FaUserMd, FaFlask, FaGraduationCap, FaHeartbeat } from 'react-icons/fa';
import GradientIcon from '@/components/GradientIcon';

export default function Hero() {
  return (
    <section className="relative py-20 overflow-hidden min-h-[600px] flex items-center">
      {/* Blurred background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_bg.png"
          alt=""
          fill
          className="object-cover scale-105"
          priority
        />
        <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px]" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-xl ring-4 ring-white border-4 border-primary-100">
              <Image
                src="/images/dorsa_avatar.png"
                alt="Dr. Dorsa Ghasemi"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-primary mb-6 pb-1">
            Welcome to My Professional Portfolio
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Dedicated medical professional with expertise in patient care, research, and academic supervision
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/#about"
              className="bg-gradient-primary-full-light px-8 pt-2 pb-1 rounded-lg font-semibold hover:bg-gradient-primary-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Learn More About Me
            </Link>
            <Link
              href="/contact"
              className="bg-white text-primary-600 px-8 pt-1.5 pb-1 rounded-lg font-semibold border-2 border-primary-500 hover:bg-primary-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get In Touch
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-4 border border-white/50 border-t-4 border-t-primary-500">
              <GradientIcon icon={FaHeartbeat} className="text-3xl mx-auto mb-2" />
              <div className="text-2xl font-bold text-gradient-primary-fit">15+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-4 border border-white/50 border-t-4 border-t-primary-500">
              <GradientIcon icon={FaFlask} className="text-3xl mx-auto mb-2" />
              <div className="text-2xl font-bold text-gradient-primary-fit">15+</div>
              <div className="text-sm text-gray-600">Publications</div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-4 border border-white/50 border-t-4 border-t-primary-500">
              <GradientIcon icon={FaGraduationCap} className="text-3xl mx-auto mb-2" />
              <div className="text-2xl font-bold text-gradient-primary-fit">Board Certified</div>
              <div className="text-sm text-gray-600">Pathologist</div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-4 border border-white/50 border-t-4 border-t-primary-500">
              <GradientIcon icon={FaUserMd} className="text-3xl mx-auto mb-2" />
              <div className="text-2xl font-bold text-gradient-primary-fit">USMLE</div>
              <div className="text-sm text-gray-600">Step 1 & 2 Passed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
