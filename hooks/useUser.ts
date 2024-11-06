import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    } else {
      setUser(null);
    }
  }, []);

  return user;
}