"use client";
import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#__next"); // لتجنب تحذيرات الوصول

export default function PromoteStudents() {
  const [excludedCodes, setExcludedCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // حالة فتح/إغلاق النافذة
  const [confirmationPassword, setConfirmationPassword] = useState(""); // كلمة مرور التأكيد

  const handlePromotion = async () => {
    setLoading(true);
    setResponseMessage("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gradePromotionRouter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ excludedCodes }), // إرسال الأكواد المستثناة في جسم الطلب
      });

      const data = await response.json();
      if (response.ok) {
        setResponseMessage(`تم الترحيل بنجاح .`);
        setConfirmationPassword('')
      } else {
        setResponseMessage(`خطأ: ${data.error}`);
        setConfirmationPassword('')

      }
    } catch (error) {
      console.error("خطأ في الاتصال بالسيرفر:", error);
      setResponseMessage("حدث خطأ أثناء إرسال الطلب.");
    } finally {
      setLoading(false);
      setIsModalOpen(false); // إغلاق النافذة بعد الترحيل
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true); // فتح النافذة
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // إغلاق النافذة
  };

  const handleConfirm = () => {
    if (confirmationPassword === process.env.NEXT_PUBLIC_Pass_admin ) { // تحقق من كلمة المرور
      handlePromotion();
    } else {
      setResponseMessage("كلمة المرور غير صحيحة.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 mt-6 p-4 shadow-[0px_15px_15px_rgba(0,120,0,0.4)] rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">ترحيل الطلاب للعام الجديد</h1>
      {responseMessage && (
        <p className="text-[#2e2ece] font-bold p-2 text-center  bottom-[20px] rounded-3xl bg-[#2bec2b]">
          {responseMessage}
        </p>
      )}
        <p className="text-gray-700 mb-4 text-center">
            أدخل أكواد الطلاب الذين لم ينجحوا في السنة الدراسية الحالية (مفصولة بفواصل).
            <br />
            سيتم ترحيل الطلاب الناجحين فقط. <br />  
            <span className="text-red-500">يرجى التأكد من إدخال الأكواد بشكل صحيح.</span>
        </p>
      <input
        className="border-2 border-gray-300 rounded-lg mt-6 p-2 mb-4 w-full"
        type="text"
        placeholder=" مثال     123, 456, 789 "
        onChange={(e) => setExcludedCodes(e.target.value.split(",").map((code) => parseInt(code.trim())))}
      />
      <button
        className="bg-[#ff1b1b] rounded-3xl p-3 shadow-[0px_15px_15px_rgba(0,120,0,0.4)] text-white font-bold hover:bg-[#ff1b1b] transition duration-300 ease-in-out hover:shadow-[0px_15px_15px_rgba(0,0,0,0.4)]"
        type="button"
        onClick={handleOpenModal}
        disabled={loading}
      >
        {loading ? "جاري الترحيل..." : "ترحيل الطلاب"}
      </button>


      {/* النافذة المنبثقة */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="تأكيد الترحيل"
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-bold mb-4 text-center">تأكيد الترحيل</h2>
        <p className="text-gray-700 mb-4 text-center">
          يرجى إدخال كلمة المرور لتأكيد عملية الترحيل.
        </p>
        <input
          type="password"
          placeholder="أدخل كلمة المرور"
          className="border-2 border-gray-300 rounded-lg p-2 w-full mb-4"
          value={confirmationPassword}
          onChange={(e) => setConfirmationPassword(e.target.value)}
        />
        <div className="flex justify-between">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            onClick={handleCloseModal}
          >
            إلغاء
          </button>
          <button
            disabled={loading}
            className={`${loading ? "bg-[#5450]" : "bg-green-500 hover:bg-green-600"} text-white px-4 py-2 rounded-lg `}
            onClick={handleConfirm}
          >
           {loading ? <div>
            <svg className="animate-spin bg-[#434] h- w-10 mr-3 text-[#32ff32]" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"></path>
            </svg>
           </div> : "تأكيد"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
