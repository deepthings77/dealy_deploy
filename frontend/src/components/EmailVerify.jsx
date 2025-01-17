import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const VerifyEmailScreen = () => {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
const navigate = useNavigate();

    const handleVerify = async () => {
        if (!code.trim()) {
            toast.error("Please enter the verification code.");
            return;
        }

        setLoading(true);

        try {
            const res = await axios.post('https://dealy-deploy-r2gznzcg6-deepthings77s-projects.vercel.app/api/v1/user/verify-email', { code });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
                // Redirect to login or dashboard
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Verification failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{

            background: "#DF514E"
           
         }} className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-semibold mb-4">Verify Your Email</h1>
            <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter verification code"
                className="border rounded p-2 w-64 mb-4"
            />
            <button
                onClick={handleVerify}
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
                {loading ? "Verifying..." : "Verify Email"}
            </button>
        </div>
    );
};

export default VerifyEmailScreen;