import { MapPin } from 'lucide-react';
import { NavigationBar } from './NavigationBar';
import { Button } from './ui/button';
import type { Screen } from '../App';
import type { Proposal } from '../types/proposal';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

interface DiscoverScreenProps {
  navigate: (screen: Screen, proposal?: Proposal) => void;
  proposals: Proposal[];
}

export function DiscoverScreen({ navigate, proposals }: DiscoverScreenProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Tools', 'Appliances', 'Electronics'];

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h1 className="text-gray-900">Discover</h1>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex gap-2 overflow-x-auto">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                activeFilter === filter
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Proposals List */}
      <div className="flex-1 overflow-y-auto pb-16">
        <div className="px-6 py-4 space-y-4">
          {proposals.map((proposal) => {
            const spotsLeft = proposal.maxParticipants - proposal.participantCodes.length;
            return (
              <div 
                key={proposal.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <div className="flex gap-4 p-4">
                  <div className="w-24 h-24 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">
                    <ImageWithFallback 
                      src={proposal.image || 'placeholder'}
                      alt={proposal.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h3 className="text-gray-900 mb-1">{proposal.name}</h3>
                      <p className="text-gray-600 mb-2">
                        {spotsLeft} {spotsLeft === 1 ? 'spot' : 'spots'} left
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-1 text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{proposal.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Button
                      onClick={() => navigate('proposal', proposal)}
                      variant="outline"
                      className="h-fit"
                    >
                      View
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <NavigationBar navigate={navigate} active="discover" />
    </div>
  );
}
