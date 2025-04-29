import React from 'react';
import { Civilization, Leader, Souvenir, ItemType, DraftSettings } from '../../types';
import { isItemBanned, isItemPicked } from '../../utils/draftUtils';

interface ItemGridProps {
  items: (Civilization | Leader | Souvenir)[];
  itemType: ItemType;
  teams: [any, any];
  currentTeam: number;
  action: 'ban' | 'pick';
  onSelectItem: (item: Civilization | Leader | Souvenir) => void;
  disabled?: boolean;
  settings: DraftSettings;
}

const ItemGrid: React.FC<ItemGridProps> = ({
  items,
  itemType,
  teams,
  currentTeam,
  action,
  onSelectItem,
  disabled = false,
  settings
}) => {
  // Helper to get item status classes
  const getItemClasses = (item: Civilization | Leader | Souvenir) => {
    const banned = isItemBanned(item, teams, itemType, settings);
    const picked = itemType !== 'souvenir' && isItemPicked(item as any, teams, itemType);
    
    if (banned) {
      return 'bg-red-900 bg-opacity-40 border-red-800 text-red-300 opacity-60 cursor-not-allowed';
    }
    
    if (picked) {
      return 'bg-green-900 bg-opacity-40 border-green-800 text-green-300 opacity-60 cursor-not-allowed';
    }
    
    if (disabled) {
      return 'bg-gray-800 border-gray-700 text-gray-400 cursor-not-allowed';
    }
    
    return `
      bg-gray-800 
      border-gray-700 
      text-white 
      hover:bg-${action === 'ban' ? 'red' : 'green'}-700 
      hover:border-${action === 'ban' ? 'red' : 'green'}-600 
      cursor-pointer 
      transform 
      hover:scale-105 
      hover:shadow-lg 
      transition-all 
      duration-200
    `;
  };
  
  // Get the item name and image
  const getItemDetails = (item: Civilization | Leader | Souvenir) => {
    const name = item.name;
    const image = item.image;
    
    // Add additional details based on item type
    if (itemType === 'leader' && 'civilization' in item) {
      const leader = item as Leader;
      const civilization = teams[0].availableCivilizations?.find(
        (civ: Civilization) => civ.id === leader.civilization
      )?.name || '';
      
      return { name, image, subtitle: civilization ? `(${civilization})` : '' };
    }
    
    if (itemType === 'souvenir' && 'description' in item) {
      const souvenir = item as Souvenir;
      return { name, image, subtitle: souvenir.description };
    }
    
    return { name, image, subtitle: '' };
  };
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {items.map(item => {
        const { name, subtitle } = getItemDetails(item);
        const banned = isItemBanned(item, teams, itemType, settings);
        const picked = itemType !== 'souvenir' && isItemPicked(item as any, teams, itemType);
        const isDisabled = disabled || banned || picked;
        
        return (
          <div
            key={`${itemType}-${item.id}`}
            className={`
              relative 
              rounded-lg 
              border-2 
              p-4 
              flex 
              flex-col 
              items-center 
              justify-center
              text-center
              min-h-[120px]
              transition-all
              duration-300
              ${getItemClasses(item)}
            `}
            onClick={() => !isDisabled && onSelectItem(item)}
          >
            <div className="mb-2 text-lg font-semibold">{name}</div>
            
            {subtitle && (
              <div className="text-xs opacity-80">{subtitle}</div>
            )}
            
            {banned && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg">
                <div className="text-red-500 font-bold text-xl">BANNED</div>
              </div>
            )}
            
            {picked && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg">
                <div className="text-green-500 font-bold text-xl">PICKED</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ItemGrid;