import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";

function CoursesPage() {
  const navigate = useNavigate();
  const [courses] = useState<any[]>([]); // Los cursos ya no se obtienen de Firebase
  const [loading] = useState(false); // La carga ya no es necesaria sin Firebase

  // La función handleLogout y la lógica de usuario se eliminan ya que no hay Firebase Auth.

  if (loading) return <p className="text-center text-gray-600">Cargando cursos...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="ml-2 text-xl font-semibold text-gray-800">Mis Cursos</span>
            </div>
            {/* El botón de Cerrar Sesión se elimina ya que no hay autenticación */}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Hola, Usuario 👋
        </h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div
                key={course.id}
                onClick={() => navigate(`/courses/${course.id}`)}
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
            <p className="text-center text-gray-500">No hay cursos disponibles.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default CoursesPage;