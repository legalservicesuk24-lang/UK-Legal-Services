export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 bg-blue-600/20 text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V10m0 0V5" />
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Bench Strength
        </h1>
        
        <p className="text-slate-400 text-lg">
          We are currently enhancing our digital platform. Something great is under construction and launching soon.
        </p>

        <div className="inline-block px-4 py-2 bg-slate-800 rounded-full text-sm font-medium text-slate-300 border border-slate-700">
          🚧 Under Construction
        </div>
      </div>
    </main>
  );
}