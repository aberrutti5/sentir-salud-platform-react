import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../main'; // Importa la configuración de Firebase

function CoursePage() {
  const { id } = useParams(); // Obtiene el ID del curso desde la URL
  const [course, setCourse] = useState<any>(null); // Estado para almacenar los datos del curso
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseRef = doc(db, 'proxcourses', id!); // Referencia al documento del curso
        const courseDoc = await getDoc(courseRef);

        if (courseDoc.exists()) {
          setCourse(courseDoc.data()); // Almacena los datos del curso
        } else {
          setError('El curso no existe.');
        }
      } catch (err) {
        console.error('Error al obtener el curso:', err);
        setError('Hubo un error al cargar el curso.');
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return <p className="text-center text-gray-600">Cargando curso...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // Renderiza contenido personalizado según el tipo de curso
  const renderCourseContent = () => {
    switch (course.template) {
      case 'biodescodificacion':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Contenido del Curso de Biodescodificación</h2>
            <ul className="list-disc pl-6">
              {course.lessons.map((lesson: any, index: number) => (
                <li key={index} className="mb-2">
                  <strong>{lesson.title}:</strong> {lesson.content}
                </li>
              ))}
            </ul>
          </div>
        );
      case 'terapias-holisticas':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Contenido del Curso de Terapias Holísticas</h2>
            <p>{course.desc}</p>
            <p>Duración: {course.duration}</p>
          </div>
        );
      default:
        // Diseño por defecto si no se encuentra un template específico
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Contenido del Curso</h2>
            <p className="text-gray-700 mb-4">{course.desc}</p>
            <p className="text-gray-600">Duración: {course.duration || 'No especificada'}</p>
            <p className="text-gray-600">Subtítulo: {course.sub || 'No especificado'}</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{course.name}</h1>
      <p className="text-gray-700 mb-4">{course.desc}</p>
      <div className="bg-green-50 p-6 rounded-lg shadow-md">
        {renderCourseContent()}
      </div>
    </div>
  );
}

export default CoursePage;