import Link from 'next/link';
import { Research } from '@/types/database';
import { formatDateRange } from '@/lib/utils';
import { FaGraduationCap, FaCalendarAlt, FaExternalLinkAlt, FaFilePdf, FaUsers } from 'react-icons/fa';

interface ResearchCardProps {
  research: Research;
}

export default function ResearchCard({ research }: ResearchCardProps) {
  // Function to check if author name matches Dorsa Ghasemi (various formats)
  const isDorsaGhasemi = (authorName: string): boolean => {
    const trimmed = authorName.trim();
    // Match various formats: "Dorsa Ghasemi", "Ghasemi, D", "Ghasemi, Dorsa", "D. Ghasemi", etc.
    const patterns = [
      /Ghasemi,\s*D\.,/i,
      /Dorsa\s+Ghasemi/i,
      /Ghasemi,\s*D\.?\s*$/i,
      /Ghasemi,\s*Dorsa/i,
      /Ghasemi\s+D\.?\s*$/i,
      /Ghasemi\s+Dorsa/i,
      /^D\.?\s+Ghasemi/i,
    ];
    return patterns.some(pattern => pattern.test(trimmed));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-2 hover:shadow-xl transition-all duration-300 border border-t-4border-l-4 hover:border-l-4 hover:border-primary-500 group w-full">
      <div className="flex items-start gap-3 mb-3">

        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-gradient-primary transition-all mb-1">
            {research.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FaCalendarAlt className="text-xs flex-shrink-0" />
            <span>{formatDateRange(research.publication_date, research.publication_date_to ?? undefined, { ongoing: false })}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-start gap-2 text-sm text-gray-600 mb-3">
        <FaUsers className="text-primary-500 mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <span>
            {research.authors.split(',').map((author, index, array) => {
              const trimmedAuthor = author.trim();
              const isDorsa = isDorsaGhasemi(trimmedAuthor);
              const isNextDorsa = index < array.length - 1 && isDorsaGhasemi(array[index + 1].trim());
              
              return (
                <span key={index}>
                  {isDorsa ? (
                    <span className="font-bold text-gradient-primary bg-primary-50 py-0.5 rounded inline-flex">
                      {trimmedAuthor}
                    </span>
                  ) : (
                    <span>{trimmedAuthor}</span>
                  )}
                  {index < array.length - 1 && (
                    <span>{isDorsa || isNextDorsa ? ', ' : ', '}</span>
                  )}
                </span>
              );
            })}
          </span>
        </div>
      </div>
      
      {research.journal_name && (
        <div className="text-sm text-gray-600 mb-3 bg-gray-50 p-2 rounded">
          <span className="font-medium">Journal:</span> {research.journal_name}
        </div>
      )}
      
      <p className="text-gray-700 mb-4 line-clamp-3">
        {research.description}
      </p>
      
      <div className="flex gap-3 flex-wrap">
        {research.link && (
          <a
            href={research.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary-600 hover:text-accent-600 font-semibold text-sm transition-colors"
          >
            <FaExternalLinkAlt />
            View Publication
          </a>
        )}
        {research.pdf_url && (
          <a
            href={research.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary-600 hover:text-accent-600 font-semibold text-sm transition-colors"
          >
            <FaFilePdf />
            Download PDF
          </a>
        )}
      </div>
    </div>
  );
}
