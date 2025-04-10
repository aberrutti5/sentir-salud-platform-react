import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../main';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        console.log('Usuario autenticado:', currentUser);

        // Realiza una consulta para buscar el documento donde el campo `uid` coincida con el UID del usuario
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('uid', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0]; // Obtén el primer documento que coincida
          const userData = userDoc.data();
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            name: userData.name, // Obtén el nombre del usuario
          });
        } else {
          console.error('No se encontró el documento del usuario en Firestore.');
          setUser(null);
        }
      } else {
        console.log('No hay usuario autenticado.');
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);