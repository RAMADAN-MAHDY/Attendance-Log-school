'use client'
import { useState } from "react";
import { grades } from "@/utils/grades";

export default function SignupForm() {
    const URL = process.env.NEXT_PUBLIC_API_URL;

    const [adminPass, setAdminPass] = useState("");
    // const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    code: "",
    password: "",
    confirmPassword: "",
    selectedGrade: "",
    selectedClass: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, phone, code, password, confirmPassword, selectedGrade, selectedClass } = formData;
    const formDataToSubmit = {
      fullName,
      phone,
      code,
      password,
      confirmPassword,
      grade: selectedGrade,
      classRoom: selectedClass,
    };
    console.log(formDataToSubmit);
    // هنا تبعت formData على السيرفر
    try {
      const response = await fetch(`${URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSubmit),
        
      });
      const responseBody = await response.json(); 
      if (!response.ok) {
        setLoading(responseBody.message);
        console.log(responseBody);
        throw new Error(responseBody.message || 'حدث خطأ');      }

      // إعادة تعيين الحقول بعد نجاح التسجيل
      setFormData({
        fullName: '',
        phone: '',
        code: '',
        password: '',
        confirmPassword: '',
        selectedGrade: '',
        selectedClass: '',
      });
    //   setError('');
      setLoading(responseBody.message);

      alert('تم إنشاء حسابك بنجاح');
    } catch (err) {
      console.error(err.message);
    //   setError('حدث خطأ. يرجى المحاولة مرة أخرى لاحقًا.');
        // setLoading('حدث خطأ. يرجى المحاولة مرة أخرى لاحقًا.');
    }
  };

  
  if (process.env.NEXT_PUBLIC_Pass_admin !== adminPass) {
    return (
      <div className="text-center py-4  flex-col justify-start items-center text-gray-500 bg-[#d7da8ea6] rounded-3xl">
        <h2> تسجيل طالب جديد</h2>
        <h2>دخول بصلاحية الادمن (الادارة)</h2>
        <h2>يرجى إدخال كلمة المرور الصحيحة</h2>
        <input type="number" onChange={(e) => setAdminPass(e.target.value)} className='border-[#29ff94] bg-[#f5f7f5] text-[#000] pl-3' />
      </div>
    );
  }


  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">تسجيل طالب جديد</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="الاسم بالكامل"
          className="w-full p-2 border rounded-md"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          placeholder="رقم الهاتف"
          className="w-full p-2 border rounded-md"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          placeholder="الكود"
          className="w-full p-2 border rounded-md"
          name="code"
          value={formData.code}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          placeholder="كلمة المرور"
          className="w-full p-2 border rounded-md"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          placeholder="تأكيد كلمة المرور"
          className="w-full p-2 border rounded-md"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        {/* السنة الدراسية */}
        <select
          className="w-full p-2 border rounded-md"
          name="selectedGrade"
          value={formData.selectedGrade}
          onChange={(e) => {
            handleChange(e);
            setFormData((prevData) => ({
              ...prevData,
              selectedClass: "", // لما يغير السنة، نفضي الفصل المختار
            }));
          }}
          required
        >
          <option value="">اختر السنة الدراسية</option>
          {grades.map((g, idx) => (
            <option key={idx} value={g.grade}>{g.grade}</option>
          ))}
        </select>

        {/* الفصول */}
        {formData.selectedGrade && (
          <select
            className="w-full p-2 border rounded-md"
            name="selectedClass"
            value={formData.selectedClass}
            onChange={handleChange}
            required
          >
            <option value="">اختر الفصل</option>
            {grades
              .find(g => g.grade === formData.selectedGrade)
              ?.classes.map((c, idx) => (
                <option key={idx} value={c}>{c}</option>
              ))
            }
          </select>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
        >
          تسجيل
        </button>

      </form>
      {/* <h1 className="text-red-500 text-center mt-4">{error}</h1> */}
      <h1 className="text-green-500 text-center mt-4">{loading}</h1>
    </div>
  );
}
