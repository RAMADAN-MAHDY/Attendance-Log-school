
import UserTable from '../componant/Administration.js';

const Administration = async () => {
 
  return (
    
    <>
      <h1 className='font-bold ml-[30%] mb-3 bg-[#e7c7c7] text-center w-[200px] p-3 rounded-3xl shadow-2xl'> بسم الله الرحمن الرحيم</h1>
      <h1 className='font-bold ml-[30%] mb-3 text-[#fff] bg-[#bbb0b0] text-center w-[200px] p-3 rounded-3xl shadow-[0px_4px_10px_rgba(120,25,44,0.5)] '>ادارة الحضور والغياب</h1>
      <UserTable/>
    </>
  );
};

export default Administration;