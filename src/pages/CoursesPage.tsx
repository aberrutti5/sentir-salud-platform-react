import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Video, FileText, CheckCircle } from 'lucide-react';

function CoursesPage() {
  const { logout } = useAuth();

  const courses = [
    {
      id: 1,
      title: 'Introducción a la Biodescodificación',
      progress: 60,
      totalLessons: 12,
      completedLessons: 7,
      nextLesson: 'Las 5 Leyes Biológicas',
    },
    {
      id: 2,
      title: 'Técnicas Avanzadas de Sanación',
      progress: 30,
      totalLessons: 15,
      completedLessons: 4,
      nextLesson: 'Protocolos de Sanación',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/">
                <img src="/logo.png" alt="Sentir Salud Logo" className="h-12 w-12 rounded-full object-cover" />
              </Link>
              <span className="ml-2 text-xl font-semibold text-gray-800">Mis Cursos</span>
            </div>
            <button
              onClick={logout}
              className="text-gray-600 hover:text-green-600"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {courses.map((course) => (
              <div key={course.id} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <BookOpen className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {course.title}
                      </h3>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="relative">
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-100">
                        <div
                          style={{ width: `${course.progress}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-600"
                        ></div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {course.completedLessons} de {course.totalLessons} lecciones completadas
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-900">Próxima lección:</h4>
                    <div className="mt-2 flex items-center text-sm text-gray-600">
                      <Video className="h-5 w-5 text-green-600 mr-2" />
                      {course.nextLesson}
                    </div>
                  </div>

                  <div className="mt-6">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                      Continuar Curso
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default CoursesPage