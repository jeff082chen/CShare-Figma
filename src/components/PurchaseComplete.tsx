import { CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import type { Screen } from '../App';
import type { Proposal } from '../types/proposal';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PurchaseCompleteProps {
  navigate: (screen: Screen, proposal?: Proposal) => void;
  proposal: Proposal | null;
}

export function PurchaseComplete({ navigate, proposal }: PurchaseCompleteProps) {
  if (!proposal) return null;

  const pricePerPerson = (proposal.price / proposal.maxParticipants).toFixed(2);

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Success Icon */}
        <CheckCircle className="w-20 h-20 text-green-600 mb-6" />

        {/* Status Message */}
        <h2 className="text-gray-900 mb-2 text-center">Group Completed — Ready to Purchase</h2>
        <p className="text-gray-600 mb-8 text-center">
          All participants have joined! You can now proceed with the purchase.
        </p>

        {/* Item Details */}
        <div className="w-full max-w-sm mb-6">
          <div className="flex gap-4 p-4 border border-gray-200 rounded-lg">
            <div className="w-20 h-20 bg-gray-100 rounded flex-shrink-0">
              <ImageWithFallback 
                src={proposal.image || 'placeholder'}
                alt={proposal.name}
                className="w-full h-full object-cover rounded"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 mb-1">{proposal.name}</h3>
              <p className="text-gray-600">${pricePerPerson} per person</p>
            </div>
          </div>
        </div>

        {/* Participants */}
        <div className="w-full max-w-sm mb-8">
          <h3 className="text-gray-900 mb-3">Participants</h3>
          <div className="flex gap-2 flex-wrap justify-center">
            {proposal.participantCodes.map((code) => (
              <div 
                key={code} 
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-sm ${
                  code.startsWith('Y') ? 'bg-gray-900' : 'bg-gray-500'
                }`}
              >
                {code}
              </div>
            ))}
            {Array.from({ length: proposal.maxParticipants - proposal.participantCodes.length }).map((_, i) => (
              <div 
                key={`empty-${i}`} 
                className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400"
              >
                +
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-sm space-y-3">
          <Button 
            onClick={() => navigate('shared-item', proposal)}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6"
          >
            Proceed to Purchase (via your group)
          </Button>
          
          <p className="text-gray-500 text-center text-sm">
            Payments will be coordinated through chat.
          </p>

          <Button 
            onClick={() => navigate('chat', proposal)}
            variant="outline"
            className="w-full py-6"
          >
            Open Group Chat
          </Button>
        </div>
      </div>
    </div>
  );
}
