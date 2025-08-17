'use client'
import React, { useState, useEffect } from 'react';
import { FileText, Users, History, Shield, Zap, ArrowRight, Check, Star } from 'lucide-react';
import Link from '../link/Link';

export default function WebDocsLanding() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Real-time Collaboration",
      description: "Work together seamlessly with your team in real-time"
    },
    {
      icon: <History className="w-8 h-8" />,
      title: "Version Control",
      description: "Track every change and restore any previous version instantly"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Storage",
      description: "Your documents are encrypted and safely stored in the cloud"
    }
  ];

  return (
    <div className="h-auto w-full text-white overflow-y-auto">

      {/* Header */}
      <header className="relative z-10 p-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-black to-gray-800 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-slate-50" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
            Web Docs
          </h1>
        </div>
        <nav className="flex space-x-6">
          <Link href="/login" className="px-8 py-2 text-black border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors duration-300">
            Login
          </Link>
          <Link href="/signup" className="px-6 py-2 bg-gray-700 text-slate-50 rounded-lg hover:bg-black transition-all duration-300 transform hover:scale-105">
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-black via-gray-800 to-gray-600 bg-clip-text text-transparent">
                Documents
              </span>
              <br />
              <span className="text-gray-700">Reimagined</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              Create, collaborate, and control your documents like never before. 
              Experience the future of document management with real-time collaboration 
              and powerful version control.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/documents" className="group px-8 py-4 bg-gray-700 text-slate-50 rounded-lg font-semibold hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-8 py-4 text-black border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors duration-300">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`p-8 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-gray-500 transition-all duration-500 transform hover:scale-105 ${
                  activeFeature === index ? 'ring-2 ring-white ring-opacity-20' : ''
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="mb-6 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {[
              { number: "10K+", label: "Active Users" },
              { number: "1M+", label: "Documents Created" },
              { number: "99.9%", label: "Uptime" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-12 mb-20">
            <h3 className="text-4xl font-bold text-center mb-12 text-white">Why Choose Web Docs?</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                "Real-time collaborative editing",
                "Automatic version saving",
                "One-click version restoration",
                "Advanced sharing controls",
                "Offline editing capabilities",
                "Enterprise-grade security"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Check className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-white to-gray-200 rounded-3xl p-12 text-black">
            <h3 className="text-4xl font-bold mb-4">Ready to Transform Your Workflow?</h3>
            <p className="text-xl mb-8 opacity-80">Join thousands of teams already using Web Docs</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="px-8 py-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-300">
                Start Free Trial
              </Link>
              <Link href="/documents" className="px-8 py-4 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors duration-300">
                View Documents
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 py-12 px-6 mt-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <FileText className="w-6 h-6 text-white" />
            <span className="text-xl font-bold text-gray-800">Web Docs</span>
          </div>
          <p className="text-gray-400 mb-6">The future of collaborative document editing</p>
          <div className="flex justify-center space-x-8 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}