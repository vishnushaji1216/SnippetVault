import { Copy, Trash2 } from "lucide-react";

const SnippetCard = ({ title, language, code, tags, onDelete }) => {
  
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    alert("Copied to clipboard!"); 
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/50 p-5 transition-all hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-900/20">
      
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-slate-100">{title}</h3>
          <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">
            {language}
          </span>
        </div>
        
        <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <button 
            onClick={handleCopy}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
            title="Copy Code"
          >
            <Copy size={16} />
          </button>
          <button 
            onClick={onDelete}
            className="rounded-lg p-2 text-slate-400 hover:bg-red-900/30 hover:text-red-400"
            title="Delete Snippet"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="mb-4 overflow-hidden rounded-lg bg-slate-950 p-3">
        <pre className="font-mono text-xs text-slate-300 overflow-x-auto">
          <code>{code}</code>
        </pre>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span 
            key={index} 
            className="rounded-md bg-slate-800 px-2 py-1 text-[10px] text-slate-400"
          >
            #{tag}
          </span>
        ))}
      </div>

    </div>
  );
};

export default SnippetCard;