'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import { LogOut } from "lucide-react";

export default function Buttons() {
  const URL = process.env.NEXT_PUBLIC_API_URL;

  const [code, setValueCode] = useState();
  const [name, setValueName] = useState();
  const [id, setValue_id] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setValueCode(localStorage.getItem("codeattendance"));
      setValueName(localStorage.getItem("emailattendance"));
      setValue_id(localStorage.getItem("id"));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("codeattendance");
    localStorage.removeItem("emailattendance");
    localStorage.removeItem("id");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-300 p-6 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
      {/* النص */}
      <div className="text-center lg:text-left lg:ml-10">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">
          نظام حضور و غياب الطلاب
        </h1>
        <p className="text-lg text-gray-700 max-w-lg">
          مرحبًا بكم في نظام الحضور , الخاص بطلاب المرحلة الابتدائية. 
          يمكنكم من خلال هذا النظام تسجيل حضور وغياب الطلاب بسهولة، 
          بالإضافة إلى متابعة تقارير الحضور الشهرية. 
          نسعى دائمًا لتطوير النظام وإضافة ميزات جديدة في المستقبل إن شاء الله.
        </p>
      </div>

      {/* الصورة */}
      <div className="flex justify-center ">
        <img
          src="https://thaka.bing.com/th/id/OIP.8gmGtqAJh7SsE8VgQxrT0gHaFj?rs=1&pid=ImgDetMain"
          alt="صورة تعبيرية لنظام الحضور"
          className="rounded-lg shadow-lg w-full max-w-md"
        />
      </div>

      {/* الأزرار */}
      <div className="col-span-2 flex justify-center mt-6 lg:mt-12">
        <div className="flex flex-col lg:flex-row gap-4">
          {!code && (
            <Link
              href="/login"
              className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 text-center shadow-[0px_7px_15px_rgba(0,0,0,0.2)] transition"
            >
              تسجيل دخول لعرض تقرير الطالب
            </Link>
          )}
          {code && (
            <>
              <Link href={"/AttendanceTable"} className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition">
                عرض التقارير
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 flex items-center gap-2"
              >
                <LogOut size={18} /> تسجيل خروج
              </button>
            </>
          )}
        </div>
      </div>

      {/* رسالة الحالة */}
      {message && (
        <div className="mt-4 bg-blue-100 text-blue-700 px-4 py-2 rounded shadow col-span-2">
          {message}
        </div>
      )}
    </div>
  );
}
