import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout/Layout';
import { projectsAPI } from '../../lib/api';
import PageHero from '../../components/PageHero';
import HERO_IMAGES from '../../lib/heroImages';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await projectsAPI.getAll();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...new Set(projects.map((p) => p.category).filter(Boolean))];
  const filteredProjects =
    activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <Layout>
      {/* Hero */}
      <PageHero
        image={HERO_IMAGES.projects}
        badge="Our Portfolio"
        title="Recent Projects"
        subtitle="Explore successful projects delivered for clients around the world."
        crumb="Projects"
      />

      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-56 bg-gray-200 rounded-t-2xl"></div>
                  <div className="p-6 bg-white rounded-b-2xl">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🏗️</div>
              <h2 className="text-2xl font-bold mb-2">Projects coming soon</h2>
              <p className="text-gray-600 mb-6">We're preparing our portfolio. Check back shortly.</p>
              <Link href="/contact" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                Start Your Project
              </Link>
            </div>
          ) : (
            <>
              {/* Filter */}
              {categories.length > 1 && (
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveFilter(category)}
                      className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                        activeFilter === category
                          ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg shadow-blue-600/30'
                          : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <div
                    key={project._id || project.id}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2"
                  >
                    <div className="relative h-56 overflow-hidden">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                          <span className="text-6xl text-white">🏗️</span>
                        </div>
                      )}
                      {project.category && (
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-blue-600">
                          {project.category}
                        </div>
                      )}
                      {project.isFeatured && (
                        <div className="absolute top-4 left-4 bg-yellow-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          ⭐ Featured
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>

                      {project.location && (
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          {project.location}
                        </div>
                      )}

                      {(project.size || project.duration || project.value) && (
                        <div className="grid grid-cols-3 gap-2 pt-4 border-t">
                          <div className="text-center">
                            <p className="text-xs text-gray-500">Size</p>
                            <p className="font-semibold text-sm">{project.size || '-'}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-500">Duration</p>
                            <p className="font-semibold text-sm">{project.duration || '-'}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-500">Value</p>
                            <p className="font-semibold text-sm text-blue-600">{project.value || '-'}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* CTA */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-center text-white max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Have a Project in Mind?</h2>
            <p className="text-blue-100 mb-6">Get a free quote within 24 hours.</p>
            <Link href="/quote" className="inline-block bg-white text-blue-700 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
              Get a Free Quote
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
