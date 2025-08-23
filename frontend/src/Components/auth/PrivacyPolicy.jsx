import GoBack from "../utility/GoBack";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <GoBack />
      <section id="privacy-policy" className="w-full mt-8 max-w-3xl text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Privacy Policy</h2>
        <p className="text-lg text-gray-300 mb-8">
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information.
        </p>

        <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-left text-gray-300">
          <h3 className="text-2xl font-semibold text-white mb-4">
            Information We Collect
          </h3>
          <p className="mb-4">
            We may collect personal information such as your name, email address, and message when you contact us.
          </p>

          <h3 className="text-2xl font-semibold text-white mb-4">
            How We Use Your Information
          </h3>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>To respond to your inquiries and provide support.</li>
            <li>To improve our website and services.</li>
            <li>To comply with legal obligations and security measures.</li>
          </ul>

          <h3 className="text-2xl font-semibold text-white mb-4">
            Data Protection
          </h3>
          <p className="mb-4">
            We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.
          </p>

          <h3 className="text-2xl font-semibold text-white mb-4">
            Third-Party Services
          </h3>
          <p className="mb-4">
            We do not share your personal data with third parties unless required by law or necessary for providing our services.
          </p>

          <h3 className="text-2xl font-semibold text-white mb-4">
            Your Rights
          </h3>
          <p className="mb-4">
            You have the right to access, modify, or request deletion of your personal data. Contact us if you have any concerns.
          </p>

          <h3 className="text-2xl font-semibold text-white mb-4">
            Changes to This Policy
          </h3>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. Please review this page periodically for any changes.
          </p>

          <h3 className="text-2xl font-semibold text-white mb-4">
            Contact Us
          </h3>
          <p>
            If you have any questions about this Privacy Policy, feel free to{" "}
            <span className="text-blue-400 hover:underline cursor-pointer">
              contact us
            </span>.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
