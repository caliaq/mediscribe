'use client';
import { cookies } from "next/headers";
import Image from "next/image";
import Patients from "@/components/patients";
import PatientCard from "@/components/patientCard";
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handleLogout = async () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Redirect to login page
    router.push('/login');
  };

  return (
    <div className="min-h-screen p-8">
      <div className="flex justify-end">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Odhlásit se
        </button>
      </div>
      
      {/* Add your main page content here */}
      <h1 className="text-2xl font-bold mt-8">Dashboard</h1>

      <div className="flex">
        <div className="flex flex-col w-1/5 items-center max-h-dvh overflow-y-auto">
          <Image src="/logo.svg" alt="Mediscribe logo" width={128} height={96} className="p-4"/>
          <Patients />
        </div>
        <div className="flex w-4/5">
          <PatientCard></PatientCard>
        </div>
      </div>
    </div>
  );
}
