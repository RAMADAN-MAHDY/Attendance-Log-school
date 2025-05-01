# Attendance Log School | سجل الحضور المدرسي

## Overview | نظرة عامة
Attendance Log School is a web-based application designed to manage student attendance efficiently. It provides features for logging attendance, viewing attendance reports, and managing student data. The application is tailored for primary school use and supports Arabic language.

تطبيق سجل الحضور المدرسي هو تطبيق ويب مصمم لإدارة حضور الطلاب بكفاءة. يوفر ميزات لتسجيل الحضور، عرض تقارير الحضور، وإدارة بيانات الطلاب. التطبيق مخصص للاستخدام في المدارس الابتدائية ويدعم اللغة العربية.

---

## Features | الميزات
- **Student Attendance Management**: Log attendance for students and track their check-in and check-out times.  
  **إدارة حضور الطلاب**: تسجيل حضور الطلاب وتتبع أوقات تسجيل الدخول والخروج.
- **Attendance Reports**: View detailed attendance records filtered by month and year.  
  **تقارير الحضور**: عرض سجلات الحضور التفصيلية المصفاة حسب الشهر والسنة.
- **Admin Panel**: Manage student data, promote students to the next grade, and handle attendance records.  
  **لوحة الإدارة**: إدارة بيانات الطلاب، ترقية الطلاب إلى الصف التالي، والتعامل مع سجلات الحضور.
- **Responsive Design**: Optimized for both desktop and mobile devices.  
  **تصميم متجاوب**: مُحسّن لأجهزة الكمبيوتر المكتبية والهواتف المحمولة.
- **Authentication**: Secure login system for students and administrators.  
  **المصادقة**: نظام تسجيل دخول آمن للطلاب والإداريين.

---

## Technologies Used | التقنيات المستخدمة
- **Frontend**: React, Next.js, Tailwind CSS  
  **الواجهة الأمامية**: React، Next.js، Tailwind CSS
- **Backend**: API integration for data management  
  **الخلفية**: تكامل API لإدارة البيانات
- **State Management**: React hooks  
  **إدارة الحالة**: React hooks
- **Utilities**: date-fns for date formatting  
  **الأدوات**: مكتبة date-fns لتنسيق التواريخ

---

## Installation | التثبيت

### English
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/attendance-log-school.git
   ```

2. Navigate to the project directory:
   ```bash
   cd attendance-log-school
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   NEXT_PUBLIC_API_URL=your_api_url
   NEXT_PUBLIC_Pass_admin=your_admin_password
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open the application in your browser at `http://localhost:3000`.

---

### العربية
1. قم باستنساخ المستودع:
   ```bash
   git clone https://github.com/your-username/attendance-log-school.git
   ```

2. انتقل إلى مجلد المشروع:
   ```bash
   cd attendance-log-school
   ```

3. قم بتثبيت التبعيات:
   ```bash
   npm install
   ```

4. أنشئ ملف `.env` في المجلد الرئيسي وأضف المتغيرات البيئية التالية:
   ```env
   NEXT_PUBLIC_API_URL=your_api_url
   NEXT_PUBLIC_Pass_admin=your_admin_password
   ```

5. ابدأ خادم التطوير:
   ```bash
   npm run dev
   ```

6. افتح التطبيق في متصفحك على `http://localhost:3000`.

---

## Project Structure | هيكل المشروع
- **`src/app`**: Contains pages and components for the application.  
  **`src/app`**: يحتوي على الصفحات والمكونات للتطبيق.
- **`src/components`**: Reusable UI components.  
  **`src/components`**: مكونات واجهة المستخدم القابلة لإعادة الاستخدام.
- **`src/utils`**: Utility files for shared logic.  
  **`src/utils`**: ملفات الأدوات للمنطق المشترك.
- **`tailwind.config.ts`**: Tailwind CSS configuration.  
  **`tailwind.config.ts`**: تكوين Tailwind CSS.
- **`tsconfig.json`**: TypeScript configuration.  
  **`tsconfig.json`**: تكوين TypeScript.

---

## Scripts | السكربتات
- `npm run dev`: Start the development server.  
  `npm run dev`: بدء خادم التطوير.
- `npm run build`: Build the application for production.  
  `npm run build`: بناء التطبيق للإنتاج.
- `npm run start`: Start the production server.  
  `npm run start`: بدء خادم الإنتاج.
- `npm run lint`: Run linting checks.  
  `npm run lint`: تشغيل فحوصات التنسيق.

---

## Contributing | المساهمة
### English
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push them to your fork.
4. Submit a pull request.

### العربية
المساهمات مرحب بها! يرجى اتباع الخطوات التالية:
1. قم بعمل Fork للمستودع.
2. أنشئ فرعًا جديدًا لإضافتك أو إصلاح الأخطاء.
3. قم بحفظ تغييراتك وادفعها إلى المستودع الخاص بك.
4. أرسل طلب سحب (Pull Request).

---

## License | الرخصة
This project is licensed under the MIT License. See the `LICENSE` file for details.  
هذا المشروع مرخص بموجب رخصة MIT. راجع ملف `LICENSE` لمزيد من التفاصيل.

---

## Contact | التواصل
### English
For any inquiries or support, please contact [ramadanmahdy45@gmail.com].

### العربية
لأي استفسارات أو دعم، يرجى التواصل عبر البريد الإلكتروني [ramadanmahdy45@gmail.com].