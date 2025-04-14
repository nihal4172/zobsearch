import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Code, Palette, Database, Globe, Shield, Heart, BookOpen } from 'lucide-react';

const categories = [
  { id: 1, name: 'Development', icon: Code, color: '#6A38C2' },
  { id: 2, name: 'Design', icon: Palette, color: '#FF6B6B' },
  { id: 3, name: 'Marketing', icon: Globe, color: '#4ECDC4' },
  { id: 4, name: 'Data Science', icon: Database, color: '#45B7D1' },
  { id: 5, name: 'Security', icon: Shield, color: '#96CEB4' },
  { id: 6, name: 'Healthcare', icon: Heart, color: '#FF9999' },
  { id: 7, name: 'Education', icon: BookOpen, color: '#FFD93D' },
  { id: 8, name: 'Business', icon: Briefcase, color: '#6C5CE7' },
];

const CategoryCarousel = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold mb-8">
        Popular <span className="text-[#6A38C2]">Categories</span>
      </h1>
      <div className="grid grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => navigate(`/jobs?category=${category.name.toLowerCase()}`)}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 cursor-pointer border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${category.color}20` }}
              >
                <category.icon
                  className="h-6 w-6"
                  style={{ color: category.color }}
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-600">100+ Jobs</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;