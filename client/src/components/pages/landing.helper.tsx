"use client"

import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, BarChart2, FileText, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";

const LandingPageHelper = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-2xl font-bold text-green-700">BRSR Reporter</h1>
        </motion.div>
        <nav>
          <ul className="flex space-x-4">
            <motion.li
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <a href="#features" className="text-green-700 hover:text-green-500">
                Features
              </a>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a href="#pricing" className="text-green-700 hover:text-green-500">
                Pricing
              </a>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <a href="#contact" className="text-green-700 hover:text-green-500">
                Contact
              </a>
            </motion.li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-green-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Simplify Your BRSR Reporting
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Streamline your Business Responsibility and Sustainability Reporting with our intuitive SaaS platform
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to={'/home'}>
            <Button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full inline-flex items-center">
              Get Started
              <ArrowRight className="ml-2" />
            </Button></Link>
          </motion.div>
        </section>

        <section id="features" className="bg-white py-20">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center text-green-800 mb-12">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <FileText className="w-12 h-12 text-green-600" />,
                  title: "Automated Reporting",
                  description: "Generate BRSR reports with ease",
                },
                {
                  icon: <BarChart2 className="w-12 h-12 text-green-600" />,
                  title: "Data Analytics",
                  description: "Gain insights from your sustainability data",
                },
                {
                  icon: <Users className="w-12 h-12 text-green-600" />,
                  title: "Collaboration Tools",
                  description: "Work together seamlessly on reports",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-green-50 p-6 rounded-lg text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {feature.icon}
                  <h4 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center text-green-800 mb-12">Why Choose BRSR Reporter?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                "Compliance with latest BRSR guidelines",
                "Time-saving automation",
                "Customizable report templates",
                "Secure data management",
                "Real-time collaboration",
                "Expert support team",
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-lg text-gray-700">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-green-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.h3
              className="text-3xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Join 500+ Companies Already Simplifying Their BRSR Reporting
            </motion.h3>
            <motion.p
              className="text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              "BRSR Reporter has revolutionized our sustainability reporting process. It's intuitive, efficient, and has
              saved us countless hours."
            </motion.p>
            <motion.p
              className="font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              - Jane Doe, Sustainability Manager at GreenCorp
            </motion.p>
          </div>
        </section>

        <section id="pricing" className="py-20">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center text-green-800 mb-12">Simple, Transparent Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Starter",
                  price: "$99/month",
                  features: ["Basic BRSR reporting", "Data storage", "Email support"],
                },
                {
                  name: "Pro",
                  price: "$299/month",
                  features: ["Advanced BRSR reporting", "Data analytics", "Priority support", "Collaboration tools"],
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  features: [
                    "Full-suite BRSR solution",
                    "Dedicated account manager",
                    "Custom integrations",
                    "On-site training",
                  ],
                },
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  className="border border-green-200 rounded-lg p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h4 className="text-2xl font-bold mb-4">{plan.name}</h4>
                  <p className="text-3xl font-bold text-green-600 mb-6">{plan.price}</p>
                  <ul className="mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Choose Plan
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="bg-green-900 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">BRSR Reporter</h4>
              <p>Simplifying sustainability reporting for businesses worldwide.</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Contact Us</h4>
              <p>Email: info@brsrreporter.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-green-400">
                  Twitter
                </a>
                <a href="#" className="hover:text-green-400">
                  LinkedIn
                </a>
                <a href="#" className="hover:text-green-400">
                  Facebook
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2025 BRSR Reporter. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPageHelper;

