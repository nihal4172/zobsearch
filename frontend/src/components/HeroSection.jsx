import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Search, Briefcase, Building2, Users } from 'lucide-react';

const HeroSection = () => {
  const stats = [
    { icon: <Briefcase className="h-6 w-6" />, value: "10k+", label: "Active Jobs" },
    { icon: <Building2 className="h-6 w-6" />, value: "500+", label: "Companies" },
    { icon: <Users className="h-6 w-6" />, value: "50k+", label: "Job Seekers" }
  ];

  return (
    <section className="relative bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] text-white">
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Find Your Dream Job with ZobSearch
          </h1>
          <p className="text-lg sm:text-xl mb-8 text-gray-100">
            Connect with top companies and discover opportunities that match your skills and aspirations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/jobs">
              <Button size="lg" className="w-full sm:w-auto bg-white text-[#6A38C2] hover:bg-gray-100">
                <Search className="mr-2 h-5 w-5" />
                Browse Jobs
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto bg-white/20 text-white hover:bg-white/30 border border-white">
                Create Account
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-gray-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;