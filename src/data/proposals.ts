import type { Proposal } from '../types/proposal';

export const PLACEHOLDER_IMAGE = 'placeholder';

export const initialCreatedProposals: Proposal[] = [
  {
    id: 'c-1',
    name: 'Bulk Chicken Breast (6 lbs)',
    price: 24,
    maxParticipants: 3,
    location: 'The House',
    description: 'Costco 6 lb pack — split into smaller portions for meal prep.',
    image: PLACEHOLDER_IMAGE,
    participantCodes: ['YJ'],
  },
  {
    id: 'c-2',
    name: 'DSLR Camera',
    price: 520,
    maxParticipants: 4,
    location: 'The House',
    description: 'Split the cost of a Canon DSLR for weekend shoots and events.',
    image: PLACEHOLDER_IMAGE,
    participantCodes: ['YJ'],
  },
];

export const initialJoinedProposals: Proposal[] = [
  {
    id: 'j-1',
    name: '24-Pack Greek Yogurt',
    price: 18,
    maxParticipants: 4,
    location: 'The House',
    description: 'Plain or mixed — great for breakfast. Bulk pack is too much for one person.',
    image: PLACEHOLDER_IMAGE,
    participantCodes: ['MT', 'AL'],
  },
  {
    id: 'j-2',
    name: '30-Pack Instant Noodles',
    price: 22,
    maxParticipants: 5,
    location: 'The House',
    description: 'Split a large box of instant noodles and save space in your pantry.',
    image: PLACEHOLDER_IMAGE,
    participantCodes: ['SJ'],
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
  {
    id: 'j-4',
    name: 'Portable Projector',
    price: 180,
    maxParticipants: 5,
    location: 'The House',
    description: 'Easy to carry for movie nights or group presentations',
    image: PLACEHOLDER_IMAGE,
    participantCodes: ['YJ', 'SJ'],
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
    name: 'Bulk Paper Towels (12 Rolls)',
    price: 20,
    maxParticipants: 4,
    location: 'The House',
    description: 'Share a giant Costco pack so you only take what you need.',
    image: PLACEHOLDER_IMAGE,
    participantCodes: ['BL', 'CN', 'SL'],
  },
  {
    id: 'd-3',
    name: 'Family-Size Fruit Pack',
    price: 14,
    maxParticipants: 3,
    location: 'The House',
    description: 'Share mixed fruit from Costco — too big for one person to finish.',
    image: PLACEHOLDER_IMAGE,
    participantCodes: ['AJ'],
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
