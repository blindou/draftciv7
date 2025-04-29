import React from 'react';
import { DraftFlow } from '../../types';
import { DRAFT_FLOWS } from '../../data/draftFlows';
import { ListFilter } from 'lucide-react';

interface DraftFlowSelectorProps {
  selectedFlow: DraftFlow;
  onSelectFlow: (flow: DraftFlow) => void;
}

const DraftFlowSelector: React.FC<DraftFlowSelectorProps> = ({
  selectedFlow,
  onSelectFlow
}) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <ListFilter className="mr-2" size={20} />
          Draft Flow
        </h2>
        
        <div className="space-y-4">
          {DRAFT_FLOWS.map((flow) => (
            <button
              key={flow.name}
              onClick={() => onSelectFlow(flow)}
              className={`w-full p-4 rounded-lg border-2 transition-all ${
                selectedFlow.name === flow.name
                  ? 'border-purple-500 bg-purple-900 bg-opacity-20'
                  : 'border-gray-700 hover:border-gray-600 hover:bg-gray-700'
              }`}
            >
              <div className="text-left">
                <h3 className="font-semibold text-white mb-1">{flow.name}</h3>
                <p className="text-sm text-gray-400">{flow.description}</p>
                
                <div className="mt-3 flex flex-wrap gap-2">
                  {Object.entries(
                    flow.steps.reduce((acc, step) => {
                      const key = `${step.action}-${step.type}`;
                      acc[key] = (acc[key] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                  ).map(([key, count]) => (
                    <div
                      key={key}
                      className={`px-2 py-1 rounded text-xs ${
                        key.startsWith('ban')
                          ? 'bg-red-900 bg-opacity-30 text-red-300'
                          : 'bg-green-900 bg-opacity-30 text-green-300'
                      }`}
                    >
                      {count}x {key.split('-').join(' ')}
                    </div>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DraftFlowSelector;