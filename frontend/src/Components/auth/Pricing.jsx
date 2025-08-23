import GoBack from "../utility/GoBack";

const plans = [
  {
    name: "Basic",
    price: 9,
    features: [
      "Access to core features",
      "Limited cloud storage (5GB)",
      "Standard email support",
      "Basic analytics dashboard",
      "Community forum access",
    ],
  },
  {
    name: "Standard",
    price: 19,
    features: [
      "Everything in Basic",
      "Increased storage (50GB)",
      "Priority email & chat support",
      "Advanced analytics & reports",
      "Team collaboration (up to 5 users)",
    ],
    highlight: true, // Special styling for most popular plan
  },
  {
    name: "Premium",
    price: 29,
    features: [
      "Everything in Standard",
      "Unlimited storage",
      "24/7 dedicated support",
      "AI-powered insights & automation",
      "Enterprise-grade security",
      "Custom integrations & API access",
    ],
  },
];

const FeatureItem = ({ feature }) => (
  <li className="flex items-center space-x-2 text-gray-300">
    <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
    <span>{feature}</span>
  </li>
);

const PricingCard = ({ plan }) => (
  <div
    className={`relative bg-gray-900 bg-opacity-80 backdrop-blur-lg shadow-lg rounded-xl p-8 transition-transform transform hover:scale-105 ${
      plan.highlight ? "border-2 border-blue-500 shadow-blue-500" : "border border-gray-700"
    }`}
  >
    {plan.highlight && (
      <span className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 text-xs rounded-full">
        Most Popular
      </span>
    )}
    <h2 className="text-2xl font-bold text-white">{plan.name}</h2>
    <p className="mt-2 text-gray-400">{plan.description}</p>
    <div className="mt-6">
      <span className="text-4xl font-extrabold text-white">${plan.price}</span>
      <span className="text-gray-400 text-sm"> /month</span>
    </div>
    <ul className="mt-6 space-y-3">
      {plan.features.map((feature, index) => (
        <FeatureItem key={index} feature={feature} />
      ))}
    </ul>
    <button className="mt-6 w-full bg-blue-600 hover:bg-blue-500 transition duration-300 text-white py-2 rounded-lg text-lg">
      Get Started
    </button>
  </div>
);

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col justify-center items-center py-20 px-6">
      {/* Go Back Button */}
      <GoBack />

      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-white">Pricing Plans</h1>
        <p className="mt-4 text-lg text-gray-300">Choose the plan that suits you best.</p>
      </div>

      {/* Pricing Plans */}
      <div className="grid gap-8 lg:grid-cols-3 max-w-6xl w-full">
        {plans.map((plan, index) => (
          <PricingCard key={index} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default Pricing;
