import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Brain, Heart, Calendar, Users, BookOpen, Mail, Phone, MapPin, Quote } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Carousel from 'react-bootstrap/Carousel';
import bannerImage from '/banner.jpg';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../main'; // Asegúrate de importar correctamente tu configuración de Firebase

function CarouselFadeExample() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img src={bannerImage} alt="First slide" className="d-block w-100" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={bannerImage} alt="Second slide" className="d-block w-100" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={bannerImage} alt="Third slide" className="d-block w-100" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

function TestimonioCard({ testimonio }) {
  const [imgSrc, setImgSrc] = useState(testimonio.image); // Estado para manejar la URL de la imagen

  return (
    <div
      key={testimonio.id}
      className="bg-green-50 p-8 rounded-lg relative flex flex-col h-[350px]" // Contenedor principal
    >
      <Quote className="h-8 w-8 text-green-600 absolute top-4 left-4 opacity-20" />
      <div className="relative z-10 flex flex-col flex-grow justify-between">
        {/* Texto del testimonio */}
        <p className="text-gray-600 mb-4 italic flex-grow flex items-center justify-center line-clamp-3">
          {testimonio.testimonial}
        </p>
        {/* Imagen y datos del usuario */}
        <div className="flex items-center">
          <img
            src={imgSrc} // URL de la imagen desde el estado
            alt={testimonio.name} // Nombre del testimonio como texto alternativo
            className="h-12 w-12 rounded-full object-cover"
            onError={() => setImgSrc('/profilepicture.png')} // Cambiar a imagen predeterminada si falla
          />
          <div className="ml-4">
            <h4 className="font-semibold text-gray-900">{testimonio.name}</h4>
            <p className="text-sm text-gray-500">{testimonio.country}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Define el tipo de los datos de los cursos
interface Course {
  id: string; // El ID del documento en Firestore
  name: string;
  desc: string;
  sub: string;
}

function HomePage() {
  const { isAuthenticated } = useAuth();
  const [testimonios, setTestimonios] = useState<{ id: string; testimonial: string; image: string; name: string; country: string }[]>([]);
  const [courses, setCourses] = useState<Course[]>([]); // Define el estado con el tipo Course[]

  useEffect(() => {
    const fetchTestimonios = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'testimonios'));
        const testimoniosData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          testimonial: doc.data().testimonial || '',
          image: doc.data().image || '',
          name: doc.data().name || '',
          country: doc.data().country || '',
        }));

        // Filtrar los testimonios con IDs específicos
        const filteredTestimonios = testimoniosData.filter(testimonio =>
          ['1', '2', '3'].includes(testimonio.id) // IDs explícitos
        );

        setTestimonios(filteredTestimonios);
      } catch (error) {
        console.error('Error fetching testimonios:', error);
      }
    };

    fetchTestimonios();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'proxcourses'));
        const coursesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Courses Data:", coursesData); // Verifica los datos obtenidos

        const filteredCourses = coursesData.filter(course =>
          ['bio2024', 'maestriabio2023'].includes(course.id) // IDs explícitos
        );

        console.log("Filtered Courses:", filteredCourses); // Verifica los cursos filtrados

        setCourses(filteredCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <img src="/logo.png" alt="Sentir Salud Logo" className="h-12 w-12 rounded-full object-cover" />
              <span className="ml-2 text-xl font-semibold text-gray-800">Sentir Salud Capacitacion</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#inicio" className="text-gray-600 hover:text-green-600">Inicio</a>
              <a href="#servicios" className="text-gray-600 hover:text-green-600">Servicios</a>
              <a href="#cursos" className="text-gray-600 hover:text-green-600">Cursos</a>
              <a href="#testimonios" className="text-gray-600 hover:text-green-600">Testimonios</a>
              <a href="#contacto" className="text-gray-600 hover:text-green-600">Contacto</a>
              {isAuthenticated ? (
                <Link to="/cursos" className="text-green-600 hover:text-green-700 font-semibold">
                  Mis Cursos
                </Link>
              ) : (
                <Link to="/login" className="text-green-600 hover:text-green-700 font-semibold">
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      
      {/* Hero Section with Banner */}
      <section id="inicio" className="relative">
        <CarouselFadeExample />
        {/*<div className="absolute inset-0 z-0">
          <img 
            src="/banner.jpg" 
            alt="Biodescodificación" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Descubre el Poder de la Biodescodificación
            </h1>
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Formación profesional en terapias alternativas para transformar vidas a través del entendimiento profundo de la conexión mente-cuerpo.
            </p>
            <a href="#contacto" className="inline-block bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors">
              Comienza Tu Viaje
            </a>
          </div>
        </div>*/}
      </section>

      {/* Rest of the sections remain the same */}
      {/* Services Section */}
      <section id="servicios" className="py-20 bg-white">
        {/* ... (same content as before) ... */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Nuestros Servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-green-50 rounded-lg">
              <Brain className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Biodescodificación</h3>
              <p className="text-gray-600">Descubre el origen emocional de tus síntomas y transforma tu salud desde la raíz.</p>
            </div>
            <div className="p-6 bg-green-50 rounded-lg">
              <Heart className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Terapias Holísticas</h3>
              <p className="text-gray-600">Integración de diferentes técnicas para un abordaje completo de tu bienestar.</p>
            </div>
            <div className="p-6 bg-green-50 rounded-lg">
              <BookOpen className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Formación Profesional</h3>
              <p className="text-gray-600">Programas certificados para convertirte en un terapeuta holístico profesional.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="cursos" className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Próximos Cursos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.length > 0 ? (
              courses.map(course => (
                <div key={course.id} className="bg-white p-6 rounded-lg shadow-md">
                  <Calendar className="h-8 w-8 text-green-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
                  <p className="text-gray-600 mb-4">{course.desc}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{course.sub}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No hay cursos disponibles.</p>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonios" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Testimonios de Nuestros Alumnos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonios.map(testimonio => (
              <TestimonioCard key={testimonio.id} testimonio={testimonio} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Contáctanos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center mb-6">
                <Mail className="h-6 w-6 text-green-600 mr-3" />
                <span className="text-gray-600">info@sentirsalud.com</span>
              </div>
              <div className="flex items-center mb-6">
                <Phone className="h-6 w-6 text-green-600 mr-3" />
                <span className="text-gray-600">+598 966 11764</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-green-600 mr-3" />
                <span className="text-gray-600">Montevideo, Uruguay</span>
              </div>
            </div>
            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Nombre"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <textarea
                  placeholder="Mensaje"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>

      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <img src="/logo.png" alt="Sentir Salud Logo" className="h-8 w-8 rounded-full object-cover" />
              <span className="ml-2 text-xl font-semibold">Sentir Salud Capacitacion</span>
            </div>
            <div className="text-sm text-gray-400">
              © 2024 Sentir Salud Capacitacion. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;