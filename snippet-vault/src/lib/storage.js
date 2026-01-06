import { supabase } from './supabase';

const USING_SUPABASE = !!supabase; 
const LOCAL_KEY = 'snippet-vault-data';

// 1. THE CACHE VARIABLE
// This stays in memory as long as the page is open
let memoryCache = null;

// --- GET SNIPPETS ---
export const getSnippets = async () => {
  // A. Check Memory Cache First (Instant Speed)
  if (memoryCache) {
    return memoryCache;
  }

  // B. If Cache is empty, fetch from source
  if (USING_SUPABASE) {
    const { data, error } = await supabase
      .from('snippets')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) {
      memoryCache = data; // <--- Save to cache
    }
    return error ? [] : data;
  } else {
    // Local Storage logic
    const data = localStorage.getItem(LOCAL_KEY);
    const parsed = data ? JSON.parse(data) : [];
    memoryCache = parsed; // <--- Save to cache
    return parsed;
  }
};

// --- ADD SNIPPET ---
export const addSnippet = async (snippet) => {
  const tagsArray = Array.isArray(snippet.tags) 
    ? snippet.tags 
    : snippet.tags.split(',').map(tag => tag.trim());

  if (USING_SUPABASE) {
    // 1. Send to Cloud AND get the real data back (.select())
    const { data, error } = await supabase
      .from('snippets')
      .insert([{ 
        title: snippet.title,
        language: snippet.language,
        code: snippet.code,
        tags: tagsArray
      }])
      .select(); // <--- Important: Get the created row back!

    if (!error && data) {
      // 2. Update Cache Manually (Optimistic Update)
      // We add the new item to the TOP of the cache array
      if (memoryCache) {
        memoryCache = [data[0], ...memoryCache]; 
      }
    }
  } else {
    // Local Storage Mode
    const newSnippet = {
      id: Date.now(),
      created_at: new Date().toISOString(),
      title: snippet.title,
      language: snippet.language,
      code: snippet.code,
      tags: tagsArray
    };
    
    // Update LocalStorage
    const current = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]');
    const updated = [newSnippet, ...current];
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
    
    // Update Memory Cache
    memoryCache = updated;
  }
};

// --- DELETE SNIPPET ---
export const deleteSnippet = async (id) => {
  if (USING_SUPABASE) {
    // 1. Delete from Cloud
    await supabase.from('snippets').delete().eq('id', id);
    
    // 2. Update Cache Manually
    if (memoryCache) {
      memoryCache = memoryCache.filter(item => item.id !== id);
    }
  } else {
    // Local Storage Mode
    const current = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]');
    const updated = current.filter(item => item.id !== id);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
    
    // Update Memory Cache
    memoryCache = updated;
  }
};