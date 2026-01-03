import { createFileRoute } from "@tanstack/react-router";
import { Search, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import { ItemResult, type Item } from "@/components/ItemResult";
import itemsData from "@/data/arc_raiders_items.json";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const [search, setSearch] = useState("");

  // Instant search using useMemo for performance
  const searchResults = useMemo(() => {
    if (!search.trim()) return [];

    const searchTerm = search.toLowerCase().trim();
    const items = itemsData.items as Item[];

    return items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
  }, [search]);

  return (
    <div className="relative min-h-screen bg-[#0a0e1a]">
      {/* Fixed background elements */}
      <div className="fixed left-0 top-0 bottom-0 w-3 bg-gradient-to-b from-[#00d4ff] via-[#00ff88] via-[#ffeb3b] via-[#ff6b35] to-[#ff1744] opacity-100 z-30"></div>

      {/* Starfield background */}
      <div
        className="fixed inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(2px 2px at 20% 30%, white, transparent),
                         radial-gradient(2px 2px at 60% 70%, white, transparent),
                         radial-gradient(1px 1px at 50% 50%, white, transparent),
                         radial-gradient(1px 1px at 80% 10%, white, transparent),
                         radial-gradient(2px 2px at 90% 60%, white, transparent),
                         radial-gradient(1px 1px at 33% 80%, white, transparent),
                         radial-gradient(1px 1px at 15% 90%, white, transparent)`,
          backgroundSize: "200% 200%",
          backgroundPosition: "0% 0%",
        }}
      ></div>

      {/* Scanline effect */}
      <div className="pointer-events-none fixed inset-0 z-10 bg-[linear-gradient(0deg,transparent_0%,rgba(139,92,246,0.02)_2%,transparent_4%)] bg-[length:100%_4px] animate-[scanline_8s_linear_infinite]"></div>

      {/* Vignette */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,14,26,0.9)_100%)]"></div>

      {/* Glowing orbs - purple and orange */}
      <div className="fixed top-20 right-1/4 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[150px] animate-pulse"></div>
      <div className="fixed bottom-20 left-1/3 w-[500px] h-[500px] bg-orange-500/15 rounded-full blur-[140px] animate-pulse [animation-delay:2s]"></div>
      <div className="fixed top-1/2 left-1/2 w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-[130px] animate-pulse [animation-delay:4s]"></div>

      {/* Corner accents - rainbow themed */}
      <div className="fixed top-0 left-3 w-24 h-24 border-l-2 border-t-2 border-cyan-400/40 z-20"></div>
      <div className="fixed top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-purple-400/40 z-20"></div>
      <div className="fixed bottom-0 left-3 w-24 h-24 border-l-2 border-b-2 border-orange-400/40 z-20"></div>
      <div className="fixed bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-pink-400/40 z-20"></div>

      {/* Status bar - fixed */}
      <div className="fixed top-8 left-12 z-30 flex items-center gap-2 text-xs font-bold text-cyan-300/70 tracking-wider uppercase">
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
        <span>SYSTEM ONLINE</span>
      </div>

      {/* Warning indicator - fixed */}
      <div className="fixed top-8 right-8 z-30 flex items-center gap-2 text-xs font-bold text-orange-400/70 tracking-wider uppercase">
        <AlertTriangle className="w-4 h-4" />
        <span>INVENTORY CHECK</span>
      </div>

      <div className="relative z-20 flex flex-col items-center px-6 pt-16 pb-16">

        {/* Main content */}
        <div className="w-full max-w-4xl space-y-10 pb-16">
          {/* Title */}
          <div className="text-center space-y-6">
            <div className="inline-block">
              <h1 className="text-8xl md:text-9xl font-black tracking-tight text-white relative" style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontWeight: 900 }}>
                <span className="relative text-[#e8e6e3]">ARC</span>
              </h1>
              <h1 className="text-8xl md:text-9xl font-black tracking-tight text-white relative -mt-4" style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontWeight: 900 }}>
                <span className="relative text-[#e8e6e3]">Raiders</span>
              </h1>
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-[0.15em] text-purple-300/90 uppercase">INVENTORY DATABASE</h2>
          </div>

          {/* Search interface */}
          <div className="relative group">
            {/* Glowing border effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-orange-500 rounded-lg opacity-25 blur-xl group-hover:opacity-40 transition duration-500"></div>

            <div className="relative bg-[#0a0e1a]/90 backdrop-blur-sm border-2 border-purple-500/20 rounded-lg p-8 shadow-[0_0_50px_rgba(139,92,246,0.15)]">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
                  <span className="text-xs font-black text-purple-300/70 tracking-[0.2em] uppercase">ITEM LOOKUP</span>
                </div>
                <div className="text-xs font-bold text-gray-600">v1.0.0</div>
              </div>

              {/* Search input */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-cyan-400/60 pointer-events-none" />
                <Input
                  type="text"
                  placeholder="Enter item name..."
                  className="h-16 pl-14 pr-6 bg-[#0a0e1a]/70 border-2 border-purple-400/20 text-white text-lg font-bold placeholder:text-gray-600 placeholder:font-medium focus-visible:border-purple-400/50 focus-visible:ring-purple-400/20 focus-visible:ring-4 focus-visible:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all duration-300"
                  style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {/* Input accent lines - rainbow themed */}
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-12 bg-gradient-to-b from-cyan-400 via-purple-400 to-orange-400 opacity-60"></div>
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-12 bg-gradient-to-b from-orange-400 via-purple-400 to-cyan-400 opacity-60"></div>
              </div>

              {/* Footer info */}
              <div className="mt-6 flex items-center justify-between text-xs font-bold text-gray-600 uppercase tracking-wider">
                <span>TYPE TO SEARCH DATABASE</span>
              </div>
            </div>

            {search && (
              <div className="mt-5 space-y-4">
                {searchResults.length > 0 ? (
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
                      <span className="text-sm font-black text-purple-300/70 uppercase tracking-wider">
                        {searchResults.length} Result{searchResults.length !== 1 ? "s" : ""} Found
                      </span>
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
                    </div>
                    <div className="space-y-4">
                      {searchResults.map((item, index) => (
                        <ItemResult key={`${item.name}-${index}`} item={item} />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-sm text-gray-500 font-bold tracking-wide">
                      No results found for "{search}"
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Help text */}
          <div className="text-center space-y-3">
            <p className="text-sm text-gray-500 font-bold tracking-wide">Identify items • Check crafting requirements • Verify discard safety</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-xs font-bold text-gray-700 space-y-1 uppercase tracking-wider text-center">
          <p>
            Made with ♥︎ by <a href="https://jtlee.dev" target="_blank">jtljrdn</a>
          </p>
          <p>
            Data from <a href="https://ko-fi.com/prodeed" target="_blank" >pRoDeeD</a>'s Master Cheat Sheet v4.0 12-28-2025
          </p>
        </div>
      </div>

      <style>{`
        @keyframes scanline {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 100%;
          }
        }
      `}</style>
    </div>
  );
}
