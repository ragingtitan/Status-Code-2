import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const CTA = () => {
  return (
    <section className="relative bg-gray-950 text-white py-24 text-center">
      <div className="container mx-auto px-6">
        {/* Animated Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl font-bold"
        >
          Land Your Dream Job with{" "}
          <span className="text-yellow-400">JobForce AI</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mt-4 text-lg text-gray-200 max-w-3xl mx-auto"
        >
          Supercharge your job search with AI-driven resume optimization,
          instant job applications, and interview coaching. Don't just apply—get
          hired.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="mt-8"
        >
          <Link
            to="/signup"
            className="relative inline-block px-10 py-4 text-lg font-semibold text-white bg-yellow-500 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <div className="font-bold">Get Started for Free</div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute -inset-1 bg-yellow-400 blur-xl opacity-50 rounded-full"
            />
          </Link>
        </motion.div>
      </div>

      {/* Subtle Animated Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
          className="absolute -top-20 left-1/4 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "mirror",
            delay: 1,
          }}
          className="absolute bottom-10 right-1/3 w-80 h-80 bg-purple-400/30 rounded-full blur-3xl"
        />
      </div>
    </section>
  );
};

export default CTA;
