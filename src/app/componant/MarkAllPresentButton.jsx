"use client";
import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import Toast from "./Toast";

const MarkAllPresentButton = ({ grade, classRoom, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleConfirm = async () => {
    setDialogOpen(false);
    if (!grade || !classRoom) {
      alert("من فضلك اختر الصف والفصل أولاً");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/markPresent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ grade, classRoom }),
      });

      const data = await res.json();

      if (res.ok) {
        if (onSuccess) onSuccess();
        setToastMessage("✅ تم تسجيل حضور الكل بنجاح");
      } else {
        console.error(data.message);
        setToastMessage("❌ حدث خطأ أثناء تسجيل الحضور");
      }
    } catch (err) {
      console.error(err);
      setToastMessage("❌ حدث خطأ أثناء العملية");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setDialogOpen(true)}
        disabled={loading}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {loading ? "جارٍ التحديث..." : "تسجيل حضور الكل"}
      </button>

      <ConfirmDialog
        open={dialogOpen}
        onConfirm={handleConfirm}
        onCancel={() => setDialogOpen(false)}
        message={`هل أنت متأكد أنك تريد تسجيل حضور الكل للفصل ${classRoom} في ${grade}؟`}
      />

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
    </>
  );
};

export default MarkAllPresentButton;
