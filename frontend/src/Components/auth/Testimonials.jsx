import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Alice Johnson",
    title: "Software Engineer",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzEcUtOBjHYYxNETFX8OgTY28kxJ_dzUwmiQ&s", // Replace with actual image paths or use avatar generator
    text: "JobForce AI completely transformed my job search. The AI-driven resume optimization and smart matching made it easy to land my dream role!",
  },
  {
    name: "Michael Lee",
    title: "Product Manager",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRExrGzPIdL2YHhEapdqN4ZjunwaYOUNv4qRQ&s",
    text: "I never thought job searching could be this seamless. The auto-apply feature and real-time updates keep me ahead of the competition.",
  },
  {
    name: "Samantha Carter",
    title: "UX Designer",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6Hb5xzFZJCTW4cMqmPwsgfw-gILUV7QevvQ&s",
    text: "The personalized feedback and AI interview simulations have boosted my confidence. I highly recommend JobForce AI to anyone serious about their career.",
  },
  {
    name: "Amit Sharma",
    title: "Data Scientist",
    image: "https://img.freepik.com/free-photo/cheerful-indian-businessman-smiling-closeup-portrait-jobs-career-campaign_53876-129417.jpg", // Replace with actual image paths or use avatar generator
    text: "JobForce AI's data-driven insights and tailored recommendations have been a game-changer for my career growth. It's a must-have tool for professionals.",
  },
];

const Testimonials = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-24 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{once:true}}
          transition={{ duration: 0.8, ease: "easeOut", delay:0.2 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12"
        >
          What Other Users Say
        </motion.h2>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{once:true}}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.3 }}
              className="bg-gray-800 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-yellow-400"
                />
                <div>
                  <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-400 text-sm">{testimonial.title}</p>
                </div>
                
              </div>
              <div className="text-gray-300">
                <span><FaQuoteLeft className="text-yellow-400 mb-2" size={24} />
                <p className="italic">{testimonial.text}</p>
                <FaQuoteLeft className="text-yellow-400 mb-2 rotate-180" size={24} /></span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subtle Background Effects */}
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

export default Testimonials;
