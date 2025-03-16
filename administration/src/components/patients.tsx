"use client";
import { useEffect, useState } from "react";
import { fetchPatients, Patient } from "../services/patients";
import { usePatient } from "../context/patientContext";

const Patients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const { selectPatient, selectedPatient } = usePatient();

  useEffect(() => {
    fetchPatients().then(setPatients);
  }, []);

  return (
    <div className="w-full p-4 mx-auto">
      {patients.map((patient) => {
        const fullName = `${patient.name.first} ${patient.name.last}`;
        const age =
          new Date().getFullYear() - new Date(patient.birthDate).getFullYear();
        const location = `${patient.address.street}, ${patient.address.city} ${patient.address.zip}`;

        return (
          <div
            key={patient._id}
            onClick={() => selectPatient(patient)}
            className={`p-4 my-2 rounded-lg border-2 cursor-pointer ${
              patient.sex === "F" ? "border-pink-500" : "border-blue-500"
            } ${selectedPatient?._id === patient._id ? "bg-black" : ""}`}
          >
            <h2 className="text-xl font-bold">
              {fullName}, {age}
            </h2>
            <p className="text-sm">{location}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Patients;
