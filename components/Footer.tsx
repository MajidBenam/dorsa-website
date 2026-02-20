import Link from 'next/link';
import Image from 'next/image';
import { FaUserMd, FaUser, FaBriefcase, FaFlask, FaEnvelope, FaPhone, FaEnvelopeOpen } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden ring-2 ring-primary-500/30">
                <Image
                  src="/images/dorsa_avatar.png"
                  alt="Dr. Dorsa Ghasemi"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">Dr. Dorsa Ghasemi</h3>
                <p className="text-sm text-gray-400">Passionate Pathologist and Researcher</p>
              </div>
            </div>
            <p className="text-gray-400">
              Board-certified pathologist dedicated to excellence in patient care, research, and education.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaBriefcase className="text-primary-400" />
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#about" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <FaUser className="text-sm" />
                  About
                </Link>
              </li>
              <li>
                <Link href="/experience" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <FaBriefcase className="text-sm" />
                  Experience
                </Link>
              </li>
              <li>
                <Link href="/research" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <FaFlask className="text-sm" />
                  Research
                </Link>
              </li>
              <li>
                <Link href="/contact" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <FaEnvelope className="text-sm" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaEnvelopeOpen className="text-primary-400" />
              Contact
            </h4>
            <p className="text-gray-400 mb-3">
              For inquiries and collaborations, please use the contact form.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-primary-400" />
                dorsaghasemi.md@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <FaPhone className="text-primary-400" />
                +98 912 395 0245
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Dr. Dorsa Ghasemi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
