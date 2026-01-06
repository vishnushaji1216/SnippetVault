import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import SnippetCard from '../components/SnippetCard';
import { getSnippets, deleteSnippet } from '../lib/storage';
import { Loader2 } from 'lucide-react'; // <--- Import a loading icon
import toast from 'react-hot-toast';

const Home = () => {
  const [snippets, setSnippets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // <--- 1. New Loading State

  useEffect(() => {
    const loadData = async () => {
      setLoading(true); // Start loading
      const data = await getSnippets();
      setSnippets(data || []);
      setLoading(false); // <--- Stop loading when done
    };
    loadData();
  }, []);

  const handleDelete = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-slate-800">
          Are you sure you want to delete this?
        </span>
        <div className="flex gap-2">
        <button
            onClick={async () => {
              toast.dismiss(t.id); // Close the confirmation toast
              
              // Perform the actual delete
              await deleteSnippet(id);
              toast.success("Snippet deleted.");
              
              // Refresh the list
              const data = await getSnippets();
              setSnippets(data || []);
            }}
            className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
          >
          Delete
          </button>

          <button
            onClick={() => toast.dismiss(t.id)}
            className="rounded border border-slate-300 bg-white px-3 py-1 text-sm text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>

        </div>
      </div>
    ), {
      duration: 5000,
      style: {
        background: '#fff',
        color: '#333'
      },
    });
  };

  const filteredSnippets = (snippets || []).filter(snippet => 
    snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (Array.isArray(snippet.tags) && snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-blue-500/30">
      
      <Navbar onSearch={setSearchTerm} />

      <main className="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
        
        {/* 2. LOADING STATE */}
        {loading ? (
          <div className="mt-20 flex justify-center text-slate-500">
             <Loader2 className="animate-spin" size={48} />
          </div>
        ) : (
          // 3. ACTUAL CONTENT (Only show if NOT loading)
          <>
            {/* Empty State */}
            {snippets.length === 0 && (
                <div className="mt-20 text-center text-slate-500">
                    <p>No snippets yet. Click "New Snippet" to add one!</p>
                </div>
            )}

            {/* Grid */}
            <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {filteredSnippets.map((snippet) => (
                <SnippetCard 
                  key={snippet.id}
                  title={snippet.title}
                  language={snippet.language}
                  code={snippet.code}
                  tags={snippet.tags}
                  onDelete={() => handleDelete(snippet.id)}
                />
              ))}
            </div>
          </>
        )}
        
      </main>
    </div>
  );
};

export default Home;