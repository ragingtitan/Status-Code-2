import { motion } from "framer-motion";
import { FaFileAlt, FaBrain, FaRocket, FaCheckCircle } from "react-icons/fa";

const steps = [
  {
    icon: <FaFileAlt className="text-yellow-400 text-4xl" />,
    title: "Upload Your Resume",
    description:
      "Simply upload your resume, and our AI-powered parser will extract your skills, experience, and keywords.",
  },
  {
    icon: <FaBrain className="text-purple-400 text-4xl" />,
    title: "AI Optimizes & Matches Jobs",
    description:
      "Our intelligent system scans millions of job listings and finds the best matches based on your profile.",
  },
  {
    icon: <FaRocket className="text-blue-400 text-4xl" />,
    title: "Automated Job Applications",
    description:
      "With one click, our AI auto-applies to the most relevant jobs while optimizing your application for success.",
  },
  {
    icon: <FaCheckCircle className="text-green-400 text-4xl" />,
    title: "Track & Get Hired",
    description:
      "Monitor your applications in real time, get AI-driven interview coaching, and land your dream job!",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative bg-gray-950 text-white py-24">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-5xl font-bold"
        >
          How{" "}
          <span className="">
            Job<span className="text-yellow-400">Force</span>
          </span>{" "}
          Works
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-4 text-lg text-gray-200"
        >
          Our AI-driven job automation system makes your job search effortless
          and more effective.
        </motion.p>

        {/* Steps Container */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{once:true}}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.3 }}
              className="bg-white/10 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex justify-center">{step.icon}</div>
              <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-gray-200">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subtle Animated Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
          viewport={{ once: true }}
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
          viewport={{ once: true }}
          className="absolute bottom-10 right-1/3 w-80 h-80 bg-purple-400/30 rounded-full blur-3xl"
        />
      </div>
    </section>
  );
};

export default HowItWorks;
