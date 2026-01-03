import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

export interface Item {
  name: string;
  sellPrice: number;
  recyclingValue: number;
  safeToDiscard: boolean;
  usedFor: {
    components: string[];
    upgrades: string[];
    expeditions: string[];
  };
  rarity: string;
  category: string;
}

interface ItemResultProps {
  item: Item;
}

export function ItemResult({ item }: ItemResultProps) {
  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case "common":
        return "text-gray-400 border-gray-600/30";
      case "uncommon":
        return "text-green-400 border-green-600/30";
      case "rare":
        return "text-cyan-400 border-cyan-600/30";
      case "epic":
        return "text-purple-400 border-purple-600/30";
      case "legendary":
        return "text-orange-400 border-orange-600/30";
      default:
        return "text-gray-400 border-gray-600/30";
    }
  };

  const getSafetyStatus = () => {
    if (item.safeToDiscard) {
      return {
        icon: <CheckCircle2 className="w-5 h-5" />,
        color: "text-cyan-400 border-cyan-400/30 bg-cyan-400/5",
        text: "SAFE TO DISCARD",
      };
    }

    const hasUses =
      item.usedFor.components.length > 0 ||
      item.usedFor.upgrades.length > 0 ||
      item.usedFor.expeditions.length > 0;

    if (hasUses) {
      return {
        icon: <AlertTriangle className="w-5 h-5" />,
        color: "text-orange-400 border-orange-400/30 bg-orange-400/5",
        text: "KEEP - HAS USES",
      };
    }

    return {
      icon: <XCircle className="w-5 h-5" />,
      color: "text-red-400 border-red-400/30 bg-red-400/5",
      text: "DO NOT DISCARD",
    };
  };

  const safetyStatus = getSafetyStatus();
  const rarityColor = getRarityColor(item.rarity);

  return (
    <div className="group relative">
      {/* Glowing border effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 via-cyan-400/20 to-orange-500/20 rounded-lg opacity-0 blur-lg group-hover:opacity-100 transition duration-300"></div>

      <div className="relative bg-[#0a0e1a]/95 backdrop-blur-sm border-2 border-purple-500/10 rounded-lg p-6 hover:border-purple-500/30 transition-all duration-300">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <h3
              className={`text-xl font-black tracking-tight ${rarityColor.split(" ")[0]} mb-1`}
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              {item.name}
            </h3>
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider">
              <span className={`${rarityColor.split(" ")[0]}`}>
                {item.rarity}
              </span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-500">{item.category}</span>
            </div>
          </div>

          {/* Safety badge */}
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-md border ${safetyStatus.color} text-xs font-black uppercase tracking-wider whitespace-nowrap`}
          >
            {safetyStatus.icon}
            <span>{safetyStatus.text}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-purple-500/10">
          <div>
            <div className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
              Sell Price
            </div>
            <div className="text-lg font-black text-purple-300">
              {item.sellPrice.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
              Recycling Value
            </div>
            <div className="text-lg font-black text-cyan-300">
              {item.recyclingValue}
            </div>
          </div>
        </div>

        {/* Used For Section */}
        <div className="space-y-3">
          {item.usedFor.components.length > 0 && (
            <div>
              <div className="text-xs font-black text-cyan-400/70 uppercase tracking-wider mb-2">
                Components
              </div>
              <div className="flex flex-wrap gap-2">
                {item.usedFor.components.map((component, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-cyan-400/10 border border-cyan-400/20 rounded text-xs font-bold text-cyan-300 uppercase tracking-wider"
                  >
                    {component}
                  </span>
                ))}
              </div>
            </div>
          )}

          {item.usedFor.upgrades.length > 0 && (
            <div>
              <div className="text-xs font-black text-purple-400/70 uppercase tracking-wider mb-2">
                Upgrades
              </div>
              <div className="flex flex-wrap gap-2">
                {item.usedFor.upgrades.map((upgrade, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-purple-400/10 border border-purple-400/20 rounded text-xs font-bold text-purple-300 uppercase tracking-wider"
                  >
                    {upgrade}
                  </span>
                ))}
              </div>
            </div>
          )}

          {item.usedFor.expeditions.length > 0 && (
            <div>
              <div className="text-xs font-black text-orange-400/70 uppercase tracking-wider mb-2">
                Expeditions
              </div>
              <div className="flex flex-wrap gap-2">
                {item.usedFor.expeditions.map((expedition, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-orange-400/10 border border-orange-400/20 rounded text-xs font-bold text-orange-300 uppercase tracking-wider"
                  >
                    {expedition}
                  </span>
                ))}
              </div>
            </div>
          )}

          {item.usedFor.components.length === 0 &&
            item.usedFor.upgrades.length === 0 &&
            item.usedFor.expeditions.length === 0 && (
              <div className="text-sm text-gray-600 font-medium italic">
                No specific uses documented
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
