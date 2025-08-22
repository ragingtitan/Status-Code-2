import React from 'react';
import { Link } from 'react-router-dom';
const About = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-gray-100 min-h-screen flex items-center justify-center text-gray-800">
      <div className="max-w-6xl p-10 bg-white bg-opacity-90 rounded-lg shadow-2xl">
        <h1 className="text-5xl font-extrabold mb-6 text-center text-gray-900">About Ransomware</h1>
        <p className="text-lg leading-relaxed mb-8 text-center">
          Welcome to the ultimate Ransomware course! This platform is your gateway to mastering the art of cybersecurity, understanding ransomware, and learning how to protect yourself and others from its threats. Dive into an immersive experience with interactive lessons, real-world scenarios, and hands-on activities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-100 p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition duration-300">
            <h2 className="text-2xl font-bold mb-4 text-blue-900">Interactive Modules</h2>
            <p className="text-lg">
              Engage with our interactive modules that simulate real-world ransomware attacks. Learn step-by-step how to identify, analyze, and mitigate threats.
            </p>
          </div>

          <div className="bg-green-100 p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition duration-300">
            <h2 className="text-2xl font-bold mb-4 text-green-900">Real-World Case Studies</h2>
            <p className="text-lg">
              Explore detailed case studies of ransomware incidents. Understand the tactics used by attackers and the strategies employed to counter them.
            </p>
          </div>

          <div className="bg-yellow-100 p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition duration-300">
            <h2 className="text-2xl font-bold mb-4 text-yellow-900">Gamified Learning</h2>
            <p className="text-lg">
              Test your skills with gamified challenges and quizzes. Earn points, unlock achievements, and compete with others on the leaderboard.
            </p>
          </div>

          <div className="bg-purple-100 p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition duration-300">
            <h2 className="text-2xl font-bold mb-4 text-purple-900">Expert Guidance</h2>
            <p className="text-lg">
              Learn from industry experts through video tutorials, webinars, and Q&A sessions. Get personalized feedback and mentorship.
            </p>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link to="/main" className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300">
            Start Simulation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;