import { Home, Search, MessageSquare, User } from 'lucide-react';
import type { Screen } from '../App';

interface NavigationBarProps {
  navigate: (screen: Screen) => void;
  active: Screen;
}

export function NavigationBar({ navigate, active }: NavigationBarProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around">
      <button 
        onClick={() => navigate('home')}
        className={`flex flex-col items-center gap-1 ${active === 'home' ? 'text-gray-900' : 'text-gray-400'}`}
      >
        <Home className="w-6 h-6" />
        <span className="text-xs">Home</span>
      </button>
      <button 
        onClick={() => navigate('discover')}
        className={`flex flex-col items-center gap-1 ${active === 'discover' ? 'text-gray-900' : 'text-gray-400'}`}
      >
        <Search className="w-6 h-6" />
        <span className="text-xs">Discover</span>
      </button>
      <button 
        onClick={() => navigate('chat-list')}
        className={`flex flex-col items-center gap-1 ${active === 'chat-list' ? 'text-gray-900' : 'text-gray-400'}`}
      >
        <MessageSquare className="w-6 h-6" />
        <span className="text-xs">Messages</span>
      </button>
      <button 
        onClick={() => navigate('profile')}
        className={`flex flex-col items-center gap-1 ${active === 'profile' ? 'text-gray-900' : 'text-gray-400'}`}
      >
        <User className="w-6 h-6" />
        <span className="text-xs">Profile</span>
      </button>
    </div>
  );
}
