import React from 'react';
import { motion } from 'framer-motion';
// Opcional: para íconos en las tarjetas de funcionalidades
import { FaBrain, FaCrosshairs, FaPalette, FaMicrophoneAlt, FaFilm, FaTrophy } from 'react-icons/fa';

// Componente reutilizable para los botones con estilo LoL
const EpicButton = ({ children, className }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05, filter: 'brightness(1.2)' }}
      whileTap={{ scale: 0.95 }}
      className={`
        px-10 py-3 bg-lol-blue-medium text-lol-gold-light font-display font-bold uppercase tracking-wider
        border-2 border-lol-gold hover:border-lol-blue-accent
        transition-all duration-300
        relative group ${className}
      `}
    >
      {/* Esquinas y bordes para el efecto "Hextech" */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-lol-gold group-hover:border-lol-blue-accent transition-all duration-300"></span>
      <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-lol-gold group-hover:border-lol-blue-accent transition-all duration-300"></span>
      <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-lol-gold group-hover:border-lol-blue-accent transition-all duration-300"></span>
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-lol-gold group-hover:border-lol-blue-accent transition-all duration-300"></span>
      {children}
    </motion.button>
  );
};

export default function LandingPage() {
  const features = [
    { title: 'Recomendador IA', desc: 'Recibe recomendaciones de campeón, rol y estilo de juego basadas en tu personalidad y signo zodiacal, con 3 tips clave para empezar a ganar.', icon: <FaBrain /> },
    { title: 'Coach en Tiempo Real', desc: 'Obtén análisis en vivo de tus aliados y enemigos. Descubre sinergias, puntos débiles del rival y consejos estratégicos para dominar la partida.', icon: <FaCrosshairs /> },
    { title: 'Skins Zodiacales', desc: 'Eleva tu stream con overlays y animaciones premium. Haz que tus clips luzcan únicos con un branding zodiacal profesional y personalizado.', icon: <FaPalette /> },
    { title: 'TTS Narrativo', desc: 'Escucha tus mejores jugadas narradas por una IA con voz profesional, totalmente sincronizada con la acción para un efecto increíble.', icon: <FaMicrophoneAlt /> },
    { title: 'Clips Automáticos', desc: 'La IA detecta tus jugadas clave y genera clips virales listos para TikTok y YouTube, con tu branding y la narración épica incluidas.', icon: <FaFilm /> },
    { title: 'Gamificación y Rankings', desc: 'Demuestra la supremacía de tu signo. Compite en rankings semanales basados en data oficial de Riot y gana medallas exclusivas.', icon: <FaTrophy /> }
  ];

  return (
    // CAMBIO: Fondo texturizado oscuro en lugar de gradiente. bg-fixed da un efecto parallax.
    <div className="min-h-screen bg-lol-blue-dark text-lol-gold-light font-body overflow-x-hidden bg-[url('/img/background.jpg')] bg-cover bg-center bg-fixed">
      {/* Hero Section - AHORA CON IMAGEN DE CAMPEÓN DE FONDO */}
      <section 
        className="relative h-screen flex flex-col justify-center items-center text-center px-4 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "linear-gradient(rgba(1, 10, 19, 0.7), rgba(1, 10, 19, 0.9)), url('/img/hero-bg.jpg')" }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          // CAMBIO: Tipografía y sombra de texto épica
          className="text-6xl md:text-8xl font-display font-extrabold text-lol-gold-light text-shadow-lg"
        >
          LoL MetaMind
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-4 text-lg md:text-2xl max-w-3xl text-lol-gold-light/90 text-shadow-md"
        >
          Tu asistente de League of Legends con IA, astrología y estrategia en tiempo real. Descubrí tu campeón ideal y llevá tu juego al siguiente nivel.
        </motion.p>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.8, type: 'spring', stiffness: 100 }}
          className="mt-10"
        >
          <EpicButton>Explorar Plataforma</EpicButton>
        </motion.div>
      </section>

      {/* ===== VIDEO PROMO SECTION MODIFICADA ===== */}
      <section className="py-20 px-4 bg-lol-blue-dark/80 backdrop-blur-sm">
        <motion.h2
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-display font-bold text-center mb-12 text-lol-gold text-shadow-md"
        >
          Mirá el Poder de MetaMind
        </motion.h2>
        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="w-full max-w-4xl overflow-hidden shadow-2xl border-4 border-lol-gold-dark"
            style={{ boxShadow: '0 0 25px rgba(200, 155, 60, 0.4)' }}
          >
            {/* AQUÍ ESTÁ EL CAMBIO: Se reemplaza <video> por <iframe> de YouTube */}
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/aR-KAldshAE?autoplay=1&mute=1&loop=1&playlist=aR-KAldshAE&controls=0&showinfo=0&modestbranding=1"
                title="Video Promocional"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>
      {/* ========================================= */}

      {/* Features Section */}
      <section className="py-20 px-4 bg-lol-blue-dark">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-display font-bold text-center text-lol-gold mb-16 text-shadow-md"
        >
          Funcionalidades Épicas
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              // CAMBIO: Tarjetas más angulares, con fondo oscuro y borde dorado
              className="bg-lol-blue-medium p-6 border-2 border-lol-gold-dark hover:border-lol-blue-accent transition-colors duration-300 flex flex-col items-center text-center"
            >
              <div className="text-4xl text-lol-blue-accent mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-display font-bold mb-3 text-lol-gold">{feature.title}</h3>
              <p className="text-lol-gold-light/80 text-lg leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 bg-lol-blue-dark/80 text-center bg-cover bg-center" style={{ backgroundImage: "linear-gradient(rgba(10, 20, 40, 0.8), rgba(10, 20, 40, 0.9)), url('/img/background.jpg')"}}>
        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-display font-bold mb-6 text-lol-gold-light text-shadow-lg"
        >
          Elevá tu Juego Hoy
        </motion.h2>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-lol-gold-light/90 text-lg md:text-2xl mb-10 max-w-3xl mx-auto text-shadow-md"
        >
          Sumate a la experiencia más épica de League of Legends: IA, astrología y estrategia profesional al alcance de tu mouse.
        </motion.p>
        <EpicButton>Registrate Gratis</EpicButton>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-lol-blue-dark text-center text-lol-gold-light/70 border-t border-lol-gold-dark">
        &copy; {new Date().getFullYear()} SOIN Soluciones Informáticas. Todos los derechos reservados.
      </footer>
    </div>
  );
}