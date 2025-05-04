"use client";

import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { grades } from "@/utils/grades";
import AttendanceTable from "./AttendanceTable"; 
import PromoteStudents from "./promote-students"; // استيراد مكون ترحيل الطلاب
const UserTable = () => {
  // حالات لتخزين البيانات المختلفة
  const [classRoom, setClassRoom] = useState(""); // لتخزين الفصل الدراسي المختار
  const [adminPass, setAdminPass] = useState(0); // كلمة مرور الأدمن
  const [refreshFlag, setRefreshFlag] = useState(true); // لتحديث البيانات عند الحاجة
  const [loadingStatus, setLoading] = useState(true); // حالة التحميل
  const [attendanceStatus, setAttendanceStatus] = useState(); // حالة الحضور
  const [showUserTable, setShowUserTable] = useState(false); // عرض السجل
  const [userDetails, setUserDetails] = useState({ userId: null, userName: null, userCode: null }); // تفاصيل المستخدم
  const [searchText, setSearchText] = useState(""); // نص البحث
  const [filteredUsers, setFilteredUsers] = useState([]); // المستخدمون المفلترون
  const [grade, setGrade] = useState(""); // السنة الدراسية المختارة
  const [allUsers, setAllUsers] = useState([]); // جميع المستخدمين

  // جلب بيانات الطلاب بناءً على السنة والفصل الدراسي
  const fetchUserData = async (grade, classRoom) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getUser?grade=${grade}&classRoom=${classRoom}`);
      const data = await response.json();
      setAllUsers(data.getUser); // تخزين جميع المستخدمين
      setFilteredUsers(data.getUser); // تعيين المستخدمين المفلترين
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false); // إنهاء حالة التحميل
    }
  };

  // فلتر الفصل الدراسي
  const handleClassRoomChange = (event) => {
    const selectedClassRoom = event.target.value;
    setClassRoom(selectedClassRoom);
    fetchUserData(grade, selectedClassRoom); // إرسال السنة مع الفصل الدراسي
  };

  // جلب حالة الحضور
  const fetchAttendanceStatus = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/router_IsUserPresentToday`);
      const data = await response.json();
      setAttendanceStatus(data);
    } catch (error) {
      console.error("Error fetching attendance records:", error);
    } finally {
      setLoading(false);
    }
  };

  // تسجيل الحضور
  const handleCheckIn = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkIn/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      setRefreshFlag(!refreshFlag); // تحديث البيانات
      const data = await res.json();
      if (res.ok) {
        fetchAttendanceStatus(); // تحديث حالة الحضور
      }
    } catch (error) {
      console.error("خطأ في تسجيل الحضور", error);
    }
  };
   // تسجيل الغياب
   const handlecancelCheckIn = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cancelCheckIn/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
      });
  
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
  
      const data = await res.json();
      setRefreshFlag(!refreshFlag); // تحديث البيانات
      fetchAttendanceStatus(); // تحديث حالة الحضور
    } catch (error) {
      console.error("خطأ في تسجيل الغياب", error);
    }
  };
  // عرض تفاصيل المستخدم
  const handleAdminClick = (userId, userName, userCode) => {
    setUserDetails({ userId, userName, userCode });
    setShowUserTable(true);
  };

  // تطبيع النصوص لتسهيل البحث
  const normalizeText = (text) => String(text).toLowerCase().normalize("NFKD");

  // جلب حالة الحضور للمستخدم
  const getAttendanceStatus = (userId) => {
    if (attendanceStatus) {
      const userAttendance = attendanceStatus.usersWithAttendance.find(item => item.userId === userId);
      return userAttendance ? "✅" : "❌";
    }
    return "";
  };

  // البحث في المستخدمين
  const handleSearch = (searchText) => {
    const normalizedSearchText = normalizeText(searchText);
    if (normalizedSearchText === "") {
      setFilteredUsers(allUsers); // إعادة تعيين المستخدمين عند حذف النص
      return;
    }
    const filtered = allUsers.filter(user => {
      const userName = normalizeText(user.names);
      const userCode = normalizeText(user.code);
      const attendanceStatus = getAttendanceStatus(user._id);
      return (
        userName.includes(normalizedSearchText) ||
        userCode.includes(normalizedSearchText) ||
        attendanceStatus.includes(normalizedSearchText)
      );
    });
    setFilteredUsers(filtered);
  };

  // فلترة الحاضرين فقط
  const filterPresentUsers = () => {
    const presentUsers = filteredUsers.filter(user => getAttendanceStatus(user._id) === "✅");
    setFilteredUsers(presentUsers);
  };

  // عرض جميع المستخدمين
  const showAllUsers = () => setFilteredUsers(allUsers);

  // فلتر السنة الدراسية
  const handleGradeChange = (event) => {
    const selectedGrade = event.target.value;
    setGrade(selectedGrade);
    fetchUserData(selectedGrade, classRoom); // إرسال الفصل الدراسي مع السنة
    fetchAttendanceStatus(); // استدعاء الفيتش لجلب بيانات الحضور
  };



  if (process.env.NEXT_PUBLIC_Pass_admin !== adminPass) {
    return (
        <div className="w-full max-w-md p-8 mt-[10%] ml-[20%] space-y-8 bg-white rounded-lg shadow-md">

      <div className="text-center py-4  flex-col justify-center items-center text-gray-500 bg-[#d7da8ea6] rounded-3xl">
        <h2> ادارة الحضور والغياب</h2>

        <h2>دخول بصلاحية الادمن (الادارة)</h2>
        <h2>يرجى إدخال كلمة المرور </h2>
        <input type="number" onChange={(e) => setAdminPass(e.target.value)} className='border-[#29ff94] bg-[#f5f7f5] text-[#000] pl-3' />
      </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full p-4 bg-[#4455442a] shadow-[0px_16px_44px_rgba(120,25,44,0.5)] ">


      {/* شريط البحث والأزرار */}
      <div className="flex flex-wrap items-center mb-4">
        <input
          type="text"
          placeholder="ابحث بالاسم أو الكود"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            handleSearch(e.target.value);
          }}
          className="border rounded-l-md p-2"
        />
        <button onClick={filterPresentUsers} className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600">
          الحاضرين فقط
        </button>
        <button onClick={showAllUsers} className="bg-gray-500 text-white p-2 ml-2 rounded-r-md hover:bg-gray-600">
          عرض الكل
        </button>
        <h2 className="text-center p-2 ml-2 font-bold">
          {format(new Date(), "EEEE , dd/ MM / yyyy", { locale: ar })}
        </h2>
      </div>

      {/* فلتر السنة */}
      <div className="mb-4">
        <select onChange={handleGradeChange} value={grade} className="border rounded p-2">
          <option value="">اختر السنة</option>
          {grades.map((grade) => (
            <option key={grade.grade} value={grade.grade}>
              {grade.grade}
            </option>
          ))}
        </select>
      </div>

      {/* فلتر الفصل */}
      <div className="mb-4">
        <select onChange={handleClassRoomChange} value={classRoom} className="border rounded p-2">
          <option value="">اختر الفصل</option>
          <option value="فصل 1">فصل 1</option>
          <option value="فصل 2">فصل 2</option>
          <option value="فصل 3">فصل 3</option>
        </select>
      </div>

      {/* الجدول */}
      <Table className="w-full border rounded-xl shadow-md">
        <TableHeader>
          <TableRow className="bg-[#5ceb5c] text-[#ffffff]">
            <TableHead>#</TableHead>
            <TableHead>الموبايل</TableHead>
            <TableHead>الاسم</TableHead>
            <TableHead>الفصل</TableHead>
            <TableHead>حضور اليوم</TableHead>
            <TableHead>الكود</TableHead>
            <TableHead>تسجيل غياب</TableHead>
            <TableHead>تسجيل حضور</TableHead>
            <TableHead>عرض</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loadingStatus ? (
            <TableRow>
              <TableCell colSpan={7} className="py-4"></TableCell>
            </TableRow>
          ) : filteredUsers && filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <TableRow key={user._id} className="border-b hover:bg-gray-100 bg-[#f1dea9c9]">
                <TableCell>{index + 1}</TableCell>
                <TableCell>0{user.phone}</TableCell>
                <TableCell>{user.names}</TableCell>
                <TableCell>{user.classRoom.match(/\d+/) ? user.classRoom.match(/\d+/)[0] : "لا يوجد رقم"}</TableCell>

                <TableCell>{loadingStatus ? "..." : getAttendanceStatus(user._id)}</TableCell>
                <TableCell>{user.code}</TableCell>
                <TableCell className="bg-[#f03820] rounded-3xl hover:bg-[#3eff4f57] cursor-pointer w-11" onClick={() => handlecancelCheckIn(user._id)}>
                    غياب
                </TableCell>
                <TableCell className="bg-[#5bf020a9] rounded-3xl hover:bg-[#3eff4f57] cursor-pointer w-11" onClick={() => handleCheckIn(user._id)}>
                    حضر
                </TableCell>
                <TableCell className="bg-[#2092f0a9] rounded-3xl hover:bg-[#656c88a9] cursor-pointer w-11" onClick={() => handleAdminClick(user._id, user.names, user.code)}>
                
                    السجل
                  
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                لا توجد بيانات لعرضها
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* السجل */}
      {showUserTable && (
        <section className="fixed justify-center top-[70px] bottom-0 right-0 left-0 bg-[#fff]">
          <span
            className="absolute top-2 right-5 text-[#ff2d2d] p-2 rounded-full bg-[#eaff2e] font-bold cursor-pointer"
            onClick={() => {
              setShowUserTable(false);
              setUserDetails({ userId: null, userName: null, userCode: null });
            }}
          >
            X
          </span>

          <h1 className="text-center text-[#91914c] text-2xl">السجل</h1>
          <div>
            <h1 className="text-center text-black text-2xl">{userDetails.userCode}: الكود</h1>
            <h1 className="text-center text-black text-2xl" style={{ direction: "ltr" }}>
              {userDetails.userName} / الاسم
            </h1>
          </div>

          <AttendanceTable userId={userDetails.userId} />
        </section>
      )}
             {/* زر ترحيل بيانات الطلاب للعام التالي   */}

             <PromoteStudents/>
    </div>
  );
};

export default UserTable;
