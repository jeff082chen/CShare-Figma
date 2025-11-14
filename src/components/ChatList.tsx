import { MessageSquare } from 'lucide-react';
import { NavigationBar } from './NavigationBar';
import type { Screen } from '../App';
import type { Proposal } from '../types/proposal';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ChatListProps {
  navigate: (screen: Screen, proposal?: Proposal) => void;
  proposals: Proposal[];
}

export function ChatList({ navigate, proposals }: ChatListProps) {
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
          {proposals.length === 0 ? (
            <p className="text-gray-500 text-sm">
              Join or create a shared purchase to start chatting with your group.
            </p>
          ) : (
            proposals.map((proposal) => (
              <button
                key={proposal.id}
                onClick={() => navigate('chat', proposal)}
                className="w-full text-left border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors"
              >
                <div className="flex gap-4 items-center">
                  <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    <ImageWithFallback
                      src={proposal.image || 'placeholder'}
                      alt={proposal.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquare className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-900 font-medium truncate">{proposal.name}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {proposal.participantCodes.length}/{proposal.maxParticipants} joined
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{proposal.location}</p>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      <NavigationBar navigate={navigate} active="chat-list" />
    </div>
  );
}
