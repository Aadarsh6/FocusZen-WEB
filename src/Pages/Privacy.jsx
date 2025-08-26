import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-8">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h1 className="text-6xl font-light text-white mb-4 tracking-tight">
            FocusZen
          </h1>
          <p className="text-xl text-gray-400 font-light">Privacy Policy</p>
          <div className="w-16 h-px bg-white/20 mx-auto mt-8"></div>
        </div>

        {/* Main content */}
        <div className="space-y-16">
          {/* Effective Date */}
          <div className="text-center">
            <span className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300">
              Effective Date: August 16, 2025
            </span>
          </div>

          {/* Main Statement */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-12">
            <h2 className="text-3xl font-light text-white mb-8">Our Promise</h2>
            <p className="text-lg leading-relaxed text-gray-300">
              FocusZen is built with privacy as our foundation. This extension{" "}
              <span className="text-white font-medium">does not collect, store, or transmit any personal information</span>.
              All focus session settings are stored locally in your browser using Chrome's storage API.
            </p>
          </div>

          {/* What We Don't Collect */}
          <div>
            <h2 className="text-3xl font-light text-white mb-12">What We Never Collect</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                <h3 className="text-white font-medium mb-3">Personal Information</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  No names, emails, phone numbers, or any identifying information
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                <h3 className="text-white font-medium mb-3">Browsing History</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  No tracking, monitoring, or collection of your web activity
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                <h3 className="text-white font-medium mb-3">Usage Analytics</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  No data about how you use the extension or your patterns
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                <h3 className="text-white font-medium mb-3">Third-Party Sharing</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  No data sold, shared, or transmitted to anyone, ever
                </p>
              </div>
            </div>
          </div>

          {/* Local Storage */}
          <div>
            <h2 className="text-3xl font-light text-white mb-12">Local Storage Only</h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-12">
              <p className="text-lg text-gray-300 mb-8">
                The extension stores minimal data locally on your device:
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 mr-6 flex-shrink-0"></div>
                  <div>
                    <span className="text-white font-medium">Site Preferences</span>
                    <p className="text-gray-400 text-sm mt-1">
                      Your configured allowed and blocked websites
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 mr-6 flex-shrink-0"></div>
                  <div>
                    <span className="text-white font-medium">Session Settings</span>
                    <p className="text-gray-400 text-sm mt-1">
                      Focus duration and current session status
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-6 bg-black/40 border-l-2 border-white/20 rounded-r-xl">
                <p className="text-gray-300 font-medium">
                  This information never leaves your device and is never transmitted anywhere.
                </p>
              </div>
            </div>
          </div>

          {/* No External Services */}
          <div>
            <h2 className="text-3xl font-light text-white mb-12">Zero External Dependencies</h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-12">
              <p className="text-lg text-gray-300 leading-relaxed">
                FocusZen operates entirely within your browser. No external servers, 
                no analytics services, no tracking systems. Every feature runs locally, 
                ensuring complete privacy and offline functionality.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-3xl font-light text-white mb-12">Questions?</h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
              <p className="text-gray-300 mb-8 text-lg">
                If you have any questions about this privacy policy:
              </p>
              <a
                href="mailto:aadarshakmishra16@gmail.com"
                className="inline-flex items-center px-8 py-4 bg-white text-black font-medium rounded-xl hover:bg-gray-100 transition-colors duration-300"
              >
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                Contact Us
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-16 border-t border-white/10">
            <p className="text-gray-500 text-sm font-light">
              © 2025 FocusZen. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;