import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  FaPlay, FaUser, FaCalendarAlt, FaTicketAlt, 
  FaSpotify, FaApple, FaSoundcloud, FaInstagram, 
  FaFacebook, FaTwitter, FaHeadphones, FaWhatsapp, 
  FaEnvelope, FaClock, FaStar, FaUsers, FaMusic,
  FaImages, FaPaperPlane, FaPhoneAlt
} from 'react-icons/fa';
import logo from '/src/assets/logo.PNG';
import galleryImage1 from '/src/assets/1.png';
import galleryImage2 from '/src/assets/2.png';
import galleryImage3 from '/src/assets/3.png';
import galleryImage4 from '/src/assets/4.png';
import heroImage from '/src/assets/hero.png';
import peakImage from '/src/assets/peakpx.jpg';
import sobreMiBg from '/src/assets/sobre-mi-bg.png';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventDate: '',
    guests: '',
    message: ''
  });
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    const loaderTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => clearTimeout(loaderTimer);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('eventDate', formData.eventDate);
      payload.append('guests', formData.guests);
      payload.append('message', formData.message);
      payload.append('_subject', 'Nueva solicitud de reserva - BURGON DJ');
      payload.append('_captcha', 'false');
      payload.append('_template', 'table');

      const response = await fetch('https://formsubmit.co/ajax/cristiandecaro7@gmail.com', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: payload,
      });

      if (!response.ok) {
        throw new Error('No se pudo enviar el formulario');
      }

      alert('¡Solicitud enviada! Revisa el correo de activación de FormSubmit si es la primera vez.');
      setFormData({ name: '', email: '', eventDate: '', guests: '', message: '' });
    } catch (error) {
      alert('Sigue fallando el envío. Revisa si FormSubmit te envió el correo de activación a Gmail.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const galleryImages = [
    { id: 1, title: "Festival Electro 2025", location: "Bogotá", image: galleryImage1 },
    { id: 2, title: "Club Night Session", location: "Medellín", image: galleryImage2 },
    { id: 3, title: "Sunset Beach Party", location: "Santa Marta", image: galleryImage3 },
    { id: 4, title: "Underground Session", location: "Cali", image: galleryImage4 },
  ];

  return (
    <>
    <div className="bg-black text-white overflow-x-hidden">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.45 } }}
            className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <h1 className="text-5xl md:text-7xl font-black tracking-[0.18em] text-white/20 uppercase">
                BURGON DJ
              </h1>
              <motion.div
                animate={{ clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <h1 className="text-5xl md:text-7xl font-black tracking-[0.18em] uppercase bg-gradient-to-r from-purple-400 via-pink-500 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(168,85,247,0.6)]">
                  BURGON DJ
                </h1>
              </motion.div>
            </motion.div>

            <motion.div
              animate={{ scaleX: [0, 1, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-5 h-1 w-52 md:w-72 origin-left rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
            />

            <motion.p
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="mt-8 text-sm md:text-base tracking-[0.25em] uppercase text-gray-200"
            >
              Cargando experiencia
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-white/10"
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo en la navbar */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <p className="text-2xl font-bold">BURGON DJ</p>
          </motion.div>
          
          <div className="hidden md:flex gap-8">
            {['Inicio', 'Sobre Mí', 'Galería', 'Reservas'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                whileHover={{ scale: 1.1 }}
                className="hover:text-purple-400 transition-colors cursor-pointer"
              >
                {item}
              </motion.a>
            ))}
          </div>

          <button 
            className="md:hidden text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 backdrop-blur-lg"
            >
              {['Inicio', 'Sobre Mí', 'Galería', 'Reservas'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                  className="block py-3 px-6 hover:bg-white/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section con Parallax */}
      <section id="inicio" className="min-h-screen relative flex items-center justify-center overflow-hidden">
        {/* Fondo hero: import para URL correcta en producción (Vite) */}
        <motion.div 
          className="absolute inset-0"
          style={{ 
            scale: useTransform(scrollYProgress, [0, 1], [1, 1.2]),
            y: useTransform(scrollYProgress, [0, 1], [0, 100])
          }}
        >
          <img
            src={galleryImage1}
            alt="DJ Electro"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70 z-10" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-8"
            >
              <FaHeadphones className="text-6xl text-purple-500" />
            </motion.div>
            
            {/* Título principal en la sección de inicio */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6 flex flex-col items-center"
            >
              <h1 className="text-5xl md:text-7xl font-black tracking-wide uppercase">
                BURGON DJ
              </h1>
              <div className="w-44 md:w-56 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 my-4" />
              <h4 className="text-sm md:text-base uppercase tracking-[0.35em] text-gray-200">
                DJ Y PRODUCTOR
              </h4>
            </motion.div>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-6 max-w-2xl mx-auto">
            Impulsando propuestas musicales sin límites, Burgon convierte cada set en una vivencia cargada de energía, identidad y cercanía con el público. Desde Barranquilla hacia cualquier escenario, su trabajo va más allá de mezclar: construye recuerdos a través del sonido.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                <FaStar className="text-yellow-500" />
                <span>+50 Eventos Realizados</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                <FaUsers className="text-purple-500" />
                <span>+10K Personas</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                <FaHeadphones className="text-pink-500" />
                <span>15 Años de Experiencia</span>
              </div>
            </div>
            <motion.a
              href="#reservas"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-full text-lg font-semibold inline-flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              <FaCalendarAlt /> RESERVA AHORA
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Sobre Mí Section */}
      <section id="sobre-mí" className="relative overflow-hidden py-24">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-no-repeat opacity-[0.55]"
          style={{
            backgroundImage: `url(${sobreMiBg})`,
            backgroundPosition: '-12% center'
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/72 via-black/65 to-purple-950/25"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent md:via-black/10 md:to-transparent"
          aria-hidden
        />
        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <FaUser className="text-4xl text-purple-500 mx-auto mb-4" />
            <h3 className="text-4xl md:text-5xl font-bold mb-4">ACERCA DE MI</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-35"></div>
                  <div className="relative rounded-2xl border border-white/15 bg-black/25 p-8 shadow-lg shadow-black/25 backdrop-blur-md supports-[backdrop-filter]:bg-black/20">
                    <FaMusic className="text-5xl text-purple-500 mb-4 drop-shadow-sm" />
                    <h4 className="mb-4 text-2xl font-bold drop-shadow-md">Mi Historia</h4>
                    <p className="leading-relaxed text-gray-100/95 drop-shadow-sm">
                    Soy Burgon, DJ de Barranquilla con más de 15 años de experiencia en tarimas, eventos y emisoras nacionales. Mi estilo crossover fusiona house y techno con afro y reggaetón, creando una identidad sonora de beats profundos, atmósferas envolventes y esencia latina.

Mis sets son recorridos dinámicos donde los géneros se mezclan sin límites, conecto con el público y transformo cada presentación en una experiencia intensa y memorable.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-white/12 bg-black/20 p-4 text-center shadow-md shadow-black/15 backdrop-blur-sm supports-[backdrop-filter]:bg-black/15">
                    <FaMusic className="mx-auto mb-2 text-3xl text-purple-500 drop-shadow-sm" />
                    <div className="text-2xl font-bold drop-shadow-sm">15+</div>
                    <div className="text-sm text-gray-300">Años de Experiencia</div>
                  </div>
                  <div className="rounded-xl border border-white/12 bg-black/20 p-4 text-center shadow-md shadow-black/15 backdrop-blur-sm supports-[backdrop-filter]:bg-black/15">
                    <FaUsers className="mx-auto mb-2 text-3xl text-pink-500 drop-shadow-sm" />
                    <div className="text-2xl font-bold drop-shadow-sm">50+</div>
                    <div className="text-sm text-gray-300">Eventos Realizados</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "REAL NAME",
                      value: "Jesus Burgon",
                      extra: "DJ since 1993"
                    },
                    {
                      title: "LOCATION",
                      value: "Barranquilla - Colombia"
                    },
                    {
                      title: "EQUIPMENT",
                      value:
                        "Pioneer CDJ-3000, Pioneer DJM-V10 6-Channel Mixer, CDJ-2000 Nexus 2, Pioneer DJ DJM-79 Mixer, Pioneer DJM-900 Nexus 2, 6-Channel Mixer (alternative), Pioneer RMX-1000, Shure MLS 58 Microphone"
                    },
                    {
                      title: "CATEGORY",
                      value: "Open Format Wedding, Club DJ, Live DJ, Producer, etc"
                    },
                    {
                      title: "OPEN FORMAT GENRE",
                      value:
                        "Reggaeton, Bachata, Salsa, Merengue, Vallenato, Dance, Pop, 80's & 90's Hits, Rock en español, Reggae, Alternative, Rock, etc"
                    },
                    {
                      title: "MUSIC GENRE",
                      value:
                        "Afro House, Deep House, Funky House, Melodic House, Tech House and Progressive House"
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.06 }}
                      className="rounded-xl border border-white/15 bg-black/22 p-5 text-center shadow-md shadow-black/15 backdrop-blur-md supports-[backdrop-filter]:bg-black/18"
                    >
                      <h4 className="mb-2 text-xs font-bold tracking-wider text-white drop-shadow-sm md:text-sm">
                        {item.title}
                      </h4>
                      <p className="text-sm leading-relaxed text-gray-100/95 drop-shadow-sm">{item.value}</p>
                      {item.extra ? (
                        <p className="mt-1 text-sm text-gray-200 drop-shadow-sm">{item.extra}</p>
                      ) : null}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Galería Section */}
      <section id="galería" className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <FaImages className="text-4xl text-purple-500 mx-auto mb-4" />
            <h3 className="text-4xl md:text-5xl font-bold mb-4">Galería de Eventos</h3>
            <p className="text-gray-400 text-lg">Momentos inolvidables de mis presentaciones</p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h4 className="text-xl font-bold">{item.title}</h4>
                    <p className="text-sm text-gray-300">{item.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservas Section */}
      <section id="reservas" className="py-24 bg-gradient-to-t from-black to-purple-950/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <FaTicketAlt className="text-4xl text-purple-500 mx-auto mb-4" />
            <h3 className="text-4xl md:text-5xl font-bold mb-4">Reserva tu Evento</h3>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              ¿Listo para llevar la mejor música a tu evento? Completa el formulario y te contactaré para crear una experiencia única
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4"></div>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Información de contacto */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                  <h4 className="text-2xl font-bold mb-6">Información de Contacto</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                        <FaWhatsapp className="text-2xl text-purple-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">WhatsApp</p>
                        <p className="font-semibold">+57 300 533 4609</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                        <FaEnvelope className="text-2xl text-purple-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Email</p>
                        <p className="font-semibold">burgonjesus1@gmail.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                        <FaClock className="text-2xl text-purple-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Horario de Respuesta</p>
                        <p className="font-semibold">24/7</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                        <FaPhoneAlt className="text-2xl text-purple-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Teléfono</p>
                        <p className="font-semibold">+57 311 705 5772</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                  <h4 className="text-2xl font-bold mb-4">Paquetes Disponibles</h4>
                  <div className="space-y-3">
                    {[
                      { name: "Set 2 Horas", price: "$500", includes: "Equipo básico, mezcla personalizada" },
                      { name: "Set 4 Horas", price: "$900", includes: "Equipo profesional, luces LED, mezcla personalizada" },
                      { name: "Full Experience", price: "$1500", includes: "Todo incluido + Visuales personalizados" }
                    ].map((pkg, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="border border-white/10 rounded-lg p-4 hover:border-purple-500 transition-all"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-bold text-lg">{pkg.name}</h5>
                          <span className="text-purple-500 font-bold">Desde ${pkg.price}</span>
                        </div>
                        <p className="text-sm text-gray-400">{pkg.includes}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Formulario de reserva */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
              >
                <h4 className="text-2xl font-bold mb-6">Solicita tu Evento</h4>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2">Nombre Completo</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/5 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/5 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Fecha del Evento</label>
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/5 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Número de Invitados</label>
                    <input
                      type="number"
                      name="guests"
                      value={formData.guests}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/5 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="Aproximado"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Mensaje / Requerimientos</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full bg-white/5 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="Cuéntame sobre tu evento, tipo de música preferida, etc."
                    ></textarea>
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2"
                  >
                    <FaPaperPlane /> {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <div className="flex justify-center md:justify-start mb-2">
                <p className="text-2xl font-bold">BURGON DJ</p>
              </div>
              <p className="text-gray-400 text-sm">© 2026 Todos los derechos reservados</p>
            </div>
            
            <div className="flex gap-6">
              {[FaSoundcloud, FaInstagram, FaFacebook].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="https://www.instagram.com/djburgon/"
                  whileHover={{ scale: 1.2, y: -3 }}
                  className="text-gray-400 hover:text-purple-500 transition-colors text-2xl"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}

export default App;