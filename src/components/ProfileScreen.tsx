import { ShieldCheck, Settings, Package, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { NavigationBar } from './NavigationBar';
import type { Screen } from '../App';

interface ProfileScreenProps {
  navigate: (screen: Screen) => void;
}

export function ProfileScreen({ navigate }: ProfileScreenProps) {
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h1 className="text-gray-900">Profile</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-16">
        {/* User Info */}
        <div className="px-6 py-8 flex flex-col items-center">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gray-900 flex items-center justify-center text-white mb-4">
            <span className="text-3xl">JC</span>
          </div>

          {/* Name */}
          <h2 className="text-gray-900 mb-2">Jeffrey Chen</h2>

          {/* Verified Badge */}
          <div className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-full">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span className="text-green-700 text-sm">Verified cornell.edu</span>
          </div>
        </div>

        {/* Stats */}
        <div className="px-6 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-gray-900 mb-1">12</div>
              <div className="text-gray-600">Purchases Joined</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-gray-900 mb-1">5</div>
              <div className="text-gray-600">Shared Items Owned</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 space-y-3">
          <Button 
            variant="outline"
            className="w-full justify-start py-6"
          >
            <Settings className="w-5 h-5 mr-3" />
            Edit Profile
          </Button>

          <Button 
            onClick={() => navigate('home')}
            variant="outline"
            className="w-full justify-start py-6"
          >
            <Package className="w-5 h-5 mr-3" />
            My Items
          </Button>

          <Button 
            variant="outline"
            className="w-full justify-start py-6"
          >
            <ShoppingBag className="w-5 h-5 mr-3" />
            Purchase History
          </Button>

          <Button 
            variant="outline"
            className="w-full justify-start py-6"
          >
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </Button>
        </div>
      </div>

      <NavigationBar navigate={navigate} active="profile" />
    </div>
  );
}
