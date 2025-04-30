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
    <div className="flex flex-col items-center justify-center bg-gray-100 mt-6 p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">ترحيل الطلاب للعام الجديد</h1>
      {responseMessage && (
        <p className="text-[#2e2ece] font-bold p-2 text-center  bottom-[20px] rounded-3xl bg-[#2bec2b]">
          {responseMessage}
        </p>
      )}

      <input
        className="border-2 border-gray-300 rounded-lg mt-6 p-2 mb-4 w-full"
        type="text"
        placeholder="ادخل اكواد الطلاب الفشله اللي منجحوش  (مفصولة بفواصل) مثال     123, 456, 789 "
        onChange={(e) => setExcludedCodes(e.target.value.split(",").map((code) => parseInt(code.trim())))}
      />
      <button
        className="bg-[#ff1b1b] rounded-3xl p-3"
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
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={handleConfirm}
          >
            تأكيد
          </button>
        </div>
      </Modal>
    </div>
  );
}
