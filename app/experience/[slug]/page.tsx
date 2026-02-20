import { getExperienceBySlug } from '@/lib/data';
import { formatDateRange } from '@/lib/utils';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FaHospital } from 'react-icons/fa';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const experience = await getExperienceBySlug(params.slug);
  
  if (!experience) {
    return {
      title: 'Experience Not Found',
    };
  }

  return {
    title: `${experience.title} - Dr. Dorsa`,
    description: experience.description,
  };
}

export default async function ExperienceDetailPage({ params }: PageProps) {
  const experience = await getExperienceBySlug(params.slug);

  if (!experience) {
    notFound();
  }

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/experience"
          className="text-primary-600 hover:text-primary-700 mb-6 inline-block"
        >
          ← Back to Experiences
        </Link>

        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          {experience.featured_image_url && (
            <div className="relative h-64 md:h-96 w-full">
              <Image
                src={experience.featured_image_url}
                alt={experience.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                {experience.category}
              </span>
              <span className="text-sm text-gray-500">
                {formatDateRange(experience.date_from, experience.date_to)}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {experience.title}
            </h1>

            <div className="mb-6 pb-6 border-b border-gray-200">
              <p className="flex items-center gap-2 text-lg text-gray-600 mb-2">
                <FaHospital className="text-primary-500" />
                <span className="font-semibold">Hospital:</span> {experience.hospital_name}
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 whitespace-pre-wrap">
                {experience.content}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
