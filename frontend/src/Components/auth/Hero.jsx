import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
const Hero = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <section className="h-screen relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-32">
      <div className="h-full mx-auto px-6 flex flex-col  items-center justify-center">
        {/* Left Content */}
        <div className="w-full items-center text-center flex flex-col justify-center">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl font-bold text-white text-center mt-12"
          >
            AI-Powered Job Search,{" "}
            <span className="text-yellow-400">ATS Optimization</span> &{" "}
            <span className="text-green-400">Resume Enhancement</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl"
          >
            Let AI refine your resume, uncover the best job matches, and apply
            on your behalf.
            <span className="block font-semibold text-yellow-300 mt-2">
              Focus on interviews while we handle the rest.
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-6 flex flex-col sm:flex-row gap-6"
          >
            <Link to={`${isLoggedIn?"/jobforce":"/signin"}`} className="px-10 py-4 bg-yellow-400 text-black font-bold rounded-lg shadow-lg text-lg hover:bg-yellow-300 transition-all transform hover:scale-105">
              Get Started
            </Link>
            <Link
              to="/learnmore"
              className="px-10 py-4 border-2 border-white text-white font-bold rounded-lg shadow-lg text-lg hover:bg-white hover:text-black transition-all transform hover:scale-105"
            >
              Learn More
            </Link>
          </motion.div>

          {/* Trust Badges / Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-10 flex flex-wrap gap-6 justify-center "
          >
            {[
              { label: "📄 50K+ Resumes Optimized" },
              { label: "🔍 10M+ Jobs Matched" },
              { label: "🤖 100K+ AI Interviews Conducted" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-2 bg-white/10 px-6 py-3 rounded-lg shadow-md backdrop-blur-md hover:scale-105 transition-all"
              >
                <span className="text-lg">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Content - Animated Illustration / Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-0 w-full md:w-1/2 flex justify-center"
        ></motion.div>
      </div>

      {/* Subtle Animated Background Effect */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
          viewport={{ once: true }}
          className="absolute -top-24 left-1/4 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl"
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
          viewport={{ once: true }}
          className="absolute bottom-10 right-1/3 w-80 h-80 bg-purple-400/30 rounded-full blur-3xl"
        />
      </div>
    </section>
  );
};

export default Hero;
