import { useState } from 'react';
import { Button } from '@/components/Button';
import { Typography } from '@/components/ui/Typography';

interface AddMilestoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (milestone: any) => void;
}

export function AddMilestoneModal({ isOpen, onClose, onSave }: AddMilestoneModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'life',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      title: '',
      description: '',
      category: 'life',
      date: new Date().toISOString().split('T')[0]
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-sm max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <Typography variant="h4">
              Add New Milestone
            </Typography>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <Typography variant="caption" className="text-gray-500 mt-1">
            What's worth remembering from today?
          </Typography>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                placeholder="What did you accomplish?"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 resize-none"
                rows={3}
                placeholder="Tell the story behind this milestone..."
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                >
                  <option value="career">Career</option>
                  <option value="learning">Learning</option>
                  <option value="health">Health</option>
                  <option value="life">Life</option>
                  <option value="creative">Creative</option>
                  <option value="travel">Travel</option>
                  <option value="relationships">Relationships</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input 
                  type="date" 
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                  required
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
            <Button 
              type="submit"
              className="bg-gray-900 hover:bg-gray-800 text-white font-medium tracking-wide flex-1"
            >
              Save Milestone
            </Button>
            <Button 
              type="button"
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 font-medium tracking-wide"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
