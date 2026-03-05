import dynamic from 'next/dynamic';
import { FaFilePdf, FaCalendarAlt } from 'react-icons/fa';

const PDFViewer = dynamic(() => import('@/components/PDFViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center py-12 bg-gray-100 rounded-lg">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
    </div>
  ),
});

export const metadata = {
  title: 'CV - Dr. Dorsa',
  description: 'Download or view Dr. Dorsa\'s curriculum vitae',
};

export default function CVPage() {
  const cvPath = '/cv/Dorsa Updated CV Mar 2026.pdf';

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-4">
          <div className="bg-gradient-primary p-4 rounded-xl shadow-lg">
            <FaFilePdf className="text-4xl text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gradient-primary mb-2">Curriculum Vitae</h1>
            <p className="flex items-center gap-2 text-gray-600">
              <FaCalendarAlt className="text-sm text-primary-500" />
              Last updated: February 2026
            </p>
          </div>
        </div>
        <PDFViewer file={cvPath} title="Dr. Dorsa Ghasemi - Curriculum Vitae" />
      </div>
    </div>
  );
}
