
import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, User, Menu } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import AIChatAssistant from './AIChatAssistant';

const SidebarItem: React.FC<{ item: any; isOpenByDefault?: boolean }> = ({ item, isOpenByDefault = false }) => {
  const [isOpen, setIsOpen] = useState(isOpenByDefault);
  const location = useLocation();

  const hasChildren = item.children && item.children.length > 0;
  const isActive = location.pathname === item.path || (item.children && item.children.some((c: any) => c.path === location.pathname));

  if (!hasChildren) {
    return (
      <Link
        to={item.path}
        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
          location.pathname === item.path ? 'bg-orange-100 text-orange-600 font-bold' : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        {item.icon}
        <span className="text-sm">{item.title}</span>
      </Link>
    );
  }

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
          isActive ? 'text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <div className="flex items-center space-x-3">
          {item.icon}
          <span className="text-sm">{item.title}</span>
        </div>
        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>
      {isOpen && (
        <div className="pl-11 space-y-1">
          {item.children.map((child: any) => (
            <Link
              key={child.path}
              to={child.path}
              className={`block px-4 py-2 text-sm rounded-lg transition-colors ${
                location.pathname === child.path ? 'text-orange-600 bg-orange-50 font-medium' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {child.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        <div className="p-4 flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">蘭</div>
          {sidebarOpen && <span className="text-lg font-bold text-gray-800">蘭光租賃</span>}
        </div>
        
        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-2">
          {NAV_ITEMS.map((item, idx) => (
            <SidebarItem key={idx} item={item} isOpenByDefault={idx === 0} />
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center space-x-3 p-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <User size={16} />
            </div>
            {sidebarOpen && (
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium truncate">管理員 Admin</p>
                <button className="text-xs text-red-500 hover:underline">登出系統</button>
              </div>
            )}
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-md">
            <Menu size={20} />
          </button>
          <div className="flex items-center space-x-4">
             <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">版本: 1.0.4 (蘭光租賃)</div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>

        <AIChatAssistant />
      </main>
    </div>
  );
};

export default DashboardLayout;
