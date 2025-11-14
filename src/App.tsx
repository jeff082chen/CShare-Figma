import { useMemo, useState } from 'react';
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
import type { Proposal, ProposalInput } from './types/proposal';
import { PLACEHOLDER_IMAGE, initialCreatedProposals, initialDiscoverProposals, initialJoinedProposals } from './data/proposals';
import { CURRENT_USER_CODE } from './constants/user';

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

type ScreenHistoryEntry = {
  screen: Screen;
  proposal: Proposal | null;
};

const TRANSIENT_SCREENS: Screen[] = ['join', 'complete'];

export default function App() {
  const [history, setHistory] = useState<ScreenHistoryEntry[]>([
    { screen: 'home', proposal: null },
  ]);
  const [createdProposals, setCreatedProposals] = useState<Proposal[]>(initialCreatedProposals);
  const [joinedProposals, setJoinedProposals] = useState<Proposal[]>(initialJoinedProposals);
  const [discoverProposals, setDiscoverProposals] = useState<Proposal[]>(initialDiscoverProposals);

  const currentState = history[history.length - 1];
  const currentScreen = currentState.screen;
  const selectedProposal = currentState.proposal;

  const hasJoinedProposal = (proposal?: Proposal | null) => {
    if (!proposal) return false;
    return proposal.participantCodes.includes(CURRENT_USER_CODE);
  };

  const navigate = (screen: Screen, proposal?: Proposal, options?: { replace?: boolean }) => {
    if (screen === 'chat' && !hasJoinedProposal(proposal)) {
      return;
    }
    setHistory((prev) => {
      const nextEntry = { screen, proposal: proposal ?? null };

      if (options?.replace) {
        if (prev.length === 0) {
          return [nextEntry];
        }
        return [...prev.slice(0, -1), nextEntry];
      }

      const lastEntry = prev[prev.length - 1];
      const shouldDropLast =
        lastEntry && TRANSIENT_SCREENS.includes(lastEntry.screen) && lastEntry.screen !== screen;

      const trimmedHistory = shouldDropLast ? prev.slice(0, -1) : prev;
      return [...trimmedHistory, nextEntry];
    });
  };

  const goBack = () => {
    setHistory((prev) => {
      if (prev.length <= 1) {
        return prev;
      }
      return prev.slice(0, -1);
    });
  };

  const userProposals = useMemo(() => {
    const combined = [...createdProposals, ...joinedProposals];
    const uniqueById = new Map(combined.map((proposal) => [proposal.id, proposal]));
    return Array.from(uniqueById.values());
  }, [createdProposals, joinedProposals]);

  const handleCreateProposal = (proposalFields: ProposalInput) => {
    const newProposal: Proposal = {
      id: `${Date.now()}`,
      name: proposalFields.name,
      price: proposalFields.price,
      maxParticipants: proposalFields.maxParticipants,
      location: proposalFields.location,
      description: proposalFields.description,
      image: PLACEHOLDER_IMAGE,
      participantCodes: [CURRENT_USER_CODE],
    };
    setCreatedProposals((prev) => [...prev, newProposal]);
    navigate('home');
  };

  const handleJoinProposal = (proposal: Proposal) => {
    if (proposal.participantCodes.includes(CURRENT_USER_CODE)) {
      navigate('complete', proposal);
      return;
    }

    if (proposal.participantCodes.length >= proposal.maxParticipants) {
      navigate('proposal', proposal);
      return;
    }

    const updatedProposal: Proposal = {
      ...proposal,
      participantCodes: [...proposal.participantCodes, CURRENT_USER_CODE],
    };

    setJoinedProposals((prev) => {
      const index = prev.findIndex((p) => p.id === updatedProposal.id);
      if (index !== -1) {
        const copy = [...prev];
        copy[index] = updatedProposal;
        return copy;
      }
      return [...prev, updatedProposal];
    });

    setCreatedProposals((prev) =>
      prev.map((p) => (p.id === updatedProposal.id ? updatedProposal : p))
    );

    setDiscoverProposals((prev) => prev.filter((p) => p.id !== updatedProposal.id));
    navigate('complete', updatedProposal);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md h-[812px] bg-white shadow-xl overflow-hidden relative">
        {currentScreen === 'home' && (
          <HomeScreen 
            navigate={navigate} 
            createdProposals={createdProposals} 
            joinedProposals={joinedProposals} 
          />
        )}
        {currentScreen === 'create' && (
          <CreateProposal 
            onCreateProposal={handleCreateProposal}
            goBack={goBack}
          />
        )}
        {currentScreen === 'proposal' && (
          <ProposalDetail 
            navigate={navigate} 
            goBack={goBack}
            proposal={selectedProposal} 
            canJoin={
              selectedProposal 
                ? (
                    !selectedProposal.participantCodes.includes(CURRENT_USER_CODE) &&
                    selectedProposal.participantCodes.length < selectedProposal.maxParticipants
                  )
                : false
            }
          />
        )}
        {currentScreen === 'discover' && <DiscoverScreen navigate={navigate} proposals={discoverProposals} />}
        {currentScreen === 'join' && (
          <JoinConfirmation 
            navigate={navigate} 
            proposal={selectedProposal} 
            onConfirmJoin={handleJoinProposal}
            goBack={goBack}
          />
        )}
        {currentScreen === 'chat-list' && <ChatList navigate={navigate} proposals={userProposals} />}
        {currentScreen === 'chat' && selectedProposal && hasJoinedProposal(selectedProposal) && (
          <GroupChat goBack={goBack} proposal={selectedProposal} />
        )}
        {currentScreen === 'complete' && <PurchaseComplete navigate={navigate} proposal={selectedProposal} />}
        {currentScreen === 'shared-item' && (
          <SharedItemOverview navigate={navigate} goBack={goBack} proposal={selectedProposal} />
        )}
        {currentScreen === 'profile' && <ProfileScreen navigate={navigate} />}
      </div>
    </div>
  );
}
