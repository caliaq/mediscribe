import Image from "next/image";
import Patients from "@/components/patients";
import PatientCard from "@/components/patientCard";

export default function Home() {
  return (
    <div className="flex">
      <div className="flex flex-col w-1/5 items-center max-h-dvh overflow-y-auto">
        <Image src="/logo.svg" alt="Mediscribe logo" width={128} height={96} className="p-4"/>
        <Patients />
      </div>
      <div className="flex w-4/5">
        <PatientCard></PatientCard>
      </div>
    </div>
  );
}
