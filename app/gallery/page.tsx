import Image from 'next/image';
import Link from 'next/link';
import { getInstagramPosts } from '@/lib/data';
import { formatDate } from '@/lib/utils';
import { FaInstagram, FaCalendarAlt, FaExternalLinkAlt } from 'react-icons/fa';

export const metadata = {
  title: 'Gallery - Dr. Dorsa',
  description: 'Photos and moments from Dr. Dorsa Ghasemi',
};

const CAPTION_MAX_LENGTH = 100;

function truncateCaption(caption: string | null): string {
  if (!caption || !caption.trim()) return '';
  const t = caption.trim();
  const suffix = ' …';
  if (t.length <= CAPTION_MAX_LENGTH) return t;
  const sliceLimit = Math.max(0, CAPTION_MAX_LENGTH - suffix.length);
  const slice = t.slice(0, sliceLimit);
  const lastSpace = slice.lastIndexOf(' ');
  const safe = lastSpace > 0 ? slice.slice(0, lastSpace) : slice;
  return safe.trim() + suffix;
}

export default async function GalleryPage({
  searchParams,
}: {
  searchParams?: { category?: string };
}) {
  const posts = await getInstagramPosts();

  const rawCategory = (searchParams?.category || '').toLowerCase();
  const category: 'professional' | 'personal' | 'other' =
    rawCategory === 'personal'
      ? 'personal'
      : rawCategory === 'other'
      ? 'other'
      : 'professional';

  // Group posts that belong to the same original Instagram post (e.g. carousel)
  const groups: { key: string; posts: typeof posts }[] = [];
  const seen = new Set<string>();

  for (const post of posts) {
    const key = `${post.timestamp}__${post.permalink || ''}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const groupItems = posts.filter(
      (p) => p.timestamp === post.timestamp && p.permalink === post.permalink
    );
    groups.push({ key, posts: groupItems });
  }

  function getGroupCategory(group: { posts: typeof posts }) {
    const tags = group.posts[0]?.tags || [];
    const isProfessional = tags.includes('professional');
    const isPersonal = tags.includes('personal');
    if (isProfessional) return 'professional';
    if (isPersonal) return 'personal';
    return 'other';
  }

  const allTabs = [
    { id: 'professional' as const, label: 'Professional' },
    { id: 'personal' as const, label: 'Personal' },
    { id: 'other' as const, label: 'Other' },
  ];
  const tabsWithItems = allTabs.filter((tab) =>
    groups.some((g) => getGroupCategory(g) === tab.id)
  );
  const effectiveCategory = tabsWithItems.some((t) => t.id === category)
    ? category
    : tabsWithItems[0]?.id ?? 'professional';

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gradient-primary mb-4 flex items-center gap-3">
            <FaInstagram className="text-4xl" />
            Posts
          </h1>
          <p className="text-gray-600 text-lg">
            Explore professional cases and some special personal moments of my life.
          </p>
          {tabsWithItems.length > 0 && (
            <div className="mt-6 flex justify-center">
              <div className="inline-flex rounded-full bg-gray-100 p-1 text-sm">
                {tabsWithItems.map((tab) => {
                  const isActive = effectiveCategory === tab.id;
                  const href =
                    tab.id === 'professional' ? '/gallery' : `/gallery?category=${tab.id}`;
                  return (
                    <Link
                      key={tab.id}
                      href={href}
                      className={`px-4 py-1.5 rounded-full transition-all ${
                        isActive
                          ? 'bg-white text-primary-700 shadow-sm'
                          : 'text-gray-600 hover:text-primary-700'
                      }`}
                    >
                      {tab.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {posts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center text-gray-500">
            <p>No photos in the gallery yet.</p>
            <p className="mt-2 text-sm">
              Run the Instagram sync script to pull in photos from a connected Professional account.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups
              .filter((group) => getGroupCategory(group) === effectiveCategory)
              .map((group) => {
              const post = group.posts[0];
              const multi = group.posts.length > 1;
              return (
              <article
                key={group.key}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <Link href={`/gallery/${post.id}`} className="block">
                  <div className="relative aspect-square bg-gray-100">
                    {post.media_type === 'VIDEO' ? (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <span className="text-sm">Video</span>
                      </div>
                    ) : (
                      <Image
                        src={post.local_path}
                        alt={truncateCaption(post.caption) || 'Gallery image'}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    )}
                    {multi && (
                      <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                        +{group.posts.length - 1} more
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    {post.caption && (
                      <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                        {truncateCaption(post.caption)}
                      </p>
                    )}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
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
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <FaCalendarAlt className="text-primary-500" />
                      {formatDate(post.timestamp)}
                    </div>
                  </div>
                </Link>

              </article>
            );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
