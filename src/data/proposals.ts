import type { Proposal } from '../types/proposal';

export const PLACEHOLDER_IMAGE = 'placeholder';

export const initialCreatedProposals: Proposal[] = [
  {
    id: 'c-1',
    name: 'Shared DSLR Camera',
    price: 520,
    maxParticipants: 4,
    location: 'Media Lab Locker',
    description: 'Split the cost of a Canon DSLR for weekend shoots and events.',
    image: PLACEHOLDER_IMAGE,
    participantCodes: ['YJ'],
  },
];

export const initialJoinedProposals: Proposal[] = [
  {
    id: 'j-1',
    name: 'Portable Projector',
    price: 180,
    maxParticipants: 5,
    location: 'The House',
    description: 'Easy to carry for movie nights or group presentations',
    image: PLACEHOLDER_IMAGE,
    participantCodes: ['YJ', 'SJ'],
  },
  {
    id: 'j-2',
    name: 'Air Fryer',
    price: 80,
    maxParticipants: 3,
    location: 'The House',
    description: 'Perfect for late night cooking',
    image: PLACEHOLDER_IMAGE,
    participantCodes: ['YJ'],
  },
  {
    id: 'j-3',
    name: 'Vacuum Cleaner',
    price: 150,
    maxParticipants: 5,
    location: 'The House',
    description: 'Keep our living spaces clean',
    image: PLACEHOLDER_IMAGE,
    participantCodes: ['YJ', 'MT', 'AL'],
  },
];

export const initialDiscoverProposals: Proposal[] = [
  {
    id: 'd-1',
    name: 'Blender',
    price: 60,
    maxParticipants: 3,
    location: 'The House',
    description: 'Perfect for smoothies',
    image: PLACEHOLDER_IMAGE,
    participantCodes: ['AJ'],
  },
  {
    id: 'd-2',
    name: 'Gaming Console',
    price: 400,
    maxParticipants: 5,
    location: 'The House',
    description: 'Share the latest console',
    image: PLACEHOLDER_IMAGE,
    participantCodes: ['MT', 'AL'],
  },
  {
    id: 'd-3',
    name: 'Printer',
    price: 200,
    maxParticipants: 6,
    location: 'The House',
    description: 'Shared printing solution',
    image: PLACEHOLDER_IMAGE,
    participantCodes: ['AJ', 'BL', 'CN'],
  },
  {
    id: 'd-4',
    name: 'Coffee Maker',
    price: 90,
    maxParticipants: 4,
    location: 'The House',
    description: 'Morning coffee for all',
    image: PLACEHOLDER_IMAGE,
    participantCodes: ['DS', 'ER'],
  },
];
