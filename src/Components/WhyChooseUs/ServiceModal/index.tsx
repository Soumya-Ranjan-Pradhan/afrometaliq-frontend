import React from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  bgColor: string;
}

interface ServiceModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  service: Service;
}

const ServiceModal: React.FC<ServiceModalProps> = ({
  isOpen,
  onRequestClose,
  service,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="relative bg-white w-full max-w-[40rem] mx-auto rounded-lg shadow-lg p-6 flex flex-col md:flex-row"
      overlayClassName="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
      ariaHideApp={false}
    >
      <button
        onClick={onRequestClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <FaTimes size={24} />
      </button>

      <div className="flex flex-col">
        <div className="flex items-center">
          <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-[#24246C] to-[#5A43AF] bg-clip-text text-transparent">
            {service.title}
          </h3>
          <FaLongArrowAltRight
            size={24}
            className="ml-4 mb-[0.6rem] text-[#24246C] animate-move-left"
          />
        </div>
        <p className="text-gray-600">{service.description}</p>
      </div>
    </Modal>
  );
};

export default ServiceModal;
