import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const LearnMore = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <motion.h1 
          className="text-5xl md:text-6xl font-extrabold mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to <span className="text-blue-500">JobForce</span>
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Your ultimate platform for finding your dream job. AI-driven, 
          fast, and built for professionals like you.
        </motion.p>
        <Link to="/signup" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition duration-300">
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <motion.h2 
          className="text-4xl font-bold text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Why Choose JobForce?
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { title: "AI-Powered Job Matches", desc: "Get personalized job recommendations based on your skills." },
            { title: "Seamless Applications", desc: "Apply for jobs with one click using our smart application system." },
            { title: "Verified Employers", desc: "Work with trusted companies and avoid job scams." }
          ].map((feature, index) => (
            <motion.div 
              key={index} 
              className="bg-gray-800 p-6 rounded-lg text-center shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold text-blue-400">{feature.title}</h3>
              <p className="text-gray-300 mt-2">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-black">
        <motion.h2 
          className="text-4xl font-bold text-center mb-10 text-blue-400"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          How JobForce Works
        </motion.h2>
        <div className="max-w-4xl mx-auto space-y-8">
          {[
            { step: "1", title: "Create Your Profile", desc: "Sign up and showcase your skills & experience." },
            { step: "2", title: "Get Job Recommendations", desc: "Our AI suggests jobs based on your profile." },
            { step: "3", title: "Apply & Get Hired", desc: "Apply with one click and get interview calls." }
          ].map((step, index) => (
            <motion.div 
              key={index} 
              className="flex items-center space-x-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <span className="text-4xl font-bold text-blue-500">{step.step}</span>
              <div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-gray-300">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <motion.h2 
          className="text-4xl font-bold text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          What Our Users Say
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {[
            { name: "Amit Sharma", review: "JobForce helped me land my dream job in just 2 weeks! The AI suggestions were spot on." },
            { name: "Riya Kapoor", review: "I love how easy it is to apply for jobs. The one-click application feature saved me so much time." }
          ].map((testimonial, index) => (
            <motion.div 
              key={index} 
              className="bg-gray-800 p-6 rounded-lg shadow-lg text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-300">"{testimonial.review}"</p>
              <h3 className="mt-4 font-semibold text-blue-400">- {testimonial.name}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 text-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <motion.h2 
          className="text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Ready to Find Your Dream Job?
        </motion.h2>
        <motion.p 
          className="text-lg text-gray-300 max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Join JobForce today and take the next step in your career.
        </motion.p>
        <Link to="/signup" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition duration-300">
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default LearnMore;
