"use client";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-6">
      <div className="container mx-auto px-4 text-center">
        {/* حقوق الملكية */}
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} . جميع الحقوق محفوظة.
        </p>

                {/* لينك البورتفوليو */}
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          تم التطوير بواسطة{" "}
          <a
            href="https://ramadan-three.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline dark:text-[#00e1ff] text-[#861111] hover:text-blue-500 transition-colors duration-300 font-bold"
          >
            رمضان
          </a>
        </p>

        {/* روابط وسائل التواصل الاجتماعي */}
        {/* <div className="flex justify-center mt-4 space-x-4">
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors duration-300"
          >
            <i className="fab fa-linkedin fa-lg"></i>
          </a>
          <a
            href="https://www.behance.net"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors duration-300"
          >
            <i className="fab fa-behance fa-lg"></i>
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
           >
            <i className="fab fa-instagram fa-lg"></i>
          </a>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;