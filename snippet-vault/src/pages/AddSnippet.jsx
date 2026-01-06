import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Navbar from '../components/Navbar';
import { Save, X } from 'lucide-react';
import { addSnippet } from '../lib/storage';
import toast from 'react-hot-toast';

const AddSnippet = () => {
  const navigate = useNavigate();
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    language: 'javascript',
    code: '',
    tags: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Saving snippet:", formData);

    await toast.promise(
      addSnippet(formData),
      {
        loading: 'Saving snippet...',
        success: 'Snippet created successfully! 🎉',
        error: 'Error creating snippet',
      });
    navigate("/"); // Go back home
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar />

      <main className="mx-auto max-w-3xl p-4 sm:px-6 lg:px-8 mt-10">
        
        {/* FORM CARD */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl backdrop-blur-sm">
          
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Create New Snippet</h2>
            <button onClick={() => navigate("/")} className="text-slate-400 hover:text-white">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Title & Language Row */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Title</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. Center a Div"
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Language</label>
                <select 
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-white focus:border-blue-500 focus:outline-none"
                  value={formData.language}
                  onChange={(e) => setFormData({...formData, language: e.target.value})}
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="css">CSS</option>
                  <option value="html">HTML</option>
                  <option value="sql">SQL</option>
                  <option value="nodejs">Node Js</option>
                </select>
              </div>
            </div>

            {/* Code Editor Area */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Code</label>
              <textarea 
                required
                rows={8}
                placeholder="// Type your code here..."
                className="w-full rounded-lg border border-slate-700 bg-slate-950 p-4 font-mono text-sm text-slate-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.code}
                onChange={(e) => setFormData({...formData, code: e.target.value})}
              />
            </div>

            {/* Tags Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Tags (comma separated)</label>
              <input 
                type="text" 
                placeholder="react, hooks, ui"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-white focus:border-blue-500 focus:outline-none"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95"
            >
              <Save size={20} />
              Save Snippet
            </button>

          </form>
        </div>
      </main>
    </div>
  );
};

export default AddSnippet;