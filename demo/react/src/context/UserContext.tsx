/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react';

interface UserInfo {
  userName: string;
  userEmail: string;
  userPhone: string;
}

interface UserContextValue extends UserInfo {
  setUser: (info: UserInfo) => void;
}

const UserContext = createContext<UserContextValue | null>(null);
const USER_SESSION_STORAGE_KEY = 'demo.user.info';
const EMPTY_USER_INFO: UserInfo = { userName: '', userEmail: '', userPhone: '' };

function getUserInfoFromSessionStorage(): UserInfo {
  if (typeof window === 'undefined') {
    return EMPTY_USER_INFO;
  }

  try {
    const stored = window.sessionStorage.getItem(USER_SESSION_STORAGE_KEY);
    if (!stored) {
      return EMPTY_USER_INFO;
    }

    const parsed = JSON.parse(stored) as Partial<UserInfo>;
    return {
      userName: parsed.userName ?? '',
      userEmail: parsed.userEmail ?? '',
      userPhone: parsed.userPhone ?? ''
    };
  } catch {
    return EMPTY_USER_INFO;
  }
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<UserInfo>(() => getUserInfoFromSessionStorage());

  function setUser(info: UserInfo) {
    setUserState(info);

    if (typeof window === 'undefined') {
      return;
    }

    try {
      window.sessionStorage.setItem(USER_SESSION_STORAGE_KEY, JSON.stringify(info));
    } catch {
      // Ignore storage errors
    }
  }

  return (
    <UserContext.Provider value={{ ...user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}