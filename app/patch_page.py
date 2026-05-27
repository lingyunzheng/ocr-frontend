import os
import re

path = r"F:\ocr-frontend\app\page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add imports
import_target = "import { useState, useRef } from 'react';"
import_replacement = """import { useState, useRef, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

interface UserProfile {
  email: string;
  name: string;
  picture?: string;
}"""
content = content.replace(import_target, import_replacement, 1)

# 2. Add state and logic in OCRPage
logic_target = "  const [paddleAlert, setPaddleAlert] = useState(false);"
logic_replacement = """  const [paddleAlert, setPaddleAlert] = useState(false);
  
  // Auth state
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Check for SSO Token in URL on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 1. Check URL for sso_token
      const urlParams = new URLSearchParams(window.location.search);
      const ssoToken = urlParams.get('sso_token');
      
      if (ssoToken) {
        try {
          const decoded = jwtDecode<any>(ssoToken);
          const profile: UserProfile = {
            email: decoded.email,
            name: decoded.name,
            picture: decoded.picture
          };
          setUserProfile(profile);
          localStorage.setItem('cloud_auth_token', ssoToken);
          
          // Remove token from URL for security and clean look
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (e) {
          console.error("Invalid SSO token:", e);
        }
      } else {
        // 2. Check local storage
        const savedToken = localStorage.getItem('cloud_auth_token');
        if (savedToken) {
          try {
            const decoded = jwtDecode<any>(savedToken);
            setUserProfile({
              email: decoded.email,
              name: decoded.name,
              picture: decoded.picture
            });
          } catch (e) {
            localStorage.removeItem('cloud_auth_token');
          }
        }
      }
    }
  }, []);

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // Here we only get an access_token by default, we need to fetch user info
      try {
        const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        }).then(res => res.json());
        
        setUserProfile({
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture
        });
        
        // For MoR later, you would send tokenResponse.access_token to your backend to get a JWT
        // For now, we just save a mock flag or the access_token
        localStorage.setItem('cloud_auth_token', tokenResponse.access_token);
      } catch (e) {
        console.error("Failed to fetch user info", e);
      }
    },
    onError: errorResponse => console.error(errorResponse),
  });

  const handleLogout = () => {
    setUserProfile(null);
    localStorage.removeItem('cloud_auth_token');
  };
"""
content = content.replace(logic_target, logic_replacement, 1)

# 3. Add UI to header
header_target = """        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Offline OCR
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Math & Word Recognition</p>
          </div>
          <div className="flex gap-2">"""
header_replacement = """        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Offline OCR
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Math & Word Recognition</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Auth Section */}
            {userProfile ? (
              <div className="flex items-center gap-3 bg-white dark:bg-slate-700 px-3 py-1.5 rounded-full shadow-sm border border-gray-100 dark:border-slate-600 hidden sm:flex">
                {userProfile.picture ? (
                  <img src={userProfile.picture} alt="Avatar" className="w-6 h-6 rounded-full" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xs">
                    {userProfile.name?.charAt(0) || userProfile.email?.charAt(0)}
                  </div>
                )}
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200 max-w-[100px] truncate">
                  {userProfile.name || userProfile.email.split('@')[0]}
                </span>
                <button 
                  onClick={handleLogout}
                  className="text-xs text-red-500 hover:text-red-700 ml-1 font-medium"
                  title="Sign Out"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => loginWithGoogle()}
                className="flex items-center gap-2 bg-white dark:bg-slate-700 px-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-slate-600 transition-all font-medium text-sm text-gray-700 dark:text-gray-200"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                {language === 'zh' ? '登录' : 'Sign In'}
              </button>
            )}

            <div className="flex gap-2">"""
content = content.replace(header_target, header_replacement, 1)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated page.tsx with Google Login and SSO")
