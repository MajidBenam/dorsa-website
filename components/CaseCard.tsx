import Link from 'next/link';
import { Experience } from '@/types/database';
import { formatDateRange } from '@/lib/utils';
import { FaHospital, FaUniversity, FaCalendarAlt } from 'react-icons/fa';
import GradientIcon from '@/components/GradientIcon';

interface CaseCardProps {
  experience: Experience;
}

export default function CaseCard({ experience }: CaseCardProps) {
  const isUniversity = experience.hospital_name?.toLowerCase().includes('university');
  const Icon = isUniversity ? FaUniversity : FaHospital;

  return (
    <Link href="#">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-row group border border-t-4 hover:border-t-4 hover:border-primary-500 mb-2">
        {/* Left: icon based on institution type */}
        <div className="flex-shrink-0 w-24 sm:w-14 h-16 sm:h-16 flex items-center justify-center border-b border-r border-primary-200 rounded-br-lg">
          <GradientIcon icon={Icon} className="text-2xl sm:text-3xl opacity-90" />
        </div>
        {/* Right: text content */}
        <div className="flex-1 min-w-0 p-2 sm:p-3 flex flex-col">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-semibold bg-primary-100 text-gradient-primary py-1 rounded-full">
              {experience.category}
            </span>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <FaCalendarAlt className="text-xs" />
              <span>{formatDateRange(experience.date_from, experience.date_to)}</span>
            </div>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {experience.title}
          </h3>
          <p className="text-gray-600 mb-3 flex-1 line-clamp-2 sm:line-clamp-3 text-sm sm:text-base">
            {experience.description}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <Icon className="text-primary-500 flex-shrink-0 text-base" />
            <span className="font-medium truncate">{experience.hospital_name}</span>
          </div>

        </div>
      </div>
    </Link>
  );
}
