import React from 'react';
import { Civilization, Leader, Souvenir } from '../../types';

interface ConfirmationModalProps {
  isOpen: boolean;
  team: number;
  action: 'ban' | 'pick';
  item: Civilization | Leader | Souvenir | null;
  onConfirm: () => void;
  onCancel: () => void;
  disabled: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  team,
  action,
  item,
  onConfirm,
  onCancel,
  disabled
}) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
        <h3 className="text-xl font-bold mb-4 text-white">
          Confirm {action === 'ban' ? 'ban' : 'pick'}
        </h3>
        <p className="mb-4 text-gray-300">
          Team {team}: {action === 'ban' ? 'Ban' : 'Pick'} {item.name}
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={disabled}
            className={`px-4 py-2 rounded ${
              disabled
                ? 'bg-gray-400 cursor-not-allowed'
                : team === 1
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;