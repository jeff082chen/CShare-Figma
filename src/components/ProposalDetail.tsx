import { ArrowLeft, MessageSquare, Share2, MapPin, Users } from 'lucide-react';
import { Button } from './ui/button';
import type { Screen, Proposal } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProposalDetailProps {
  navigate: (screen: Screen, proposal?: Proposal) => void;
  proposal: Proposal | null;
}

export function ProposalDetail({ navigate, proposal }: ProposalDetailProps) {
  if (!proposal) return null;

  const pricePerPerson = (proposal.price / proposal.maxParticipants).toFixed(2);
  const spotsLeft = proposal.maxParticipants - proposal.participants;

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-3">
        <button onClick={() => navigate('home')}>
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className="text-gray-900">Proposal Details</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Item Image */}
        <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
          <ImageWithFallback 
            src="placeholder"
            alt={proposal.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Title & Price */}
          <div>
            <h2 className="text-gray-900 mb-2">{proposal.name}</h2>
            <div className="flex items-baseline gap-2">
              <span className="text-gray-900">${pricePerPerson}</span>
              <span className="text-gray-500">per person</span>
              <span className="text-gray-400">・</span>
              <span className="text-gray-500">${proposal.price} total</span>
            </div>
          </div>

          {/* Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700">{proposal.participants} / {proposal.maxParticipants} participants joined</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gray-900"
                style={{ width: `${(proposal.participants / proposal.maxParticipants) * 100}%` }}
              />
            </div>
            <span className="text-gray-500 mt-1 block">{spotsLeft} spots remaining</span>
          </div>

          {/* Participants */}
          <div>
            <h3 className="text-gray-900 mb-3">Participants</h3>
            <div className="flex gap-2">
              {Array.from({ length: proposal.participants }).map((_, i) => (
                <div key={i} className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-white">
                  {i === 0 ? 'C' : i + 1}
                </div>
              ))}
              {Array.from({ length: spotsLeft }).map((_, i) => (
                <div key={`empty-${i}`} className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <Users className="w-5 h-5 text-gray-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={() => navigate('join', proposal)}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6"
            >
              Join This Purchase
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={() => navigate('chat', proposal)}
                variant="outline"
                className="py-6"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Message Creator
              </Button>
              <Button 
                variant="outline"
                className="py-6"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600">
              {proposal.description || 'No description provided.'}
            </p>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-gray-900 mb-2">Location</h3>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>{proposal.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
