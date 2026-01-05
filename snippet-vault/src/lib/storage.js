import { supabase } from './supabase';

// 1. GET ALL SNIPPETS (Async now!)
export const getSnippets = async () => {
  // Select everything from the 'snippets' table, ordered by newest first
  const { data, error } = await supabase
    .from('snippets')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error("Error loading snippets:", error);
    return [];
  }
  return data;
};

// 2. ADD A NEW SNIPPET
export const addSnippet = async (snippet) => {
  // Convert "react, hook" string -> ['react', 'hook'] array
  const tagsArray = Array.isArray(snippet.tags) 
    ? snippet.tags 
    : snippet.tags.split(',').map(tag => tag.trim());

  const { error } = await supabase
    .from('snippets')
    .insert([
      { 
        title: snippet.title,
        language: snippet.language,
        code: snippet.code,
        tags: tagsArray
      }
    ]);

  if (error) console.error("Error saving snippet:", error);
};

// 3. DELETE A SNIPPET
export const deleteSnippet = async (id) => {
  const { error } = await supabase
    .from('snippets')
    .delete()
    .eq('id', id);

  if (error) console.error("Error deleting snippet:", error);
};