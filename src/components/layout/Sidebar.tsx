
import { Home, History, Library, Bell, Settings, Music2, Text } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../ui/Logo";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Music2, label: "Remix Audio", path: "/remix-audio" },
    { icon: Text, label: "Text to Remix", path: "/text-to-remix" },
    { icon: History, label: "Remix History", path: "/history" },
    { icon: Library, label: "My Library", path: "/library" },
    { icon: Bell, label: "Notifications", path: "/notifications" },
    { icon: Settings, label: "Settings", path: "/settings" }
  ];

  return (
    <div className="w-[220px] h-screen bg-sidebar fixed left-0 top-0 flex flex-col border-r border-gray-800 z-10">
      <div className="p-6">
        <Logo />
      </div>

      <nav className="flex-1 px-4 py-2">
        <ul className="space-y-1">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-[#41FDFE]/10 text-[#41FDFE]"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-[#41FDFE]/10 p-4 rounded-lg border border-[#41FDFE]/20">
          <h4 className="text-sm font-medium text-[#41FDFE] mb-1">Go Premium & Remix Like a Pro!</h4>
          <p className="text-xs text-gray-300 mb-3">
            Get unlimited AI-powered remixes with high-quality EDM effects & exclusive sound packs!
          </p>
          <button className="bg-black text-[#41FDFE] w-full py-2 rounded text-sm hover:bg-gray-900 transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
