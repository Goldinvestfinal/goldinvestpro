import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
const About = () => {
  const navigate = useNavigate();
  return <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gold text-center mb-8">About GoldInvestPro</h1>
        <p className="text-lg text-gray-300 text-center max-w-3xl mx-auto">
          We specialize in empowering individuals to secure their financial future through strategic investments in gold and precious metals. Since our founding in 2010, we have been a trusted partner for investors worldwide, combining exceptional service with comprehensive educational resources to help our clients achieve their financial goals.
        </p>
      </div>

      {/* Who We Are Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gold mb-6">Who We Are</h2>
          <p className="leading-relaxed text-black">
            GoldInvestPro is a leading provider of gold investment services, offering a range of products tailored to suit diverse investment needs. From physical gold and silver to gold IRAs, mining stocks, and ETFs, we provide robust options for both new and seasoned investors. Our team of experienced financial advisors and gold market analysts delivers expert guidance to help you navigate the dynamic world of precious metals investments.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gold mb-6">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed">
            Our mission is simple: to empower individuals to build wealth and stability by incorporating gold and precious metals into their diversified portfolios. We are dedicated to making gold investment accessible, secure, and profitable for everyone.
          </p>
        </div>
      </section>

      {/* What Sets Us Apart Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gold mb-6">What Sets Us Apart</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-gold/20 bg-white">
              <h3 className="text-xl font-semibold text-gold mb-4">Commitment to Education</h3>
              <p className="text-black">
                We believe that informed investors make the best decisions. Our website is packed with valuable resources, including detailed guides, market analysis, and proven investment strategies.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-gold/20 bg-white">
              <h3 className="text-xl font-semibold text-gold mb-4">Expert Guidance</h3>
              <p className="text-black">
                With over a decade of experience, our advisors and analysts provide personalized insights to help you make informed investment choices.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-gold/20 bg-white">
              <h3 className="text-xl font-semibold text-gold mb-4">Diverse Offerings</h3>
              <p className="text-black">
                Whether you're looking to invest in physical gold, precious metals IRAs, or explore opportunities in mining stocks and ETFs, we have a solution tailored to your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gold mb-6">Why Choose GoldInvestPro?</h2>
          <ul className="grid md:grid-cols-2 gap-6 mb-8">
            <li className="flex items-start space-x-3">
              <span className="text-gold">•</span>
              <span className="text-gray-300"><strong className="text-gold">Proven Expertise:</strong> Over 10 years of industry experience and a track record of success.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-gold">•</span>
              <span className="text-gray-300"><strong className="text-gold">Transparency:</strong> Clear, honest communication with no hidden fees or surprises.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-gold">•</span>
              <span className="text-gray-300"><strong className="text-gold">Customer-Centric Approach:</strong> Your success is our priority, and our support team is here to guide you at every step.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-gold">•</span>
              <span className="text-gray-300"><strong className="text-gold">Global Reach:</strong> Access international markets and diversify your investments with ease.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black/50 to-black bg-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gold mb-6">Invest with Confidence</h2>
          <p className="text-gray-300 mb-8">
            Whether you're securing your retirement, protecting your wealth, or exploring new investment opportunities, GoldInvestPro is your trusted partner. Let us help you navigate the gold market with confidence and achieve your financial goals.
          </p>
          <div className="space-x-4">
            <Button onClick={() => navigate("/auth")} className="bg-gold hover:bg-gold-dark text-black font-semibold">
              Get Started
            </Button>
            <Button onClick={() => navigate("/contact")} variant="outline" className="border-gold text-gold hover:bg-gold/10">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>;
};
export default About;