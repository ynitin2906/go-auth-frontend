"use client";

import React, { useEffect } from "react";
import { MdClose } from "react-icons/md"; // Importing close icon from react-icons

interface PopupModalProps {
  showCloseBtn?: boolean;
  isOpen: boolean;
  onClose: () => void;
  modalName?: string;
  children: React.ReactNode;
  customStyleClsName?: string;
  headerStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
}

const PopupModal: React.FC<PopupModalProps> = ({
  showCloseBtn = true,
  isOpen,
  onClose,
  modalName,
  children,
  customStyleClsName = "",
  headerStyle = {},
  bodyStyle = {},
}) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isOpen) return null;

  return (
    <section
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-start z-50 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-lg shadow-lg w-full max-w-md mt-10 ${customStyleClsName}`} // Added `mt-10` for separation from top
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold" style={headerStyle}>
            {modalName}
          </h2>
          {showCloseBtn && (
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              <MdClose size={24} />
            </button>
          )}
        </div>
        <div className="p-4 overflow-y-auto" style={bodyStyle}>
          {children}
        </div>
      </div>
    </section>
  );
};

export default PopupModal;
