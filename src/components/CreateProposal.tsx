import { ArrowLeft, Upload, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import type { Screen, ProposalInput } from '../App';
import { useState } from 'react';

interface CreateProposalProps {
  navigate: (screen: Screen) => void;
  onCreateProposal: (proposal: ProposalInput) => void;
}

export function CreateProposal({ navigate, onCreateProposal }: CreateProposalProps) {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [participants, setParticipants] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!itemName.trim() || !price || !participants || !description.trim() || !location.trim()) {
      setError('Please complete all required fields.');
      return;
    }

    const parsedPrice = parseFloat(price);
    const parsedParticipants = parseInt(participants, 10);

    if (Number.isNaN(parsedPrice) || parsedPrice <= 0 || Number.isNaN(parsedParticipants) || parsedParticipants <= 0) {
      setError('Enter valid numbers for price and participants.');
      return;
    }

    onCreateProposal({
      name: itemName.trim(),
      price: parsedPrice,
      maxParticipants: parsedParticipants,
      description: description.trim(),
      location: location.trim(),
    });

    setItemName('');
    setPrice('');
    setParticipants('');
    setDescription('');
    setLocation('');
    setError('');
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-3">
        <button onClick={() => navigate('home')}>
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className="text-gray-900">Create Shared Purchase</h1>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="space-y-6">
          {/* Item Name */}
          <div>
            <label className="block text-gray-700 mb-2">Item Name</label>
            <Input 
              placeholder="e.g., Mini Fridge"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-gray-700 mb-2">Item Photo</label>
            <div className="w-full h-40 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-gray-500">Upload Photo</span>
            </div>
          </div>

          {/* Total Price */}
          <div>
            <label className="block text-gray-700 mb-2">Total Estimated Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <Input 
                type="number"
                placeholder="0.00"
                className="pl-7"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          {/* Number of Co-buyers */}
          <div>
            <label className="block text-gray-700 mb-2">Desired Number of Co-Buyers</label>
            <Input 
              type="number"
              placeholder="e.g., 4"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 mb-2">Description of Intended Shared Use</label>
            <Textarea 
              placeholder="Describe how you plan to share and use this item..."
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 mb-2">Location</label>
            <div className="relative">
              <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input 
                placeholder="e.g., North Campus / Building A"
                className="pl-10"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6"
          >
            Create Proposal
          </Button>
        </div>
      </div>
    </div>
  );
}
