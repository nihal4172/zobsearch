import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Code,
  Briefcase,
  Palette,
  LineChart,
  Heart,
  BookOpen,
  Globe,
  Building,
} from 'lucide-react';

const categories = [
  {
    name: 'Technology',
    icon: Code,
    count: 150,
    color: 'bg-blue-500',
  },
  {
    name: 'Business',
    icon: Briefcase,
    count: 120,
    color: 'bg-green-500',
  },
  {
    name: 'Design',
    icon: Palette,
    count: 80,
    color: 'bg-purple-500',
  },
  {
    name: 'Marketing',
    icon: LineChart,
    count: 95,
    color: 'bg-red-500',
  },
  {
    name: 'Healthcare',
    icon: Heart,
    count: 110,
    color: 'bg-pink-500',
  },
  {
    name: 'Education',
    icon: BookOpen,
    count: 75,
    color: 'bg-yellow-500',
  },
  {
    name: 'Remote',
    icon: Globe,
    count: 200,
    color: 'bg-indigo-500',
  },
  {
    name: 'Finance',
    icon: Building,
    count: 130,
    color: 'bg-gray-500',
  },
];

const JobCategories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/jobs?category=${category.name.toLowerCase()}`);
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Browse Jobs by Category
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Find opportunities that match your skills and interests
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.name}
              onClick={() => handleCategoryClick(category)}
              className="relative group cursor-pointer"
            >
              <div className="relative p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 ${category.color} p-3 rounded-lg`}>
                    <category.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {category.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {category.count} jobs available
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/jobs')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#6A38C2] hover:bg-[#5A28B2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6A38C2]"
          >
            View All Categories
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCategories; 