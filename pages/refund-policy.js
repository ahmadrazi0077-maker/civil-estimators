// pages/refund-policy.js
import Layout from '../components/Layout/Layout';

export default function RefundPolicy() {
  return (
    <Layout>
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">Refund Policy</h1>
          <p className="text-blue-100 mt-2">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 prose prose-lg max-w-none">
          <h2>Refund Policy</h2>
          <p>We offer a 100% satisfaction guarantee. If you are not satisfied with our work, we offer free revisions. Refunds are available for projects cancelled before delivery.</p>
          <h3>Eligibility</h3>
          <ul>
            <li>Refunds requested within 7 days of payment</li>
            <li>Project not yet delivered</li>
            <li>Reasonable cause for cancellation</li>
          </ul>
          <h3>Contact</h3>
          <p>For refund requests, contact: refunds@civilpro.com</p>
        </div>
      </div>
    </Layout>
  );
}