import React from 'react';
import { Search, Building2, Users, Shield, Zap, Target } from 'lucide-react';

const features = [
  {
    name: 'Smart Job Matching',
    description: 'Our AI-powered algorithm matches you with the most relevant job opportunities based on your skills and preferences.',
    icon: Search,
  },
  {
    name: 'Top Companies',
    description: 'Connect with leading companies across various industries, from startups to Fortune 500 companies.',
    icon: Building2,
  },
  {
    name: 'Active Community',
    description: 'Join a community of professionals, share insights, and grow your network.',
    icon: Users,
  },
  {
    name: 'Secure Platform',
    description: 'Your data is protected with enterprise-grade security measures and privacy controls.',
    icon: Shield,
  },
  {
    name: 'Quick Apply',
    description: 'Apply to multiple jobs with a single click using your saved profile and resume.',
    icon: Zap,
  },
  {
    name: 'Career Growth',
    description: 'Access resources and tools to help you advance your career and achieve your professional goals.',
    icon: Target,
  },
];

const WhyChooseUs = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Why Choose Our Platform
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            We provide everything you need to find your dream job and advance your career
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="relative p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#6A38C2] text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {feature.name}
                  </h3>
                </div>
              </div>
              <p className="mt-4 text-base text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#6A38C2] hover:bg-[#5A28B2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6A38C2]">
            <span>Get Started Today</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs; 