import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slides = [
    {
      title: 'Construction Estimating Services',
      subtitle: 'Accurate construction estimating services — quantity takeoff, cost estimation, BOQ preparation, and steel detailing for contractors worldwide.',
      image: 'https://images.pexels.com/photos/31197870/pexels-photo-31197870/free-photo-of-structural-steel-frame-against-clear-sky.jpeg?auto=compress&w=1600',
      badge: 'Trusted by 500+ Clients',
    },
    {
      title: 'Precision Steel & Rebar Detailing',
      subtitle: 'Accurate structural drawings and reinforcement details delivered on time, every time.',
      image: 'https://images.unsplash.com/photo-1623489254637-a2dd8375243d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      badge: '10+ Years Experience',
    },
    {
      title: 'Cost Estimation & BOQ Preparation',
      subtitle: 'Detailed cost analysis and bills of quantities for successful project planning.',
      image: 'https://images.unsplash.com/photo-1621831337128-35676ca30868?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      badge: '98% Client Satisfaction',
    },
  ];

  const stats = [
    { value: '500+', label: 'Projects Done' },
    { value: '10+', label: 'Years Experience' },
    { value: '200+', label: 'Happy Clients' },
    { value: '25+', label: 'Team Members' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 via-blue-900/80 to-blue-800/90"></div>
          
          {/* Additional Dark Overlay for text readability */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      ))}

      {/* Animated Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}></div>
      </div>

      {/* Floating Decorative Shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-700"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 lg:pt-32 lg:pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className={`text-center lg:text-left transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            
            {/* Badge */}
            <div className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6 animate-fadeIn">
              <span className="relative flex h-3 w-3 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm text-white font-medium">{slides[currentSlide].badge}</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-slideIn">
              {slides[currentSlide].title.split(' ').map((word, index, arr) => (
                <span key={index} className={index === arr.length - 1 ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400' : ''}>
                  {word}{' '}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              {slides[currentSlide].subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              <Link
                href="/services"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-2xl shadow-blue-900/50 hover:shadow-blue-800/50 hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="relative flex items-center">
                  Explore Services
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>

              <Link
                href="/contact"
                className="group inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white hover:text-blue-700 hover:border-white transition-all duration-300 hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Get Free Quote
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 group"
                >
                  <p className="text-2xl sm:text-3xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                    {stat.value}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-300 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div className={`hidden lg:block transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">🏗️</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Our Expertise</h3>
                  <p className="text-gray-300">Comprehensive Engineering Solutions</p>
                </div>
                
                <div className="space-y-4">
                  {[
                    { icon: '📐', name: 'Steel Detailing', desc: 'Precise structural drawings' },
                    { icon: '🔩', name: 'Rebar Detailing', desc: 'Reinforcement schedules' },
                    { icon: '💰', name: 'Cost Estimation', desc: 'Accurate budget planning' },
                    { icon: '📋', name: 'BOQ Preparation', desc: 'Detailed quantity bills' },
                  ].map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 hover:translate-x-2 cursor-pointer"
                    >
                      <div className="text-3xl mr-4">{service.icon}</div>
                      <div className="flex-1">
                        <p className="text-white font-semibold">{service.name}</p>
                        <p className="text-gray-300 text-sm">{service.desc}</p>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-4 shadow-2xl animate-bounce">
                <p className="text-2xl font-bold text-white">24/7</p>
                <p className="text-xs text-white">Support</p>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-2xl">
                <div className="flex items-center">
                  <div className="text-yellow-400 text-2xl mr-2">★★★★★</div>
                  <div>
                    <p className="font-bold text-gray-800">4.9/5</p>
                    <p className="text-xs text-gray-500">Client Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? 'w-8 bg-yellow-400'
                : 'w-2 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 hidden lg:block animate-bounce">
        <div className="w-10 h-16 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/50 rounded-full animate-scroll"></div>
        </div>
      </div>
    </div>
  );
}