import { Plus, MapPin, Users } from 'lucide-react';
import { Button } from './ui/button';
import { NavigationBar } from './NavigationBar';
import type { Screen } from '../App';
import type { Proposal } from '../types/proposal';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomeScreenProps {
  navigate: (screen: Screen, proposal?: Proposal) => void;
  createdProposals: Proposal[];
  joinedProposals: Proposal[];
}

export function HomeScreen({ navigate, createdProposals, joinedProposals }: HomeScreenProps) {
  const renderProposalList = (proposals: Proposal[], emptyState: string) => {
    if (proposals.length === 0) {
      return <p className="text-gray-500 text-sm">{emptyState}</p>;
    }

    return proposals.map((proposal) => (
      <div 
        key={proposal.id}
        onClick={() => navigate('proposal', proposal)}
        className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-gray-300 transition-colors"
      >
        <div className="flex gap-4">
          <div className="w-20 h-20 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">
            <ImageWithFallback 
              src={proposal.image || 'placeholder'} 
              alt={proposal.name}
              className="w-full h-full object-cover rounded"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-gray-900 mb-1">{proposal.name}</h3>
            
            <div className="flex items-center gap-1 text-gray-600 mb-2">
              <Users className="w-4 h-4" />
              <span className="text-sm">
                {proposal.participantCodes.length} of {proposal.maxParticipants} joined
              </span>
            </div>
            
            <div className="flex items-center gap-1 text-gray-500">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{proposal.location}</span>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h1 className="text-gray-900">Campus Shared Purchase</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-16">
        {/* CTA Button */}
        <div className="p-6">
          <Button 
            onClick={() => navigate('create')}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6"
          >
            <Plus className="w-5 h-5 mr-2" />
            Start a Shared Purchase
          </Button>
        </div>

        {/* Created Purchases */}
        <div className="px-6 pb-6">
          <h2 className="text-gray-900 mb-4">Created By You</h2>
          <div className="space-y-4">
            {renderProposalList(createdProposals, 'No proposals created yet. Start one above!')}
          </div>
        </div>

        {/* Joined Purchases */}
        <div className="px-6 pb-6 border-t border-gray-100">
          <h2 className="text-gray-900 mb-4">Joined Purchases</h2>
          <div className="space-y-4">
            {renderProposalList(joinedProposals, 'Join a shared purchase to see it here.')}
          </div>
        </div>
      </div>

      <NavigationBar navigate={navigate} active="home" />
    </div>
  );
}
