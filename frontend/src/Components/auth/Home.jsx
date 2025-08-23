import CTA from "./CTA";
import FeaturesPage from "./Features";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
const Home = () => {
  return (
    <div>
      <Hero/>
      <HowItWorks/>
      <FeaturesPage/>
      <Testimonials/>
      <CTA/>
    </div>
  )
}

export default Home;