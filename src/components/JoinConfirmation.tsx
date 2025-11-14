import { Button } from './ui/button';
import type { Screen, Proposal } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface JoinConfirmationProps {
  navigate: (screen: Screen, proposal?: Proposal) => void;
  proposal: Proposal | null;
}

export function JoinConfirmation({ navigate, proposal }: JoinConfirmationProps) {
  if (!proposal) return null;

  const pricePerPerson = (proposal.price / proposal.maxParticipants).toFixed(2);

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Item Image */}
        <div className="w-40 h-40 bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
          <ImageWithFallback 
            src="placeholder"
            alt={proposal.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Item Name */}
        <h2 className="text-gray-900 mb-2 text-center">{proposal.name}</h2>

        {/* Confirmation Message */}
        <p className="text-gray-600 mb-6 text-center">
          You will join this shared purchase.
        </p>

        {/* Details */}
        <div className="w-full max-w-sm space-y-3 mb-8">
          <div className="flex justify-between py-3 border-b border-gray-200">
            <span className="text-gray-600">Price per person</span>
            <span className="text-gray-900">${pricePerPerson}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-gray-200">
            <span className="text-gray-600">Required participants</span>
            <span className="text-gray-900">{proposal.maxParticipants} people</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-sm space-y-3">
          <Button 
            onClick={() => navigate('complete', proposal)}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6"
          >
            Confirm Join
          </Button>
          
          <Button 
            onClick={() => navigate('proposal', proposal)}
            variant="outline"
            className="w-full py-6"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
