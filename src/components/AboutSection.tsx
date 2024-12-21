import { Building, Users, Award, ShieldCheck } from "lucide-react";

export const AboutSection = () => {
  const features = [
    {
      icon: Building,
      title: "Who We Are",
      description: "GoldInvestPro is a leading provider of gold investment services, offering a range of products tailored to suit diverse investment needs."
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description: "With over a decade of experience, our advisors and analysts provide personalized insights to help you make informed investment choices."
    },
    {
      icon: Award,
      title: "Proven Expertise",
      description: "Over 10 years of industry experience and a track record of success in gold investment services."
    },
    {
      icon: ShieldCheck,
      title: "Transparency",
      description: "Clear, honest communication with no hidden fees or surprises, ensuring a trustworthy investment experience."
    }
  ];

  return (
    <section className="py-24 bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gold">About GoldInvestPro</h2>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            We specialize in empowering individuals to secure their financial future through strategic investments in gold and precious metals. Since our founding in 2010, we have been a trusted partner for investors worldwide.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="relative bg-black/40 p-6 rounded-lg border border-gold/20">
                <div className="absolute top-6 left-6">
                  <feature.icon className="h-6 w-6 text-gold" />
                </div>
                <div className="mt-8 pt-4">
                  <h3 className="text-xl font-semibold text-gold mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gold mb-4">Our Mission</h3>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Our mission is simple: to empower individuals to build wealth and stability by incorporating gold and precious metals into their diversified portfolios. We are dedicated to making gold investment accessible, secure, and profitable for everyone.
          </p>
        </div>
      </div>
    </section>
  );
};