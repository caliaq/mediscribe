"use client";

import { useState, useEffect } from "react";
import { usePatient } from "../context/patientContext";
import { Record, fetchRecords } from "@/services/patients";

export default function PatientCard() {
  const [expandedRecords, setExpandedRecords] = useState<{
    [key: number]: boolean;
  }>({});
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
    return null;
  }

  return (
    <div className="p-6 mx-auto w-full">
      <h1 className="text-3xl font-bold">
        {selectedPatient.name.first} {selectedPatient.name.last}
      </h1>
      <div className="flex gap-12 h-8 leading-8">
        <p>ID: {selectedPatient._id} </p>
        <p>
          datum narození:{" "}
          {new Date(selectedPatient.birthDate).toLocaleDateString()}
        </p>
        <p>pohlaví: {selectedPatient.sex}</p>
        <p>plátce: {selectedPatient.insurance || "Neznámý"}</p>
      </div>
      <div className="flex gap-12 h-8 leading-8">
        <p>
          adresa: {selectedPatient.address.street},{" "}
          {selectedPatient.address.city} {selectedPatient.address.zip}
        </p>
        <p>
          alergie:{" "}
          {selectedPatient.allergies?.length
            ? selectedPatient.allergies.join(", ")
            : "—"}
        </p>
      </div>

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
                  overflow: "hidden",
                }}
              >
                <div className="flex items-center justify-between p-2">
                  <p className="flex-grow">{record.data}</p>
                  <button
                    className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(record.data);
                    }}
                    title="Copy to clipboard"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="9"
                        y="9"
                        width="13"
                        height="13"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </button>
                </div>
                <div className="flex items-center justify-between p-2">
                  <p className="flex-grow">{record.summary}</p>
                  <button
                    className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(record.summary);
                    }}
                    title="Copy to clipboard"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="9"
                        y="9"
                        width="13"
                        height="13"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
