import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getInstagramPostById, getInstagramPostGroupById } from '@/lib/data';
import { formatDate } from '@/lib/utils';
import { FaInstagram, FaCalendarAlt, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import GalleryCarousel from '@/components/GalleryCarousel';

interface GalleryDetailPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: GalleryDetailPageProps) {
  const post = await getInstagramPostById(params.id);
  const baseTitle = 'Gallery - Dr. Dorsa';
  if (!post) {
    return {
      title: baseTitle,
    };
  }
  const caption = post.caption ? post.caption.slice(0, 60) : '';
  return {
    title: caption ? `${caption} - ${baseTitle}` : baseTitle,
  };
}

export default async function GalleryDetailPage({ params }: GalleryDetailPageProps) {
  const post = await getInstagramPostById(params.id);
  if (!post) {
    return notFound();
  }

  const group = await getInstagramPostGroupById(params.id);

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/gallery"
          className="inline-flex items-center text-sm text-gray-600 border border-gray-700 px-2 py-1 rounded-md hover:text-primary-600 mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back to Posts
        </Link>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <GalleryCarousel items={group} altFallback={post.caption || 'Gallery image'} />

          <div className="p-3 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
              {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {(() => {
                  const tags = post.tags || [];
                  const priority = tags.find(
                    (t) => t === 'personal' || t === 'professional'
                  );
                  const others = tags.filter(
                    (t) => t !== 'personal' && t !== 'professional'
                  );
                  const ordered = priority ? [priority, ...others] : others;
                  return ordered.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-1 pt-0.5 pb-0 rounded-md bg-transparent text-primary-700 border border-primary-700"
                      >
                      {tag}
                    </span>
                  ));
                })()}
              </div>
            )}
              </div>
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <FaCalendarAlt className="text-primary-700" />
                {formatDate(post.timestamp)}
              </span>
            </div>

         

            {post.caption && (
              <p className="text-gray-700 text-sm whitespace-pre-line">
               <span className="font-bold">Caption:</span> {post.caption}
              </p>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

