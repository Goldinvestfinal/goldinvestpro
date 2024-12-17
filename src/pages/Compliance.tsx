import { Navbar } from "@/components/Navbar";

const Compliance = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <h1 className="text-4xl font-bold text-gold mb-8">Compliance</h1>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4">1. Regulatory Compliance</h2>
            <p>GoldInvestPro maintains strict compliance with all applicable financial regulations, including:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Anti-Money Laundering (AML) regulations</li>
              <li>Know Your Customer (KYC) requirements</li>
              <li>Financial reporting obligations</li>
              <li>Data protection and privacy laws</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4">2. KYC Procedures</h2>
            <p>Our KYC procedures include:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Identity verification</li>
              <li>Address verification</li>
              <li>Source of funds verification</li>
              <li>Regular account reviews</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4">3. Transaction Monitoring</h2>
            <p>We monitor transactions for:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Suspicious activity</li>
              <li>Large or unusual transactions</li>
              <li>Pattern-based anomalies</li>
              <li>Compliance with reporting thresholds</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4">4. Record Keeping</h2>
            <p>We maintain comprehensive records of:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Customer identification documents</li>
              <li>Transaction histories</li>
              <li>Communication records</li>
              <li>Compliance reports and audits</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4">5. Staff Training</h2>
            <p>Our staff undergoes regular training on:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Compliance procedures</li>
              <li>Fraud detection</li>
              <li>Customer due diligence</li>
              <li>Regulatory updates</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gold mb-4">6. Reporting</h2>
            <p>We maintain reporting procedures for:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Suspicious transactions</li>
              <li>Large cash transactions</li>
              <li>Regulatory filings</li>
              <li>Internal audits</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Compliance;