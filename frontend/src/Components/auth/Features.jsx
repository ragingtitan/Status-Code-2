import { motion } from "framer-motion";
import { FaRobot, FaSearch, FaCheck, FaChartLine, FaBolt, FaLock } from "react-icons/fa";

const features = [
  {
    icon: <FaRobot className="text-blue-400 text-5xl" />,
    title: "AI-Powered Resume Analysis",
    description: "Our AI scans your resume, extracts key insights, and optimizes it for ATS systems automatically.",
  },
  {
    icon: <FaSearch className="text-yellow-400 text-5xl" />,
    title: "Smart Job Matching",
    description: "Find the best job opportunities tailored to your skills and experience with AI-driven recommendations.",
  },
  {
    icon: <FaCheck className="text-green-400 text-5xl" />,
    title: "Automated Job Applications",
    description: "Save hours by letting our AI auto-apply to relevant jobs with a single click.",
  },
  {
    icon: <FaChartLine className="text-purple-400 text-5xl" />,
    title: "Real-Time Application Tracking",
    description: "Monitor your job applications, interview progress, and AI-driven suggestions for improvements.",
  },
  {
    icon: <FaBolt className="text-pink-400 text-5xl" />,
    title: "AI-Powered Interview Coach",
    description: "Get AI-generated interview feedback and insights to improve your chances of getting hired.",
  },
  {
    icon: <FaLock className="text-red-400 text-5xl" />,
    title: "Data Privacy & Security",
    description: "Your data is fully encrypted and protected with industry-standard security measures.",
  },
];

const Features = () => {
  return (
    <section className="relative  bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-24">
      <div className="container mx-auto px-6 text-center">
        
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
         viewport={{once:true}}
         whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl font-bold"
        >
          Why Choose <span className="">Job<span className="text-yellow-400">Force</span>?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          viewport={{once:true}}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mt-4 text-lg text-gray-200"
        >
          AI-powered tools that make your job search faster, smarter, and stress-free.
        </motion.p>

        {/* Features Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{once:true}}
            transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.3 }}
            className="bg-white/10 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-gray-200">{feature.description}</p>
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
          className="absolute -top-20 left-1/4 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", delay: 1 }}
          className="absolute bottom-10 right-1/3 w-80 h-80 bg-purple-400/30 rounded-full blur-3xl"
        />
      </div>
    </section>
  );
};

export default Features;
