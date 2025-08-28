import { motion } from "framer-motion";
import { 
  Twitter, 
  Github, 
  Linkedin, 
  Mail, 
  Instagram,
  ExternalLink,
  Heart
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const socialLinks = [
    { icon: Twitter, href: "https://x.com/adarshx_23", label: "Twitter" },
    { icon: Github, href: "https://github.com/Aadarsh6", label: "GitHub" },
    { icon: Mail, href: "mailto:aadarshakmishra16@gmail.com", label: "Email" }
  ];

  const productLinks = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Download", href: "#download" }
  ];

  const companyLinks = [
    { name: "About", href: "#about" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" }
  ];

  const supportLinks = [
    { name: "Help Center", href: "#help" },
    { name: "Privacy Policy", href: "https://focuszen.vercel.app/privacy" },
    { name: "Terms of Service", href: "https://focuszen.vercel.app/privacy" }
  ];

  


  return (
    <footer className="relative w-full bg-[#0a0a0a] border-t border-white/10">
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-16">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Logo/Brand */}
              <div className="mb-6">
                <h3 className="text-2xl font-jost font-semibold text-white tracking-tight">
                  FocusZen
                </h3>
                <p className="text-white/40 text-sm mt-1">Deep Work Companion</p>
              </div>
              
              {/* Description */}
              <p className="text-white/60 font-light leading-relaxed mb-8 max-w-md">
                Transform digital distractions into focused productivity. 
                Reclaim your 1,200 hours and create your masterpiece.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/60 hover:text-white/90 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" strokeWidth={1.5} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Product Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-jost font-medium text-white mb-6 tracking-tight">
                Product
              </h4>
              <ul className="space-y-4">
                {productLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-white/60 hover:text-white/90 font-light text-sm transition-colors duration-300 flex items-center group"
                    >
                      {link.name}
                      <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Company Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="font-jost font-medium text-white mb-6 tracking-tight">
                Company
              </h4>
              <ul className="space-y-4">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-white/60 hover:text-white/90 font-light text-sm transition-colors duration-300 flex items-center group"
                    >
                      {link.name}
                      <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Support Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="font-jost font-medium text-white mb-6 tracking-tight">
                Support
              </h4>
              <ul className="space-y-4">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-white/60 hover:text-white/90 font-light text-sm transition-colors duration-300 flex items-center group"
                    >
                      {link.name}
                      <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          className="border-t border-white/10 pt-12 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* <div className="max-w-md">
            <h4 className="font-jost font-medium text-white mb-3 tracking-tight">
              Stay Focused
            </h4>
            <p className="text-white/60 font-light text-sm mb-6 leading-relaxed">
              Get productivity tips and feature updates delivered to your inbox.
            </p>
            
            <div className="flex">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-l-lg text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300"
              />
              <motion.button
                className="px-6 py-3 bg-white text-black text-sm font-medium rounded-r-lg hover:bg-white/90 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div> */}
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


        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-6 text-white/40 text-sm">
            <span>© 2025 FocusZen. All rights reserved.</span>
          </div>
          
          <div className="flex items-center text-white/40 text-sm">
            <span>Made by {" "}
                <Link
                to="https://x.com/adarshx_23"
                >
            <span className="hover:text-blue-400 underline">Adarsh</span>
            </Link>
 </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;