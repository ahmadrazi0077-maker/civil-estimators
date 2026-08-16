import { useState, useEffect, useRef } from 'react';

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const stats = [
    { value: 500, suffix: '+', label: 'Projects Completed', icon: '🎯' },
    { value: 10, suffix: '+', label: 'Years Experience', icon: '⏰' },
    { value: 200, suffix: '+', label: 'Happy Clients', icon: '😊' },
    { value: 25, suffix: '+', label: 'Team Members', icon: '👥' },
    { value: 98, suffix: '%', label: 'Success Rate', icon: '📈' },
    { value: 50, suffix: '+', label: 'Countries Served', icon: '🌍' },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '30px 30px',
      }}></div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Achievements</span>
          </h2>
          <p className="text-blue-200 text-lg">
            Numbers that speak for themselves
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="text-3xl mb-3 group-hover:scale-125 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {isVisible ? (
                  <Counter target={stat.value} suffix={stat.suffix} />
                ) : (
                  '0'
                )}
              </div>
              <div className="text-sm text-blue-200">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Counter Component
function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 50;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>
      {count}{suffix}
    </span>
  );
}