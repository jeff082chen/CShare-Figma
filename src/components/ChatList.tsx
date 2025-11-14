import { MessageSquare } from 'lucide-react';
import { NavigationBar } from './NavigationBar';
import type { Screen, Proposal } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ChatListProps {
  navigate: (screen: Screen, proposal?: Proposal) => void;
}

type ChatPreview = Proposal & {
  lastMessage: string;
  lastActive: string;
  unreadCount?: number;
};

const mockChats: ChatPreview[] = [
  {
    id: '1',
    name: 'Portable Projector',
    price: 180,
    participants: 4,
    maxParticipants: 5,
    location: 'The House',
    description: 'Easy to carry for movie nights or group presentations',
    image: 'placeholder',
    lastMessage: 'Let’s meet Friday night to grab it together.',
    lastActive: '2m ago',
    unreadCount: 2,
  },
  {
    id: '2',
    name: 'Air Fryer',
    price: 80,
    participants: 3,
    maxParticipants: 3,
    location: 'The House',
    description: 'Perfect for late night cooking',
    image: 'placeholder',
    lastMessage: 'I can pay everyone back via Venmo later today.',
    lastActive: '1h ago',
  },
  {
    id: '3',
    name: 'Vacuum Cleaner',
    price: 150,
    participants: 2,
    maxParticipants: 5,
    location: 'The House',
    description: 'Keep our living spaces clean',
    image: 'placeholder',
    lastMessage: 'Any preference on the brand before I order?',
    lastActive: 'Yesterday',
  },
];

export function ChatList({ navigate }: ChatListProps) {
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-6 py-4 border-b border-gray-200">
        <h1 className="text-gray-900">Messages</h1>
        <p className="text-gray-500 text-sm mt-1">
          Continue coordinating your shared purchases.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto pb-16">
        <div className="px-6 py-4 space-y-4">
          {mockChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => navigate('chat', chat)}
              className="w-full text-left border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors"
            >
              <div className="flex gap-4 items-center">
                <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <ImageWithFallback
                    src={chat.image || 'placeholder'}
                    alt={chat.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <MessageSquare className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900 font-medium truncate">{chat.name}</p>
                  </div>
                  <p className="text-gray-600 text-sm truncate">{chat.lastMessage}</p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-gray-400">{chat.lastActive}</p>
                  {chat.unreadCount ? (
                    <span className="inline-flex items-center justify-center mt-2 bg-gray-900 text-white text-xs px-2 py-1 rounded-full min-w-[2rem]">
                      {chat.unreadCount}
                    </span>
                  ) : null}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <NavigationBar navigate={navigate} active="chat-list" />
    </div>
  );
}
