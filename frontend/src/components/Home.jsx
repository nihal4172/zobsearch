import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { MapPin, ArrowRight, Star, Search, Zap, Bell } from 'lucide-react'
import LatestJobs from './LatestJobs'
import CategoryCarousel from './CategoryCarousel'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import HeroSection from './HeroSection'

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);

  const categories = [
    { name: 'Technology', icon: <MapPin className="h-6 w-6" />, count: 150 },
    { name: 'Finance', icon: <MapPin className="h-6 w-6" />, count: 120 },
    { name: 'Healthcare', icon: <MapPin className="h-6 w-6" />, count: 80 },
    { name: 'Education', icon: <MapPin className="h-6 w-6" />, count: 60 },
  ];

  const featuredCompanies = [
    { name: 'TechCorp', logo: 'https://via.placeholder.com/150', rating: 4.5 },
    { name: 'FinanceHub', logo: 'https://via.placeholder.com/150', rating: 4.8 },
    { name: 'HealthCare Plus', logo: 'https://via.placeholder.com/150', rating: 4.3 },
    { name: 'EduTech Solutions', logo: 'https://via.placeholder.com/150', rating: 4.6 },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Engineer',
      company: 'TechCorp',
      image: 'https://via.placeholder.com/100',
      quote: 'Found my dream job within weeks! The platform made the entire process seamless.'
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'FinanceHub',
      image: 'https://via.placeholder.com/100',
      quote: "The best job portal I've used. The matching algorithm is spot-on!"
    },
    {
      name: 'Priya Patel',
      role: 'Data Scientist',
      company: 'HealthCare Plus',
      image: 'https://via.placeholder.com/100',
      quote: 'Landing page is beautiful and the application process is straightforward.'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Job Categories</h2>
            <p className="text-gray-600">Browse jobs by category and find the perfect match for your skills</p>
          </div>
          <CategoryCarousel />
        </div>
      </section>

      {/* Latest Jobs Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Job Opportunities</h2>
            <p className="text-gray-600">Discover the most recent job postings from top companies</p>
          </div>
          <LatestJobs />
        </div>
      </section>

      {/* Featured Companies Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Companies</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {featuredCompanies.map((company, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 text-center">
                <img src={company.logo} alt={company.name} className="w-24 h-24 mx-auto mb-4 rounded-full" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{company.name}</h3>
                <div className="flex items-center justify-center text-yellow-400">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="ml-1 text-gray-600">{company.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What People Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center mb-6">
                <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mr-4" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.role}</p>
                  <p className="text-gray-500 text-sm">{testimonial.company}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#6A38C2] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Next Opportunity?</h2>
          <p className="text-xl mb-8 text-gray-100">Join thousands of professionals who have found their dream jobs</p>
          <Link to="/jobs">
            <Button className="bg-white text-[#6A38C2] hover:bg-gray-100 px-8 py-6 text-lg">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Why Choose ZobSearch Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose ZobSearch?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Job Matching</h3>
              <p className="text-gray-600">
                ZobSearch's advanced algorithm matches you with the most relevant job opportunities based on your skills and preferences.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Apply</h3>
              <p className="text-gray-600">
                Apply to multiple jobs with a single click using ZobSearch's streamlined application process.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Bell className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Job Alerts</h3>
              <p className="text-gray-600">
                Get instant notifications from ZobSearch when new jobs matching your criteria are posted.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;