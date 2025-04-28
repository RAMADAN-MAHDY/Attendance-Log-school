import SignINForm from '@/app/componant/sinIn';

const signin = () => {
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
            <SignINForm />
        </div>
        </div>
    );
    }   

export default signin;
