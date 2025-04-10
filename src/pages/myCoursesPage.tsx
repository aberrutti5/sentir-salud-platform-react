import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../main';
import { BookOpen } from 'lucide-react';

function CoursesPage() {
  const { user, logout } = useAuth(); // Obtiene el usuario autenticado y la función de logout
  const navigate = useNavigate();
  const [courses, setCourses] = useState<any[]>([]); // Cursos comprados
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      console.log('Usuario no autenticado, redirigiendo a /login');
      navigate('/login'); // Redirige al inicio de sesión si no hay usuario autenticado
      return;
    }

    const fetchPurchasedCourses = async () => {
      try {
        console.log('Obteniendo documento del usuario con UID:', user.uid);

        // Realiza una consulta para buscar el documento donde el campo `uid` coincida con el UID del usuario
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0]; // Obtén el primer documento que coincida
          console.log('Documento del usuario encontrado:', userDoc.data());
          const purchasedCourses = userDoc.data()?.purchasedCourses || [];
          console.log('Cursos comprados obtenidos:', purchasedCourses);
          setCourses(purchasedCourses); // Almacena los cursos comprados
        } else {
          console.error('No se encontró un documento para el UID proporcionado.');
        }
      } catch (error) {
        console.error('Error al obtener los cursos comprados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasedCourses();
  }, [user, navigate]);

  if (loading) return <p className="text-center text-gray-600">Cargando cursos...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="ml-2 text-xl font-semibold text-gray-800">Mis Cursos</span>
            </div>
            <button
              onClick={logout} // Llama a la función de logout
              className="bg-green-700 text-white font-bold px-4 py-2 rounded-md hover:bg-green-800 transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Hola, {user?.name || 'Usuario'} 👋
        </h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div
                key={course.id}
                onClick={() => navigate(`/courses/${course.id}`)} // Redirige al curso
                className="bg-white overflow-hidden shadow rounded-lg transform transition-transform duration-200 hover:scale-105 hover:shadow-lg hover:shadow-green-500/50 cursor-pointer"
              >
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <BookOpen className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{course.name}</h3>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-600">{course.desc}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No has comprado ningún curso.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default CoursesPage;