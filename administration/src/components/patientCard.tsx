"use client";

import { useState, useEffect } from "react";
import { usePatient } from "../context/patientContext";
import { Record, fetchRecords } from "@/services/patients";

export default function PatientCard() {
  const [expandedRecords, setExpandedRecords] = useState<{ [key: number]: boolean }>({});
  const [records, setRecords] = useState<Record[]>([]);
  const { selectedPatient } = usePatient();

  useEffect(() => {
    const loadRecords = async () => {
      if (selectedPatient?._id) {
        const fetchedRecords = await fetchRecords(selectedPatient._id);
        if (fetchedRecords) {
          setRecords(fetchedRecords);
        }
      }
    };

    loadRecords();
  }, [selectedPatient]);

  const toggleRecord = (index: number) => {
    setExpandedRecords((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  if (!selectedPatient) {
    return <div>Vyberte pacienta</div>;
  }

  return (
    <div className="p-6 mx-auto w-full">
      <h1 className="text-3xl font-bold">
        {selectedPatient.name.first} {selectedPatient.name.last}
      </h1>
      <p className="mt-2 text-sm">
        ID: {selectedPatient._id}{" "}
        <span className="ml-4">
          datum narození: {new Date(selectedPatient.birthDate).toLocaleDateString()}
        </span>
      </p>
      <p className="mt-1 text-sm">
        pohlaví: {selectedPatient.sex}{" "}
        <span className="ml-4">plátce: {selectedPatient.insurance || "Neznámý"}</span>
      </p>
      <p className="mt-2 text-sm">
        adresa: {selectedPatient.address.street}, {selectedPatient.address.city} {selectedPatient.address.zip}
      </p>
      <p className="mt-2 text-sm">
        alergie: {selectedPatient.allergies?.length ? selectedPatient.allergies.join(", ") : "—"}
      </p>

      {records.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Záznamy pacienta</h2>
          {records.map((record, index) => (
            <div key={index} className="mb-2">
              <div
                onClick={() => toggleRecord(index)}
                className="w-full text-left p-2 rounded-t-lg bg-[#00000080] transition-colors duration-50 hover:bg-gray-900 cursor-pointer"
              >
                {new Date(record.date).toLocaleDateString()}
              </div>
              <div
                className="pl-4 pr-2 pb-2 border border-[#00000080] transition-all duration-300 ease-in-out rounded-b-lg"
                style={{
                  maxHeight: expandedRecords[index] ? "500px" : "0",
                  opacity: expandedRecords[index] ? 1 : 0,
                  overflow: "hidden"
                }}
              >
                <p className="p-2">{record.data}</p>
                <p className="p-2">{record.summary}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}