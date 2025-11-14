export interface Proposal {
  id: string;
  name: string;
  price: number;
  maxParticipants: number;
  location: string;
  description: string;
  image?: string;
  participantCodes: string[];
}

export interface ProposalInput {
  name: string;
  price: number;
  maxParticipants: number;
  description: string;
  location: string;
}
