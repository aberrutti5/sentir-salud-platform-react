import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Brain, Heart, Calendar, Users, BookOpen, Mail, Phone, MapPin, Quote } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function HomePage() {
  const { isAuthenticated } = useAuth();

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
        <div className="absolute inset-0 z-0">
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
        </div>
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
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Calendar className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Formación en Biodescodificación</h3>
              <p className="text-gray-600 mb-4">Curso completo de 6 meses para certificarte como terapeuta en biodescodificación.</p>
              <div className="flex items-center text-sm text-gray-500">
                <Users className="h-4 w-4 mr-2" />
                <span>Cupos limitados</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Calendar className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Taller Intensivo de Sanación Emocional</h3>
              <p className="text-gray-600 mb-4">Aprende técnicas prácticas para liberar emociones bloqueadas y patrones limitantes.</p>
              <div className="flex items-center text-sm text-gray-500">
                <Users className="h-4 w-4 mr-2" />
                <span>Modalidad presencial y online</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonios" className="py-20 bg-white">
        {/* ... (same content as before) ... */}
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
                <span className="text-gray-600">+54 11 1234-5678</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-green-600 mr-3" />
                <span className="text-gray-600">Buenos Aires, Argentina</span>
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

export default HomePage