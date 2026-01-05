import Navbar from './components/Navbar';
import SnippetCard from './components/SnippetCard';

function App() {
  
  const snippets = [
    {
      id: 1,
      title: "React UseEffect Hook",
      language: "javascript",
      code: "useEffect(() => {\n  console.log('Mounted');\n  return () => console.log('Unmounted');\n}, []);",
      tags: ["react", "hooks", "lifecycle"]
    },
    {
      id: 2,
      title: "Python File Read",
      language: "python",
      code: "with open('file.txt', 'r') as f:\n    content = f.read()",
      tags: ["python", "files", "io"]
    },
    {
      id: 3,
      title: "Center Div CSS",
      language: "css",
      code: "div {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}",
      tags: ["css", "layout", "flexbox"]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-blue-500/30">
      <Navbar />

      <main className="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
        
        {/* GRID LAYOUT */}
        {/* grid-cols-1 on mobile, grid-cols-2 on tablet, grid-cols-3 on laptop */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          
          {snippets.map((snippet) => (
            <SnippetCard 
              key={snippet.id}
              title={snippet.title}
              language={snippet.language}
              code={snippet.code}
              tags={snippet.tags}
              onDelete={() => alert("Delete clicked!")}
            />
          ))}

        </div>
      </main>
    </div>
  )
}

export default App