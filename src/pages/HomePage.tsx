import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Heart, Calendar, Users, BookOpen, Mail, Phone, MapPin, Quote } from 'lucide-react';
import Carousel from 'react-bootstrap/Carousel';
import { supabase, CarouselSlide } from '../lib/supabase';

// ── Scroll-reveal hook ──────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ── Wave SVG divider ────────────────────────────────────────────────────────
function WaveDivider({ fill = '#f0fdf4' }: { fill?: string }) {
  return (
    <div className="w-full overflow-hidden leading-none">
      <svg viewBox="0 0 1200 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
        className="w-full h-14 block">
        <path d="M0,30 C400,60 800,0 1200,30 L1200,60 L0,60 Z" fill={fill} />
      </svg>
    </div>
  );
}

// ── Carousel ─────────────────────────────────────────────────────────────────
function CarouselFadeExample() {
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const fallbackSlides: CarouselSlide[] = [
    {
      id: 0,
      title: 'El Cáncer No Es Tu Enemigo',
      subtitle: 'El camino hacia la sanación desde la Biodescodificación',
      image_url: '/nuevo-ebook.jpg',
      mobile_image_url: '/nuevo-ebook.jpg',
      link: '/ebook',
      show_overlay: false,
      orden: 1
    },
    {
      id: 1,
      title: 'Bienvenidos a Sentir Salud',
      subtitle: 'Descubre el poder de la Biodescodificación',
      image_url: '/banner.jpg',
      mobile_image_url: '/banner.jpg',
      link: undefined,
      show_overlay: true,
      orden: 2
    },
    {
      id: 2,
      title: 'Formación Profesional',
      subtitle: 'Conviértete en un terapeuta holístico certificado',
      image_url: '/banner2.jpg',
      mobile_image_url: '/banner2.jpg',
      link: undefined,
      show_overlay: true,
      orden: 3
    },
    {
      id: 3,
      title: 'Terapias Personalizadas',
      subtitle: 'Acompañamiento individual para tu sanación',
      image_url: '/banner3.jpg',
      mobile_image_url: '/banner3.jpg',
      link: undefined,
      show_overlay: true,
      orden: 4
    }
  ];

  useEffect(() => {
    async function fetchSlides() {
      try {
        const { data, error } = await supabase
          .from('carousel_slides')
          .select('*')
          .order('orden', { ascending: true });
        if (error) throw error;
        setSlides(fallbackSlides);
      } catch {
        setSlides(fallbackSlides);
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

  const SlideImage = ({ slide }: { slide: CarouselSlide }) => (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-auto lg:bg-black">
      <picture>
        {slide.mobile_image_url && (
          <source media="(max-width: 1023px)" srcSet={slide.mobile_image_url} />
        )}
        <img
          src={slide.image_url}
          alt={slide.title}
          className="w-full h-full object-cover lg:object-contain"
        />
      </picture>
      {slide.show_overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
      )}
    </div>
  );

  const visibleSlides = isMobile ? slides.slice(1) : slides;

  return (
    <div className="relative w-full">
      <Carousel fade className="w-full">
        {visibleSlides.map((slide, index) => (
          <Carousel.Item key={slide.id} className="lg:h-auto">
            {slide.link ? (
              slide.link.startsWith('/') ? (
                <Link to={slide.link} className="block w-full h-full">
                  <SlideImage slide={slide} />
                  {/* First slide: image already has text — skip caption */}
                  {index !== 0 && (
                    <Carousel.Caption className="relative z-[2] bottom-0 pb-4 md:pb-8">
                      <h3 className="font-rem text-xl md:text-2xl lg:text-3xl font-bold mb-2 drop-shadow-lg">{slide.title}</h3>
                      <p className="font-rem text-sm md:text-base lg:text-lg drop-shadow-md">{slide.subtitle}</p>
                    </Carousel.Caption>
                  )}
                </Link>
              ) : (
                <a href={slide.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                  <SlideImage slide={slide} />
                  {index !== 0 && (
                    <Carousel.Caption className="relative z-[2] bottom-0 pb-4 md:pb-8">
                      <h3 className="font-rem text-xl md:text-2xl lg:text-3xl font-bold mb-2 drop-shadow-lg">{slide.title}</h3>
                      <p className="font-rem text-sm md:text-base lg:text-lg drop-shadow-md">{slide.subtitle}</p>
                    </Carousel.Caption>
                  )}
                </a>
              )
            ) : (
              <>
                <SlideImage slide={slide} />
                {index !== 0 && (
                  <Carousel.Caption className="relative z-[2] bottom-0 pb-4 md:pb-8">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 drop-shadow-lg">{slide.title}</h3>
                    <p className="text-sm md:text-base lg:text-lg drop-shadow-md">{slide.subtitle}</p>
                  </Carousel.Caption>
                )}
              </>
            )}
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

// ── Testimonio card ───────────────────────────────────────────────────────────
interface Testimonio {
  id: string;
  testimonial: string;
  image: string;
  name: string;
  country: string;
}

const avatarColors = [
  { bg: '#dcfce7', circle: '#16a34a', skin: '#fde68a', hair: '#78350f' },
  { bg: '#dbeafe', circle: '#2563eb', skin: '#fcd34d', hair: '#1e293b' },
  { bg: '#fce7f3', circle: '#db2777', skin: '#fed7aa', hair: '#7c3aed' },
];

function AvatarSVG({ index }: { index: number }) {
  const c = avatarColors[index % avatarColors.length];
  return (
    <svg viewBox="0 0 48 48" width="48" height="48" className="rounded-full ring-2 ring-white flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
      {/* Fondo */}
      <circle cx="24" cy="24" r="24" fill={c.bg} />
      {/* Cuerpo */}
      <ellipse cx="24" cy="38" rx="13" ry="9" fill={c.circle} opacity="0.85" />
      {/* Cabeza */}
      <circle cx="24" cy="20" r="9" fill={c.skin} />
      {/* Pelo */}
      <path d="M15,19 Q15,10 24,10 Q33,10 33,19 Q30,14 24,14 Q18,14 15,19 Z" fill={c.hair} />
    </svg>
  );
}

function TestimonioCard({ testimonio, index }: { testimonio: Testimonio; index: number }) {
  return (
    <div className="bg-white border border-green-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 relative flex flex-col h-[350px]">
      <Quote className="h-8 w-8 text-green-500 absolute top-4 left-4 opacity-20" />
      <div className="relative z-10 flex flex-col flex-grow justify-between">
        <p className="text-gray-600 italic flex-grow flex items-center justify-center line-clamp-4 leading-relaxed">
          {testimonio.testimonial}
        </p>
        <div className="flex items-center mt-6">
          <AvatarSVG index={index} />
          <div className="ml-4">
            <h4 className="font-rem font-semibold text-gray-900">{testimonio.name}</h4>
            <p className="text-sm text-green-600">{testimonio.country}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── HomePage ──────────────────────────────────────────────────────────────────
function HomePage() {
  const { ref: servicesRef,    inView: servicesInView    } = useInView();
  const { ref: ciatalgiaRef,   inView: ciatalgiaInView   } = useInView();
  const { ref: cursosRef,      inView: cursosInView      } = useInView();
  const { ref: testimoniosRef, inView: testimoniosInView } = useInView();
  const { ref: contactoRef,    inView: contactoInView    } = useInView();

  const testimonios: Testimonio[] = [
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
  ];

  const courses = [
    {
      name: 'Formación en Biodescodificación 2026',
      desc: 'Aprende las bases de la Biodescodificación y cómo aplicarla en tu vida y en la de otros. Un recorrido profundo por el origen emocional de los síntomas.',
      sub: 'Consultar fechas de inicio'
    },
    {
      name: 'Maestría en Biodescodificación',
      desc: 'Formación avanzada para convertirte en un profesional certificado de la Biodescodificación. Ideal para quienes ya tienen bases en el enfoque bioemocional.',
      sub: 'Consultar fechas de inicio'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ── Nav ── */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <img className="h-8 w-auto" src="/logo.png" alt="Sentir Salud" />
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#inicio"      className="font-rem text-gray-600 hover:text-green-600 transition-colors no-underline">Inicio</a>
              <a href="#servicios"   className="font-rem text-gray-600 hover:text-green-600 transition-colors no-underline">Servicios</a>
              <a href="#cursos"      className="font-rem text-gray-600 hover:text-green-600 transition-colors no-underline">Cursos</a>
              <a href="#testimonios" className="font-rem text-gray-600 hover:text-green-600 transition-colors no-underline">Testimonios</a>
              <a href="#contacto"    className="font-rem text-gray-600 hover:text-green-600 transition-colors no-underline">Contacto</a>
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

      {/* ── Hero / Carousel ── */}
      <section id="inicio" className="relative">
        <CarouselFadeExample />
      </section>

      {/* ── Servicios ── */}
      <section id="servicios" className="relative py-20 services-blob-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div
            ref={servicesRef}
            className={`section-hidden ${servicesInView ? 'section-visible' : ''}`}
          >
            <h2 className="font-rem text-3xl font-bold text-center text-gray-900 mb-4">Nuestros Servicios</h2>
            <p className="font-rem text-center text-gray-500 mb-12 max-w-xl mx-auto">
              Un abordaje integral de tu bienestar, uniendo mente, cuerpo y emoción.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-children">
              {/* Biodescodificación */}
              <div className="relative p-6 bg-white rounded-2xl shadow-sm cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-green-200 group">
                <Link to="/bioinfo" className="absolute inset-0 z-10 rounded-2xl" />
                <div className="flex flex-col items-start">
                  <div className="bg-green-100 rounded-xl p-3 mb-4 group-hover:bg-green-600 transition-colors duration-300">
                    <Brain className="h-8 w-8 text-green-600 group-hover:text-white transition-colors duration-300 icon-float" />
                  </div>
                  <h3 className="font-rem text-xl font-semibold mb-2 text-gray-900 group-hover:text-green-700 transition-colors duration-300">
                    Biodescodificación
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed group-hover:hidden">
                    Descubre el origen emocional de tus síntomas y transforma tu salud desde la raíz.
                  </p>
                  <p className="hidden group-hover:block text-green-700 font-semibold text-sm">
                    Conoce de qué se trata →
                  </p>
                </div>
              </div>

              {/* Terapias Holísticas */}
              <div className="p-6 bg-white rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-green-200 group">
                <div className="bg-green-100 rounded-xl p-3 mb-4 group-hover:bg-green-600 transition-colors duration-300 w-fit">
                  <Heart className="h-8 w-8 text-green-600 group-hover:text-white transition-colors duration-300 icon-float" />
                </div>
                <h3 className="font-rem text-xl font-semibold mb-2 text-gray-900">Terapias Holísticas</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Integración de diferentes técnicas para un abordaje completo de tu bienestar.
                </p>
              </div>

              {/* Formación Profesional */}
              <div className="p-6 bg-white rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-green-200 group">
                <div className="bg-green-100 rounded-xl p-3 mb-4 group-hover:bg-green-600 transition-colors duration-300 w-fit">
                  <BookOpen className="h-8 w-8 text-green-600 group-hover:text-white transition-colors duration-300 icon-float" />
                </div>
                <h3 className="font-rem text-xl font-semibold mb-2 text-gray-900">Formación Profesional</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Programas certificados para convertirte en un terapeuta holístico profesional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wave out of services */}
      <div className="bg-white">
        <WaveDivider fill="#ffffff" />
      </div>

      {/* ── Ciatalgia Banner ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={ciatalgiaRef}
            className={`section-hidden ${ciatalgiaInView ? 'section-visible' : ''}`}
          >
            <a href="https://www.sentirsalud.bio/ciatalgia" target="_blank" rel="noopener noreferrer" className="no-underline block group">
              <div className="relative overflow-hidden bg-gradient-to-r from-green-600 to-green-500 rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center gap-8 shadow-lg transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                {/* Decorative circles */}
                <div className="absolute -top-10 -right-10 w-52 h-52 bg-white/10 rounded-full pointer-events-none" />
                <div className="absolute -bottom-14 -left-8 w-40 h-40 bg-white/10 rounded-full pointer-events-none" />

                {/* Mini-preview de la página de ciatalgia */}
                <div className="flex-shrink-0 w-36 h-44 rounded-2xl overflow-hidden shadow-xl ring-2 ring-white/20 transition-transform duration-300 group-hover:scale-105">
                  <div className="w-full h-full flex flex-col items-center justify-between px-3 py-3"
                    style={{ background: 'linear-gradient(160deg, #3b1f0e 0%, #2a1508 60%, #1e0f05 100%)' }}>
                    {/* Logo */}
                    <div className="flex flex-col items-center gap-1 pt-1">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-md flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-white/30" />
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="h-0.5 rounded-full bg-amber-300/60" style={{ width: i === 1 ? 14 : 8 }} />
                        ))}
                      </div>
                    </div>
                    {/* Texto simulado */}
                    <div className="flex flex-col items-center gap-1.5 w-full">
                      <div className="h-1 w-20 rounded-full bg-amber-200/50" />
                      <div className="h-2.5 w-28 rounded bg-white/90" />
                      <div className="h-2.5 w-24 rounded bg-white/80" />
                      <div className="h-1 w-20 rounded-full bg-white/40" />
                      <div className="h-1 w-16 rounded-full bg-white/30" />
                    </div>
                    {/* Botón CTA simulado */}
                    <div className="w-full pb-1">
                      <div className="w-full h-5 rounded-md flex items-center justify-center"
                        style={{ background: 'linear-gradient(90deg, #d4a017, #e8b830)' }}>
                        <div className="h-1 w-16 rounded-full bg-white/70" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-grow text-center md:text-left">
                  <span className="font-rem text-green-200 text-sm font-semibold uppercase tracking-widest mb-2 block">Artículo destacado</span>
                  <h2 className="font-rem text-2xl md:text-3xl font-bold text-white mb-3">
                    Ciatalgia y Biodescodificación
                  </h2>
                  <p className="text-green-100 text-base leading-relaxed max-w-xl">
                    ¿Sufres de dolor ciático? Descubre el mensaje emocional detrás de la ciatalgia
                    y cómo podemos ayudarte a sanar desde la raíz.
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <span className="inline-flex items-center gap-2 bg-white text-green-600 font-bold px-6 py-3 rounded-xl group-hover:bg-green-50 transition-colors duration-200">
                    Leer más
                    <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Wave into cursos */}
      <div className="bg-white">
        <WaveDivider fill="#f0fdf4" />
      </div>

      {/* ── Cursos ── */}
      <section id="cursos" className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={cursosRef}
            className={`section-hidden ${cursosInView ? 'section-visible' : ''}`}
          >
            <h2 className="font-rem text-3xl font-bold text-center text-gray-900 mb-4">Próximos Cursos</h2>
            <p className="font-rem text-center text-gray-500 mb-12 max-w-xl mx-auto">
              Fórmate con los mejores programas en Biodescodificación y terapias holísticas.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 stagger-children">
              {courses.map(course => (
                <a
                  key={course.name}
                  href={`https://wa.me/59896611764?text=Hola!%20Me%20interesa%20el%20curso%20${encodeURIComponent(course.name)}%2C%20%C2%BFme%20pod%C3%A9s%20dar%20m%C3%A1s%20informaci%C3%B3n%3F`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline bg-white p-8 rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-300/40 group block"
                >
                  <div className="bg-green-100 rounded-xl p-3 mb-5 w-fit group-hover:bg-green-600 transition-colors duration-300">
                    <Calendar className="h-7 w-7 text-green-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-rem text-xl font-semibold mb-3 text-gray-900">{course.name}</h3>
                  <p className="text-gray-500 mb-5 text-sm leading-relaxed">{course.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-green-600 font-medium">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{course.sub}</span>
                    </div>
                    <span className="text-sm font-semibold text-green-600 group-hover:text-green-700 flex items-center gap-1">
                      Consultar por WhatsApp
                      <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Wave into testimonios */}
      <div className="bg-green-50">
        <WaveDivider fill="#ffffff" />
      </div>

      {/* ── Testimonios ── */}
      <section id="testimonios" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={testimoniosRef}
            className={`section-hidden ${testimoniosInView ? 'section-visible' : ''}`}
          >
            <h2 className="font-rem text-3xl font-bold text-center text-gray-900 mb-4">
              Testimonios de Nuestros Alumnos
            </h2>
            <p className="font-rem text-center text-gray-500 mb-12 max-w-xl mx-auto">
              Historias reales de transformación y sanación.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-children">
              {testimonios.map((testimonio, i) => (
                <TestimonioCard key={testimonio.id} testimonio={testimonio} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contacto ── */}
      <section id="contacto" className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={contactoRef}
            className={`section-hidden ${contactoInView ? 'section-visible' : ''}`}
          >
            <h2 className="font-rem text-3xl font-bold text-center text-gray-900 mb-12">Contáctanos</h2>
            <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 rounded-xl p-3">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <span className="text-gray-600">administracion@sentirsalud.bio</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-green-100 rounded-xl p-3">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
                <span className="text-gray-600">+598 966 11764</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-green-100 rounded-xl p-3">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
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
