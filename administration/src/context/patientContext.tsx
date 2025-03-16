"use client";
import { createContext, useContext, ReactNode, useState } from 'react';
import { Patient } from '@/services/patients';

type PatientContextType = {
  selectedPatient: Patient | null;
  selectPatient: (patient: Patient) => void;
};

const PatientContext = createContext<PatientContextType | undefined>(undefined);

type PatientProviderProps = {
  children: ReactNode;
};

export function PatientProvider({ children }: PatientProviderProps) {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const selectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  return (
    <PatientContext.Provider value={{ selectedPatient, selectPatient }}>
      {children}
    </PatientContext.Provider>
  );
}

export function usePatient() {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error("usePatient must be used within a PatientProvider");
  }
  return context;
}