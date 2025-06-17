import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Brain, Heart, Calendar, Users, BookOpen, Mail, Phone, MapPin, Quote } from 'lucide-react';
import Carousel from 'react-bootstrap/Carousel';
import { supabase, CarouselSlide } from '../lib/supabase';

interface Testimonio {
  id: string;
  testimonial: string;
  image: string;
  name: string;
  country: string;
}

function CarouselFadeExample() {
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSlides() {
      try {
        const { data, error } = await supabase
          .from('carousel_slides')
          .select('*')
          .order('orden', { ascending: true });

        if (error) throw error;
        setSlides(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar los slides');
      } finally {
        setLoading(false);
      }
    }

    fetchSlides();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center bg-gray-100">
        <div className="text-gray-600">Cargando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center bg-gray-100">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <Carousel fade className="w-full">
        {slides.map((slide) => (
          <Carousel.Item key={slide.id} className="lg:h-auto">
            {slide.link ? (
              <a href={slide.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-auto lg:bg-black">
                  <img 
                    src={slide.image_url} 
                    alt={slide.title} 
                    className="w-full h-full object-cover lg:object-contain"
                  />
                  {slide.show_overlay !== false && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
                  )}
                </div>
                <Carousel.Caption className="relative z-[2] bottom-0 pb-4 md:pb-8">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">{slide.title}</h3>
                  <p className="text-sm md:text-base lg:text-lg">{slide.subtitle}</p>
                </Carousel.Caption>
              </a>
            ) : (
              <>
                <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-auto lg:bg-black">
                  <img 
                    src={slide.image_url} 
                    alt={slide.title} 
                    className="w-full h-full object-cover lg:object-contain"
                  />
                  {slide.show_overlay !== false && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
                  )}
                </div>
                <Carousel.Caption className="relative z-[2] bottom-0 pb-4 md:pb-8">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">{slide.title}</h3>
                  <p className="text-sm md:text-base lg:text-lg">{slide.subtitle}</p>
                </Carousel.Caption>
              </>
            )}
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

function TestimonioCard({ testimonio }: { testimonio: Testimonio }) {
  const [imgSrc, setImgSrc] = useState(testimonio.image);

  return (
    <div
      key={testimonio.id}
      className="bg-green-50 p-8 rounded-lg relative flex flex-col h-[350px]"
    >
      <Quote className="h-8 w-8 text-green-600 absolute top-4 left-4 opacity-20" />
      <div className="relative z-10 flex flex-col flex-grow justify-between">
        <p className="text-gray-600 mb-4 italic flex-grow flex items-center justify-center line-clamp-3">
          {testimonio.testimonial}
        </p>
        <div className="flex items-center">
          <img
            src={imgSrc}
            className="h-12 w-12 rounded-full object-cover"
            onError={() => setImgSrc('/profilepicture.png')}
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

function HomePage() {
  const navigate = useNavigate();
  const [testimonios] = useState([
    {
      id: '1',
      testimonial: 'La Biodescodificación ha transformado mi vida completamente. Ahora entiendo mejor mis emociones y cómo afectan mi salud.',
      image: '/testimonio1.jpg',
      name: 'María González',
      country: 'Uruguay'
    },
    {
      id: '2',
      testimonial: 'Los cursos son excelentes, muy bien estructurados y con un contenido de calidad. Los recomiendo totalmente.',
      image: '/testimonio2.jpg',
      name: 'Juan Pérez',
      country: 'Argentina'
    },
    {
      id: '3',
      testimonial: 'Las sesiones personalizadas me han ayudado a superar bloqueos emocionales que tenía desde hace años.',
      image: '/testimonio3.jpg',
      name: 'Ana Martínez',
      country: 'España'
    }
  ]);

  const [courses] = useState([
    {
      id: 'bio2024',
      name: 'Curso de Biodescodificación 2024',
      desc: 'Aprende las bases de la Biodescodificación y cómo aplicarla en tu vida diaria.',
      sub: 'Inicio: Marzo 2024'
    },
    {
      id: 'maestriabio2023',
      name: 'Maestría en Biodescodificación',
      desc: 'Formación avanzada para convertirte en un profesional de la Biodescodificación.',
      sub: 'Inicio: Abril 2024'
    }
  ]);

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <img
                  className="h-8 w-auto"
                  src="/logo.png"
                  alt="Sentir Salud"
                />
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#inicio" className="text-gray-600 hover:text-green-600 no-underline">Inicio</a>
              <a href="#servicios" className="text-gray-600 hover:text-green-600 no-underline">Servicios</a>
              <a href="#cursos" className="text-gray-600 hover:text-green-600 no-underline">Cursos</a>
              <a href="#testimonios" className="text-gray-600 hover:text-green-600 no-underline">Testimonios</a>
              <a href="#contacto" className="text-gray-600 hover:text-green-600 no-underline">Contacto</a>
              <Link
                to="/login"
                className="bg-green-600 text-white font-bold px-4 py-2 rounded-md hover:bg-green-700 transition-colors no-underline"
              >
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section id="inicio" className="relative">
        <CarouselFadeExample />
      </section>

      <section id="servicios" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Nuestros Servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative p-6 bg-green-50 rounded-lg cursor-pointer transition-all duration-300 hover:bg-green-600 hover:shadow-lg group">
              <Link to="/bioinfo" className="absolute inset-0 z-10"></Link>
              <div className="absolute top-2 right-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-600 group-hover:text-white transition-colors duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="flex flex-col items-start">
                <Brain className="h-12 w-12 text-green-600 group-hover:text-white transition-colors duration-300 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-white transition-colors duration-300">
                  Biodescodificación
                </h3>
                <p className="text-gray-600 group-hover:hidden transition-opacity duration-300">
                  Descubre el origen emocional de tus síntomas y transforma tu salud desde la raíz.
                </p>
                <p className="hidden group-hover:block text-white text-lg font-semibold transition-opacity duration-300">
                  Conoce de qué se trata.
                </p>
              </div>
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

      <section id="cursos" className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Próximos Cursos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map(course => (
              <div
                key={course.id}
                onClick={() => navigate(`/courses/${course.id}`)}
                className="bg-white p-6 rounded-lg shadow-md transform transition-transform duration-200 hover:scale-105 hover:shadow-lg hover:shadow-green-500/50 cursor-pointer"
              >
                <Calendar className="h-8 w-8 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
                <p className="text-gray-600 mb-4">{course.desc}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{course.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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

      <section id="contacto" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Contáctanos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center mb-6">
                <Mail className="h-6 w-6 text-green-600 mr-3" />
                <span className="text-gray-600">administracion@sentirsaludcapacitacion.com</span>
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
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;