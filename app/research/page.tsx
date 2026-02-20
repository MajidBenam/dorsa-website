import ResearchCard from '@/components/ResearchCard';
import { getAllResearch } from '@/lib/data';
import { Research } from '@/types/database';
import { images } from '@/lib/images';
import Image from 'next/image';

export const metadata = {
  title: 'Research - Dr. Dorsa',
  description: 'Research publications and projects',
};

export default async function ResearchPage() {
  const research = await getAllResearch();

  // Group by year
  const researchByYear = research.reduce((acc, item) => {
    const year = new Date(item.publication_date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(item);
    return acc;
  }, {} as Record<number, Research[]>);

  const years = Object.keys(researchByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <Image src={images.medicalResearch} alt="" fill className="object-cover" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gradient-primary mb-4">Research & Publications</h1>
        <p className="text-gray-600 mb-8 text-lg">
          Explore my research contributions and published work in medical journals and conferences.
        </p>

        {research.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="max-w-2xl mx-auto">
              <p className="text-gray-600 text-lg mb-4">
                No research publications available at the moment.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left text-sm text-blue-800">
                <p className="font-semibold mb-2">To add publications:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Set up your Supabase project and run the SQL script from <code className="bg-blue-100 px-1 rounded">supabase-setup.sql</code></li>
                  <li>Run the SQL INSERT statements from <code className="bg-blue-100 px-1 rounded">scripts/cv-data-insert.sql</code> in your Supabase SQL Editor</li>
                  <li>Ensure your environment variables are configured in <code className="bg-blue-100 px-1 rounded">.env.local</code></li>
                </ol>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {years.map((year) => (
              <div key={year}>
                <h2 className="text-2xl font-bold text-gradient-primary mb-6">{year}</h2>
                <div className="space-y-6">
                  {researchByYear[year].map((item) => (
                    <ResearchCard key={item.id} research={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
