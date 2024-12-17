import { Navbar } from "@/components/Navbar";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <h1 className="text-4xl font-bold text-gold mb-8">Privacy Policy</h1>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4">1. Information We Collect</h2>
            <p>At GoldInvestPro, we collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Personal identification information (Name, email address, phone number)</li>
              <li>Financial information necessary for transactions</li>
              <li>Communication records between you and our support team</li>
              <li>Technical data about your device and how you interact with our platform</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4">2. How We Use Your Information</h2>
            <p>We use the collected information to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Process your transactions and maintain your account</li>
              <li>Communicate with you about your account and our services</li>
              <li>Improve our platform and user experience</li>
              <li>Comply with legal obligations and prevent fraud</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4">3. Information Sharing</h2>
            <p>We do not sell your personal information. We may share your information with:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Service providers who assist in operating our platform</li>
              <li>Legal authorities when required by law</li>
              <li>Financial institutions to process transactions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4">4. Security Measures</h2>
            <p>We implement appropriate security measures to protect your information, including:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Encryption of sensitive data</li>
              <li>Regular security assessments</li>
              <li>Strict access controls for our employees</li>
              <li>Continuous monitoring for potential security threats</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4">5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4">6. Contact Us</h2>
            <p>If you have any questions about our Privacy Policy, please contact us at:</p>
            <ul className="list-none mt-2 space-y-2">
              <li>Email: privacy@goldinvestpro.com</li>
              <li>Phone: +49 1521 0755401</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;