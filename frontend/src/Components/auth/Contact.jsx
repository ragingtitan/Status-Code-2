import axios from "axios";
import { toast } from "react-toastify";
import GoBack from "../utility/GoBack";

const Contact = () => {
  const handleContact = async (e) => {
    e.preventDefault();
    try {
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;
      await axios
        .post(
          "http://localhost:4000/auth/contact",
          { name, email, message },
          { withCredentials: true }
        )
        .then((response) => {
          console.log(response);
          toast.success(response.data.message);
        })
        .catch((err) => {
          toast.error(err.message);
          console.error(err.message);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <GoBack />
      <section id="contact" className="w-full max-w-3xl text-center">
        <h2 className="text-4xl font-extrabold text-white mb-4">
          Get in Touch
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          We'd love to hear from you! Whether you have questions, feedback, or just want to say hi, feel free to reach out.
        </p>
        <div className="flex w-full justify-center items-center">
          {/* Contact Form */}
          <div className="bg-gray-800 w-full p-8 rounded-lg shadow-xl">
            <h3 className="text-2xl font-semibold mb-6 text-white">
              Contact Us
            </h3>
            <form onSubmit={handleContact} className="space-y-6">
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-semibold transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
        {/* Map section hidden; you can enable it if needed */}
      </section>
    </div>
  );
};

export default Contact;
