import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import { LayoutDashboard, ClipboardPlus , Layers, BookUser , Calendar, LifeBuoy, Settings,PawPrint  } from "lucide-react";
import logo from "../../assets/logo.png";
import profile from "../../assets/profile.png";
import { createContext, useContext, useState, ReactNode, FC } from "react";
import { Link } from "react-router-dom";

// Define context type
type SidebarContextType = {
    expanded: boolean;
};

// Define Sidebar item props type
interface SidebarItemProps {
    icon: ReactNode;
    text: string;
    active?: boolean;
    alert?: boolean;
    to: string;
}

const SidebarContext = createContext<SidebarContextType>({ expanded: true });

const Sidebar: FC = () => {
    const [expanded, setExpanded] = useState<boolean>(true);

    return (
        <SidebarContext.Provider value={{ expanded }}>
            <aside className="h-screen">
                <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                    <div className="p-4 pb-2 flex justify-between items-center">
                        <img src={logo} className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`} alt="Logo" />
                        <button onClick={() => setExpanded((curr) => !curr)} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
                            {expanded ? <ChevronFirst /> : <ChevronLast />}
                        </button>
                    </div>

                    <ul className="flex-1 px-3">
                        <SidebarItem icon={<PawPrint size={20} />} text="Animal" to="/" />
                        <SidebarItem icon={<LayoutDashboard size={20} />} text="Habitat" to="/habitat" />
                        <SidebarItem icon={<ClipboardPlus  size={20} />} text="Report" to="/report" />
                        <SidebarItem icon={<Calendar size={20} />} text="Calendar" to="/calendar" />
                        <SidebarItem icon={<Layers size={20} />} text="Event" to="/event" />
                        <SidebarItem icon={<BookUser  size={20} />} text="Work" to="/work" />
                        <hr className="my-3" />
                        <SidebarItem icon={<Settings size={20} />} text="Settings" to="/settings" />
                        <SidebarItem icon={<LifeBuoy size={20} />} text="Help" to="/help" />
                    </ul>

                    <div className="border-t flex p-3">
                        <img src={profile} className="w-10 h-10 rounded-md" alt="Profile" />
                        <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
                            <div className="leading-4">
                                <h4 className="font-semibold">constGenius</h4>
                                <span className="text-xs text-gray-600">constgenius@gmail.com</span>
                            </div>
                            <MoreVertical size={20} />
                        </div>
                    </div>
                </nav>
            </aside>
        </SidebarContext.Provider>
    );
};

const SidebarItem: FC<SidebarItemProps> = ({ icon, text, active = false, alert = false, to }) => {
    const { expanded } = useContext(SidebarContext);

    return (
        <Link to={to}>
            <li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"}`}>
                {icon}
                <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
                {alert && (
                    <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}></div>
                )}
                {!expanded && (
                    <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                        {text}
                    </div>
                )}
            </li>
        </Link>
    );
};

export default Sidebar;
