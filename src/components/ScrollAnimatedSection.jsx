import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

/**
 * Componente para animar secciones desde la derecha al hacer scroll
 */
const ScrollAnimatedSection = ({ 
  children, 
  className = '', 
  threshold = 0.1, 
  delay = 0,
  staggerDelay = 0,
  ...props 
}) => {
  const { ref, isVisible } = useScrollAnimation(threshold, delay);

  const slideInVariants = {
    hidden: { 
      opacity: 0, 
      x: 100, // Viene desde la derecha
      y: 0 
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        delay: delay / 1000 // Convertir ms a segundos
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={slideInVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimatedSection;
