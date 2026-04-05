import { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  FaPlay, FaUser, FaCalendarAlt, FaTicketAlt, 
  FaSpotify, FaApple, FaSoundcloud, FaInstagram, 
  FaFacebook, FaTwitter, FaHeadphones, FaWhatsapp, 
  FaEnvelope, FaClock, FaStar, FaUsers, FaMusic,
  FaImages, FaPaperPlane
} from 'react-icons/fa';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('¡Solicitud enviada! Te contactaremos pronto.');
    setFormData({ name: '', email: '', eventDate: '', guests: '', message: '' });
  };

  const galleryImages = [
    { id: 1, title: "Festival Electro 2025", location: "Bogotá" },
    { id: 2, title: "Club Night Session", location: "Medellín" },
    { id: 3, title: "Sunset Beach Party", location: "Santa Marta" },
    { id: 4, title: "Underground Session", location: "Cali" },
    { id: 5, title: "Main Stage", location: "Barranquilla" },
    { id: 6, title: "After Party", location: "Cartagena" },
  ];

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-white/10"
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.h1 
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            DJ BURGON
          </motion.h1>
          
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
        {/* Imagen de fondo con efecto parallax */}
        <motion.div 
          className="absolute inset-0"
          style={{ 
            scale: useTransform(scrollYProgress, [0, 1], [1, 1.2]),
            y: useTransform(scrollYProgress, [0, 1], [0, 100])
          }}
        >
          <img 
            src="/src/assets/peakpx.jpg" 
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
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                DJ BURGON
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-6 max-w-2xl mx-auto">
              Transformando momentos en experiencias musicales inolvidables
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
                <span>5 Años de Experiencia</span>
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
      <section id="sobre-mí" className="py-24 bg-gradient-to-b from-black to-purple-950/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <FaUser className="text-4xl text-purple-500 mx-auto mb-4" />
            <h3 className="text-4xl md:text-5xl font-bold mb-4">Sobre Mí</h3>
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
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-50"></div>
                  <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                    <FaMusic className="text-5xl text-purple-500 mb-4" />
                    <h4 className="text-2xl font-bold mb-4">Mi Historia</h4>
                    <p className="text-gray-300 leading-relaxed">
                      Desde pequeño, la música electrónica ha sido mi pasión. Comencé mi carrera hace 5 años en pequeños clubes 
                      y hoy he tenido el honor de compartir escenario con grandes artistas internacionales. Mi estilo único fusiona 
                      tech-house, progressive y melodías que conectan con el alma del público.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                    <FaMusic className="text-3xl text-purple-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold">5+</div>
                    <div className="text-sm text-gray-400">Años de Experiencia</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                    <FaUsers className="text-3xl text-pink-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold">50+</div>
                    <div className="text-sm text-gray-400">Eventos Realizados</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                  <h4 className="text-2xl font-bold mb-4">Géneros Musicales</h4>
                  <div className="space-y-3">
                    {[
                      { name: "Tech House", level: 90 },
                      { name: "Progressive House", level: 85 },
                      { name: "Melodic Techno", level: 88 },
                      { name: "Deep House", level: 82 }
                    ].map((genre, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span>{genre.name}</span>
                          <span className="text-purple-500">{genre.level}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${genre.level}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                  <h4 className="text-2xl font-bold mb-4">Influencias</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Carl Cox", "Solomun", "Boris Brejcha", "Charlotte de Witte", "Peggy Gou", "Adam Beyer"].map((artist, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="px-3 py-1 bg-purple-500/20 rounded-full text-sm border border-purple-500/50"
                      >
                        {artist}
                      </motion.span>
                    ))}
                  </div>
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
                <div className="aspect-[4/3] bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-6xl">
                  🎵
                </div>
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
                        <p className="font-semibold">+57 300 123 4567</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                        <FaEnvelope className="text-2xl text-purple-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Email</p>
                        <p className="font-semibold">dj.electro@music.com</p>
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
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2"
                  >
                    <FaPaperPlane /> Enviar Solicitud
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
              <h4 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                DJ BURGON
              </h4>
              <p className="text-gray-400 text-sm">© 2026 Todos los derechos reservados</p>
            </div>
            
            <div className="flex gap-6">
              {[FaSpotify, FaApple, FaSoundcloud, FaInstagram, FaFacebook, FaTwitter].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
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
  );
}

export default App;