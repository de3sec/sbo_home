import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        SBO Tech is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <p className="mb-4">
        We may collect personal information you provide, such as your name, email, and business details, when you contact us or use our services.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Information</h2>
      <p className="mb-4">
        Your information is used to provide and improve our Shopify services, respond to inquiries, and communicate with you.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Security</h2>
      <p className="mb-4">
        We implement industry-standard measures to protect your data from unauthorized access.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">4. Third-Party Services</h2>
      <p className="mb-4">
        We may use third-party tools (such as Formbricks) to collect and process data. Please review their privacy policies for more information.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">5. Changes to Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy as needed. Continued use of our services indicates acceptance of the updated policy.
      </p>
      <p className="mt-8">
        For questions, please <Link href="/#contact" className="underline">contact us</Link>.
      </p>
    </main>
  );
}