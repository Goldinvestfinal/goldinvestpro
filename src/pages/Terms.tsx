import { Navbar } from "@/components/Navbar";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <h1 className="text-4xl font-bold text-gold mb-8">Terms of Service</h1>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4">1. Agreement to Terms</h2>
            <p>By accessing and using GoldInvestPro's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4">2. Use License</h2>
            <p>Permission is granted to temporarily access our services for personal, non-commercial use. This license does not include:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Modifying or copying our materials</li>
              <li>Using materials for commercial purposes</li>
              <li>Attempting to reverse engineer any software</li>
              <li>Removing any copyright or proprietary notations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4">3. Investment Risks</h2>
            <p>All investments carry risk. By using our platform:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>You acknowledge that past performance is not indicative of future results</li>
              <li>You understand that investments can lose value</li>
              <li>You agree to make informed decisions based on your own research</li>
              <li>You accept full responsibility for your investment decisions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4">4. Account Responsibilities</h2>
            <p>You are responsible for:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Maintaining account security</li>
              <li>Providing accurate information</li>
              <li>Complying with all applicable laws</li>
              <li>Reporting unauthorized access</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4">5. Limitation of Liability</h2>
            <p>GoldInvestPro shall not be liable for any:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Direct, indirect, or consequential damages</li>
              <li>Loss of profits or data</li>
              <li>Business interruption</li>
              <li>Technical issues beyond our control</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4">6. Governing Law</h2>
            <p>These terms shall be governed by and construed in accordance with the laws of Germany, without regard to its conflict of law provisions.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;