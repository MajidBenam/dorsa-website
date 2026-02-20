import PDFViewer from '@/components/PDFViewer';
import { FaFilePdf, FaCalendarAlt } from 'react-icons/fa';

export const metadata = {
  title: 'CV - Dr. Dorsa',
  description: 'Download or view Dr. Dorsa\'s curriculum vitae',
};

export default function CVPage() {
  const cvPath = '/cv/Dorsa Updated CV Feb 2026.pdf';

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
        <PDFViewer file={cvPath} title="Dr. Dorsa - Curriculum Vitae" />
      </div>
    </div>
  );
}
