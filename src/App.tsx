import { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { CreateProposal } from './components/CreateProposal';
import { ProposalDetail } from './components/ProposalDetail';
import { DiscoverScreen } from './components/DiscoverScreen';
import { JoinConfirmation } from './components/JoinConfirmation';
import { GroupChat } from './components/GroupChat';
import { PurchaseComplete } from './components/PurchaseComplete';
import { SharedItemOverview } from './components/SharedItemOverview';
import { ProfileScreen } from './components/ProfileScreen';
import { ChatList } from './components/ChatList';

export type Screen = 
  | 'home' 
  | 'create' 
  | 'proposal' 
  | 'discover' 
  | 'join' 
  | 'chat-list'
  | 'chat' 
  | 'complete' 
  | 'shared-item' 
  | 'profile';

export interface Proposal {
  id: string;
  name: string;
  price: number;
  participants: number;
  maxParticipants: number;
  location: string;
  description: string;
  image?: string;
}

export interface ProposalInput {
  name: string;
  price: number;
  maxParticipants: number;
  description: string;
  location: string;
}

const initialProposals: Proposal[] = [
  {
    id: '1',
    name: 'Portable Projector',
    price: 180,
    participants: 2,
    maxParticipants: 5,
    location: 'The House',
    description: 'Easy to carry for movie nights or group presentations',
    image: 'placeholder'
  },
  {
    id: '2',
    name: 'Air Fryer',
    price: 80,
    participants: 1,
    maxParticipants: 3,
    location: 'The House',
    description: 'Perfect for late night cooking',
    image: 'placeholder'
  },
  {
    id: '3',
    name: 'Vacuum Cleaner',
    price: 150,
    participants: 3,
    maxParticipants: 5,
    location: 'The House',
    description: 'Keep our living spaces clean',
    image: 'placeholder'
  },
  {
    id: '4',
    name: 'Blender',
    price: 60,
    participants: 1,
    maxParticipants: 3,
    location: 'The House',
    description: 'Perfect for smoothies',
    image: 'placeholder'
  },
  {
    id: '5',
    name: 'Gaming Console',
    price: 400,
    participants: 2,
    maxParticipants: 5,
    location: 'The House',
    description: 'Share the latest console',
    image: 'placeholder'
  },
  {
    id: '6',
    name: 'Printer',
    price: 200,
    participants: 3,
    maxParticipants: 6,
    location: 'The House',
    description: 'Shared printing solution',
    image: 'placeholder'
  },
  {
    id: '7',
    name: 'Coffee Maker',
    price: 90,
    participants: 2,
    maxParticipants: 4,
    location: 'The House',
    description: 'Morning coffee for all',
    image: 'placeholder'
  }
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [proposals, setProposals] = useState<Proposal[]>(initialProposals);

  const navigate = (screen: Screen, proposal?: Proposal) => {
    setCurrentScreen(screen);
    setSelectedProposal(proposal ?? null);
  };

  const handleCreateProposal = (proposalFields: ProposalInput) => {
    const newProposal: Proposal = {
      id: `${Date.now()}`,
      name: proposalFields.name,
      price: proposalFields.price,
      participants: 1,
      maxParticipants: proposalFields.maxParticipants,
      location: proposalFields.location,
      description: proposalFields.description,
      image: 'placeholder'
    };
    setProposals((prev) => [...prev, newProposal]);
    navigate('home');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md h-[812px] bg-white shadow-xl overflow-hidden relative">
        {currentScreen === 'home' && <HomeScreen navigate={navigate} proposals={proposals} />}
        {currentScreen === 'create' && (
          <CreateProposal 
            navigate={navigate} 
            onCreateProposal={handleCreateProposal}
          />
        )}
        {currentScreen === 'proposal' && <ProposalDetail navigate={navigate} proposal={selectedProposal} />}
        {currentScreen === 'discover' && <DiscoverScreen navigate={navigate} proposals={proposals} />}
        {currentScreen === 'join' && <JoinConfirmation navigate={navigate} proposal={selectedProposal} />}
        {currentScreen === 'chat-list' && <ChatList navigate={navigate} />}
        {currentScreen === 'chat' && selectedProposal && (
          <GroupChat navigate={navigate} proposal={selectedProposal} />
        )}
        {currentScreen === 'complete' && <PurchaseComplete navigate={navigate} proposal={selectedProposal} />}
        {currentScreen === 'shared-item' && <SharedItemOverview navigate={navigate} proposal={selectedProposal} />}
        {currentScreen === 'profile' && <ProfileScreen navigate={navigate} />}
      </div>
    </div>
  );
}
