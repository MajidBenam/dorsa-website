import Image from 'next/image';
import CaseCard from '@/components/CaseCard';
import { getAllExperiences, getAllSupervision } from '@/lib/data';
import { images } from '@/lib/images';
import { FaBriefcase, FaGraduationCap, FaUserGraduate, FaUniversity, FaCalendarAlt } from 'react-icons/fa';

export const metadata = {
  title: 'Experience - Dr. Dorsa',
  description: 'Explore hospital cases, professional experiences, and supervision & mentorship',
};

export default async function ExperiencePage() {
  const [experiences, supervision] = await Promise.all([
    getAllExperiences(),
    getAllSupervision(),
  ]);


  return (
    <div className="py-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <Image src={images.hospital} alt="" fill className="object-cover" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gradient-primary mb-4">Experience & Mentorship</h1>
        <p className="text-gray-600 mb-12 text-lg">
          Explore my professional experiences, hospital cases, and academic supervision.
        </p>

        {/* Hospital Experiences & Cases */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gradient-primary mb-6 flex items-center gap-2">
            <FaBriefcase />
            Hospital Experiences & Cases
          </h2>
          {experiences.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-600">No experiences available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {experiences.map((experience) => (
                <CaseCard key={experience.id} experience={experience} />
              ))}
            </div>
          )}
        </section>

        {/* Supervision & Mentorship */}
        <section>
          <h2 className="text-2xl font-bold text-gradient-primary mb-6 flex items-center gap-2">
            <FaGraduationCap />
            Supervision & Mentorship
          </h2>
          {supervision.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-600">No supervision records available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supervision.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md px-3 py-2 hover:shadow-xl transition-shadow border border-l-4 border-primary-200"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs font-semibold bg-primary-100 text-gradient-primary px-3 py-1 rounded-full border border-primary-200">
                      {item.type} Supervision
                    </span>
                    <span className="flex items-center gap-1 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full ml-auto">
                      <FaCalendarAlt className="text-xs" />
                      {item.year}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h4>
                  {item.student_name && (
                    <p className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <FaUserGraduate className="text-primary-500 shrink-0" />
                      <span className="font-medium">Student:</span> {item.student_name}
                    </p>
                  )}
                  <p className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <FaUniversity className="text-primary-500 shrink-0" />
                    <span className="font-medium">Institution:</span> {item.institution}
                  </p>
                  <p className="text-gray-700 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
