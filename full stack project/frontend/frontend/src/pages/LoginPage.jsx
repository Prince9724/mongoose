import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminLoginThunk, sendOTPThunk, verifyOTPThunk } from '../features/auth/authThunks';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  // ✅ Admin Login
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }
    try {
      const result = await dispatch(adminLoginThunk({ email, password })).unwrap();
      if (result?.success) {
        toast.success('Admin logged in successfully!');
        navigate('/admin/dashboard', { replace: true });
      }
    } catch (error) {
      console.error('❌ Admin Login Error:', error);
    }
  };

  // ✅ Customer Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter email');
      return;
    }
    try {
      const result = await dispatch(sendOTPThunk(email)).unwrap();
      if (result?.success) {
        setOtpSent(true);
        toast.success('OTP sent to your email!');
      }
    } catch (error) {
      console.error('❌ Send OTP Error:', error);
    }
  };

  // ✅ Customer Verify OTP - Ye function existing customer handle karega
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error('Please enter OTP');
      return;
    }
    if (!name) {
      toast.error('Please enter your name');
      return;
    }
    try {
      const result = await dispatch(verifyOTPThunk({ email, otp, name })).unwrap();
      console.log('✅ Verify Result:', result);
      if (result?.success) {
        toast.success('OTP Verified! Login Successful');
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.error('❌ Verify OTP Error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center">
          {isAdmin ? '🔐 Admin Login' : '👤 Customer Login'}
        </h2>

        {isAdmin ? (
          // ✅ Admin Login Form
          <form onSubmit={handleAdminLogin} className="mt-6 space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@shop.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Login'}
            </button>
          </form>
        ) : otpSent ? (
          // ✅ OTP Verify Form
          <form onSubmit={handleVerifyOTP} className="mt-6 space-y-4">
            <div className="bg-green-100 text-green-700 p-2 rounded text-center text-sm">
              ✅ OTP sent to <strong>{email}</strong>
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              maxLength="6"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="flex-1 bg-gray-200 py-2 rounded-lg hover:bg-gray-300"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>
          </form>
        ) : (
          // ✅ Send OTP Form
          <form onSubmit={handleSendOTP} className="mt-6 space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
        )}

        <button
          onClick={() => {
            setIsAdmin(!isAdmin);
            setOtpSent(false);
            setOtp('');
            setPassword('');
          }}
          className="w-full mt-4 text-sm text-blue-600 hover:underline"
        >
          {isAdmin ? '👤 Login as Customer →' : '🔐 Login as Admin →'}
        </button>

        {!isAdmin && (
          <p className="text-center text-xs text-gray-400 mt-4">
            Same email se login karein toh existing customer milega ✅
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;