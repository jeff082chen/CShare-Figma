import { ArrowLeft, MessageSquare, FileText } from 'lucide-react';
import { Button } from './ui/button';
import type { Screen } from '../App';
import type { Proposal } from '../types/proposal';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SharedItemOverviewProps {
  navigate: (screen: Screen, proposal?: Proposal) => void;
  proposal: Proposal | null;
}

export function SharedItemOverview({ navigate, proposal }: SharedItemOverviewProps) {
  if (!proposal) return null;

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-3">
        <button onClick={() => navigate('home')}>
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className="text-gray-900">Shared Item</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Item Image */}
        <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
          <ImageWithFallback 
            src={proposal.image || 'placeholder'}
            alt={proposal.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Title */}
          <div>
            <h2 className="text-gray-900">Shared Item: {proposal.name}</h2>
          </div>

          {/* Participants */}
          <div>
            <h3 className="text-gray-900 mb-3">Co-Owners</h3>
            <div className="flex gap-3 flex-wrap">
              {proposal.participantCodes.map((code) => {
                const isYou = code.startsWith('Y');
                return (
                  <div key={code} className="flex flex-col items-center gap-2">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-sm ${
                      isYou ? 'bg-gray-900' : 'bg-gray-500'
                    }`}>
                      {code}
                    </div>
                    <span className="text-gray-600 text-sm">
                      {isYou ? 'You' : `Member ${code}`}
                    </span>
                  </div>
                );
              })}
              {Array.from({ length: proposal.maxParticipants - proposal.participantCodes.length }).map((_, i) => (
                <div key={`empty-${i}`} className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                    +
                  </div>
                  <span className="text-gray-500 text-sm">Open spot</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-gray-900 mb-3">Quick Actions</h3>
            <div className="space-y-3">
              <Button 
                onClick={() => navigate('chat', proposal)}
                variant="outline"
                className="w-full justify-start py-6"
              >
                <MessageSquare className="w-5 h-5 mr-3" />
                Open Group Chat
              </Button>
              
              <Button 
                variant="outline"
                className="w-full justify-start py-6"
              >
                <FileText className="w-5 h-5 mr-3" />
                View Agreement / Notes
              </Button>
            </div>
          </div>

          {/* Info Section */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <h3 className="text-blue-900 mb-2">Shared Ownership</h3>
            <p className="text-blue-800 mb-3">
              This is a shared ownership item. Coordinate usage timing in chat.
            </p>
            <p className="text-blue-700 text-sm">
              💡 Tip: Consider weekly rotation or on-demand checkout system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
