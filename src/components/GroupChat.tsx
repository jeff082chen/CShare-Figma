import { ArrowLeft, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import type { Proposal } from '../types/proposal';
import { useState } from 'react';

interface GroupChatProps {
  proposal: Proposal | null;
  goBack: () => void;
}

const mockMessages = [
  {
    id: '1',
    sender: 'Sarah',
    content: 'Hey everyone! Excited to share this purchase',
    isOwn: false,
    time: '10:30 AM'
  },
  {
    id: '2',
    sender: 'You',
    content: 'When should we make the purchase?',
    isOwn: true,
    time: '10:32 AM'
  },
  {
    id: '3',
    sender: 'Mike',
    content: 'I can pick it up this weekend if that works',
    isOwn: false,
    time: '10:35 AM'
  },
  {
    id: '4',
    sender: 'You',
    content: 'Sounds good to me!',
    isOwn: true,
    time: '10:36 AM'
  }
];

export function GroupChat({ proposal, goBack }: GroupChatProps) {
  const [message, setMessage] = useState('');
  
  if (!proposal) return null;

  const pricePerPerson = (proposal.price / proposal.maxParticipants).toFixed(2);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="px-6 py-4 flex items-center gap-3">
          <button onClick={goBack}>
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-gray-900 flex-1">Shared Purchase Group</h1>
        </div>
        
        {/* Purchase Info Bar */}
        <div className="px-6 py-3 bg-gray-50 flex items-center justify-between text-sm">
          <span className="text-gray-700">{proposal.name}</span>
          <div className="flex items-center gap-4 text-gray-600">
            <span>${pricePerPerson}/person</span>
            <span>・</span>
            <span>{proposal.participantCodes.length}/{proposal.maxParticipants} joined</span>
          </div>
        </div>
      </div>

      {/* Suggestion Banner */}
      <div className="px-6 py-3 bg-blue-50 border-b border-blue-100">
        <p className="text-blue-900 text-sm text-center">
          Coordinate how to buy and share this item.
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {mockMessages.map((msg) => (
          <div 
            key={msg.id}
            className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[75%] ${msg.isOwn ? 'order-2' : 'order-1'}`}>
              {!msg.isOwn && (
                <p className="text-gray-700 mb-1 px-1">{msg.sender}</p>
              )}
              <div className={`rounded-2xl px-4 py-3 ${
                msg.isOwn 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p>{msg.content}</p>
              </div>
              <p className="text-gray-400 text-xs mt-1 px-1">{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 px-6 py-4">
        <div className="flex gap-2">
          <Input 
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1"
          />
          <Button 
            className="bg-gray-900 hover:bg-gray-800 px-6"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
