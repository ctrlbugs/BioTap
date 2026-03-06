'use client';

import React, { createContext, useContext, ReactNode, useCallback } from 'react';

interface ContactModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined);

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error('useContactModal must be used within ContactModalProvider');
  }
  return context;
}

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const openModal = useCallback(() => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);
  const closeModal = useCallback(() => {}, []);

  return (
    <ContactModalContext.Provider value={{ isOpen: false, openModal, closeModal }}>
      {children}
    </ContactModalContext.Provider>
  );
}
