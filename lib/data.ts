import { supabase } from './supabase';
import { Experience, Research, Supervision, InstagramPost } from '@/types/database';

// Data fetching functions for use across the application

export async function getAllExperiences(): Promise<Experience[]> {
  try {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('date_from', { ascending: false });

    if (error) {
      console.error('Error fetching experiences:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return [];
  }
}

export async function getExperienceBySlug(slug: string): Promise<Experience | null> {
  try {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching experience:', error);
    return null;
  }
}

export async function getFeaturedExperiences(limit: number = 3): Promise<Experience[]> {
  try {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('date_from', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching featured experiences:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching featured experiences:', error);
    return [];
  }
}

export async function getAllResearch(): Promise<Research[]> {
  try {
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('Supabase environment variables not configured.');
      return [];
    }

    console.log('Fetching research from Supabase...');
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing');
    console.log('Supabase Anon Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing');

    // First, try a simple count query to test RLS
    const { count: researchCount, error: countError } = await supabase
      .from('research')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('❌ Count query error:', countError);
      console.error('Error code:', countError.code);
      console.error('Error message:', countError.message);
      if (countError.code === 'PGRST301' || countError.message?.includes('permission denied') || countError.message?.includes('policy')) {
        console.error('⚠️ RLS Policy Issue Detected!');
        console.error('The Row Level Security policy is blocking access.');
        console.error('Please run scripts/fix-rls-policies.sql in Supabase SQL Editor');
      }
    } else {
      console.log(`📊 Total research records in database: ${researchCount || 0}`);
    }

    const { data, error } = await supabase
      .from('research')
      .select('*')
      .order('publication_date', { ascending: false });

    if (error) {
      console.error('❌ Supabase Error fetching research:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error details:', JSON.stringify(error, null, 2));
      
      // Check if it's an RLS policy issue
      if (error.code === 'PGRST301' || error.message?.includes('permission denied') || error.message?.includes('policy')) {
        console.error('⚠️ RLS Policy Issue Detected!');
        console.error('Please check your Row Level Security policies in Supabase.');
        console.error('Run scripts/fix-rls-policies.sql in Supabase SQL Editor');
      }
      return [];
    }

    console.log(`✅ Successfully fetched ${data?.length || 0} research publications from database`);
    if (data && data.length > 0) {
      console.log('Sample publication:', data[0].title);
    } else if (researchCount && researchCount > 0) {
      console.error('⚠️ Data exists in database but query returned empty!');
      console.error('This indicates an RLS policy issue.');
      console.error('Records exist:', researchCount);
      console.error('Records returned:', 0);
      console.error('Please run scripts/fix-rls-policies.sql in Supabase SQL Editor');
    }
    return data || [];
  } catch (error) {
    console.error('Exception fetching research:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return [];
  }
}

export async function getFeaturedResearch(limit: number = 3): Promise<Research[]> {
  try {
    const { data, error } = await supabase
      .from('research')
      .select('*')
      .order('publication_date', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching featured research:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching featured research:', error);
    return [];
  }
}

export async function getAllSupervision(): Promise<Supervision[]> {
  try {
    const { data, error } = await supabase
      .from('supervision')
      .select('*')
      .order('year', { ascending: false });

    if (error) {
      console.error('Error fetching supervision:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching supervision:', error);
    return [];
  }
}

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  try {
    const { data, error } = await supabase
      .from('instagram_posts')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) {
      console.error('Error fetching instagram posts:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching instagram posts:', error);
    return [];
  }
}

export async function getInstagramPostById(id: string): Promise<InstagramPost | null> {
  try {
    const { data, error } = await supabase
      .from('instagram_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching instagram post:', error);
    return null;
  }
}

export async function getInstagramPostGroupById(id: string): Promise<InstagramPost[]> {
  try {
    const base = await getInstagramPostById(id);
    if (!base) return [];

    const { data, error } = await supabase
      .from('instagram_posts')
      .select('*')
      .eq('timestamp', base.timestamp)
      .eq('permalink', base.permalink)
      .order('id', { ascending: true });

    if (error) {
      console.error('Error fetching instagram post group:', error);
      return [base];
    }

    if (!data || data.length === 0) {
      return [base];
    }

    return data;
  } catch (error) {
    console.error('Error fetching instagram post group:', error);
    return [];
  }
}
