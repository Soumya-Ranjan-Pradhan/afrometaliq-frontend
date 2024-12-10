interface ModalProps {
    isVisible: boolean;
    onClose: () => void;
    onConfirm: () => void;
  }
  
  export const Modal: React.FC<ModalProps> = ({ isVisible, onClose, onConfirm }) => {
    if (!isVisible) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-md shadow-lg">
          <h3 className="text-lg font-bold mb-4">Are you sure?</h3>
          <p className="text-sm text-gray-600 mb-6">
            Do you really want to delete this item? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };