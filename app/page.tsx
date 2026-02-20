import Hero from '@/components/Hero';
import CaseCard from '@/components/CaseCard';
import ResearchCard from '@/components/ResearchCard';
import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedExperiences, getFeaturedResearch } from '@/lib/data';
import { images } from '@/lib/images';
import { FaUserMd, FaFlask, FaGraduationCap, FaAward, FaHeartbeat, FaBookMedical, FaBriefcase } from 'react-icons/fa';
import GradientIcon from '@/components/GradientIcon';

export default async function Home() {
  const experiences = await getFeaturedExperiences(3);
  const research = await getFeaturedResearch(3);

  return (
    <div>
      <Hero />

      {/* Full-width image */}
      <div className="relative w-full h-full">
        <Image
          src="/images/dorsa_working.png"
          alt="Dr. Dorsa Ghasemi working"
          width={500}
          height={360}
          className="object-cover justify-center items-center mx-auto"
          priority
        />
      </div>
      
      {/* Featured Experiences */}
      {experiences.length > 0 && (
        <section className="py-16 bg-gray-50 relative overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold text-gradient-primary flex items-center gap-2">
                <FaBriefcase />
                Hospital Experiences & Cases
              </h2>
              <Link
                href="/experience"
                className="text-primary-600 hover:text-accent-600 font-semibold flex items-center gap-2 transition-colors"
              >
                View All
                <span>→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {experiences.map((experience) => (
                <CaseCard key={experience.id} experience={experience} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Research */}
      {research.length > 0 && (
        <section className="py-16 bg-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.13]">
            <Image src={images.medicalResearch} alt="" fill className="object-cover" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gradient-primary flex items-center gap-3">
                <span className="h-1 w-12 rounded" style={{ background: 'linear-gradient(45deg, #96c03a 0%, #00aecc 30%)' }}></span>
                Recent Research
              </h2>
              <Link
                href="/research"
                className="text-primary-600 hover:text-accent-600 font-semibold flex items-center gap-2 transition-colors"
              >
                View All
                <span>→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {research.map((item) => (
                <ResearchCard key={item.id} research={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Me */}
      <section id="about" className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <Image src={images.medicalLab} alt="" fill className="object-cover" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-xl ring-4 ring-white border-4 border-primary-100 mx-auto mb-4">
              <Image
                src="/images/dorsa_avatar.png"
                alt="Dr. Dorsa Ghasemi"
                fill
                className="object-cover"
              />
            </div>
            <h2 className="text-3xl font-bold text-gradient-primary mb-4">About Me</h2>
            <div className="h-1 w-24 mx-auto rounded bg-gradient-primary" />
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 border-l-4 border-primary-500">
              <div className="flex items-center gap-3 mb-4">
                <GradientIcon icon={FaUserMd} className="text-xl" />
                <h3 className="text-xl font-bold text-gradient-primary">Professional Background</h3>
              </div>
              <p className="text-gray-700 mb-4">
                I am Dr. Dorsa Ghasemi, a board-certified pathologist with extensive experience in anatomical and clinical pathology, surgical pathology, cytopathology, and molecular diagnostics. My commitment to excellence drives me to continuously advance medical knowledge through research and clinical practice.
              </p>
              <p className="text-gray-700 mb-4">
                I have served in various leadership roles including Laboratory Medical Director at Dr. Tahririan Medical Laboratory and Farabi Hospital, and Deputy Chief Physician of Hemovigilance. My expertise spans diagnostic pathology, laboratory leadership, quality control, hemovigilance, and interdisciplinary clinical collaboration.
              </p>
              <p className="text-gray-700">
                I am a published researcher in gynecopathology, oncology, dermatopathology, and infectious disease diagnostics, with multiple publications in peer-reviewed journals and contributions to medical textbooks. I have successfully passed USMLE Step 1 and Step 2 (Score: 251), and ranked 1st in the Pathology Board examination (top 10%).
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 border-l-4 border-primary-500">
              <div className="flex items-center gap-3 mb-4">
                <GradientIcon icon={FaAward} className="text-xl" />
                <h3 className="text-xl font-bold text-gradient-primary">Key Achievements</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <FaFlask className="text-primary-500 text-xl mt-1 shrink-0" />
                  <span className="text-gray-700">15+ research publications in peer-reviewed journals including BMC Cancer, Diagnostic Pathology, and Clinical Case Reports</span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <FaGraduationCap className="text-primary-500 text-xl mt-1 shrink-0" />
                  <span className="text-gray-700">Ranked 1st in Pathology Board examination (top 10%), Best Pathology Resident 2018-2019</span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <FaHeartbeat className="text-primary-500 text-xl mt-1 shrink-0" />
                  <span className="text-gray-700">Board-certified pathologist with expertise in surgical pathology, cytopathology, and molecular diagnostics</span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <FaBookMedical className="text-primary-500 text-xl mt-1 shrink-0" />
                  <span className="text-gray-700">Laboratory Medical Director, Deputy Chief Physician of Hemovigilance, and Chief Resident experience</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 border-l-4 border-primary-500">
              <div className="flex items-center gap-3 mb-6">
                <GradientIcon icon={FaFlask} className="text-xl" />
                <h3 className="text-xl font-bold text-gradient-primary">Areas of Expertise</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg border border-primary-100 hover:shadow-lg transition-shadow">
                  <FaHeartbeat className="text-primary-500 text-2xl mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">Surgical Pathology</h4>
                  <p className="text-gray-700 text-sm">Expert in gross examination, microscopic diagnosis, and pathology reporting for biopsies and surgical specimens</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg border border-primary-100 hover:shadow-lg transition-shadow">
                  <FaFlask className="text-primary-500 text-2xl mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">Research Focus</h4>
                  <p className="text-gray-700 text-sm">Published researcher in gynecopathology, dermatopathology, breast pathology, molecular pathology, and microbiology</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg border border-primary-100 hover:shadow-lg transition-shadow">
                  <FaGraduationCap className="text-primary-500 text-2xl mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">Laboratory Leadership</h4>
                  <p className="text-gray-700 text-sm">Experienced Laboratory Medical Director with expertise in quality control, hemovigilance, and clinical pathology</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg border border-primary-100 hover:shadow-lg transition-shadow">
                  <FaBookMedical className="text-primary-500 text-2xl mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">Cytopathology</h4>
                  <p className="text-gray-700 text-sm">Skilled in gynecologic cytology, fine needle aspirations, and urine cytology interpretation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gradient-primary">Let's Connect</h2>
          <p className="text-xl mb-8 text-gray-700">
            Interested in collaboration or have questions? I'd love to hear from you.
          </p>
          <Link
            href="/contact"
            className="bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-block"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
