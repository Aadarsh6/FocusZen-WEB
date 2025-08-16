import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-green-600 mb-6">
          FocusZen Privacy Policy
        </h1>
        <p className="mb-6">
          <strong>Effective Date:</strong> August 16, 2025
        </p>

        <p className="mb-6">
          FocusZen values your privacy. This extension does{" "}
          <strong>not collect, store, or transmit any personal information</strong>.
          All focus session settings — such as allowed sites, focus time, and focus
          mode status — are stored locally in your browser using Chrome’s storage API.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">
          Information We Do Not Collect
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>No personal identifying information (name, email, etc.)</li>
          <li>No browsing history is collected or transmitted</li>
          <li>No data is sold or shared with third parties</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">
          Information Stored Locally
        </h2>
        <p className="mb-4">The extension only stores:</p>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>Allowed/disallowed sites (configured by the user)</li>
          <li>Focus session duration and status</li>
        </ul>
        <p className="mb-6">
          This information is stored{" "}
          <strong>locally on your device</strong> and never transmitted to external
          servers.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">Third-Party Services</h2>
        <p className="mb-6">
          This extension does not use analytics, trackers, or external servers. All
          functionality runs within your browser.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">Contact</h2>
        <p>
          If you have questions about this policy, please contact:{" "}
          <a
            href="mailto:your@email.com"
            className="text-green-600 hover:underline"
          >
            aadarshakmishra16@email.com
          </a>
        </p>

        <div className="mt-12 text-sm text-gray-600 text-center">
          &copy; 2025 FocusZen. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
