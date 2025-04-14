import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Building2, MapPin, Briefcase, Clock, DollarSign } from 'lucide-react'

const Job = ({ job }) => {
    const formatSalary = (salary) => {
        // Convert to LPA (Lakhs Per Annum)
        const lpa = salary / 100000;
        return `₹${lpa.toLocaleString('en-IN')} LPA`;
    };

    const getExperienceColor = (level) => {
        const colors = {
            'entry': 'bg-green-100 text-green-800',
            'mid': 'bg-blue-100 text-blue-800',
            'senior': 'bg-purple-100 text-purple-800',
            'lead': 'bg-orange-100 text-orange-800'
        };
        return colors[level] || 'bg-gray-100 text-gray-800';
    };

    const getJobTypeColor = (type) => {
        const colors = {
            'full-time': 'bg-blue-100 text-blue-800',
            'part-time': 'bg-green-100 text-green-800',
            'contract': 'bg-yellow-100 text-yellow-800',
            'internship': 'bg-purple-100 text-purple-800'
        };
        return colors[type] || 'bg-gray-100 text-gray-800';
    };

    return (
        <Link to={`/description/${job._id}`}>
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 overflow-hidden">
                <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
                            <div className="flex items-center text-gray-600">
                                <Building2 className="h-4 w-4 mr-1" />
                                <span className="text-sm">{job.company?.name}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-lg font-bold text-[#6A38C2]">{formatSalary(job.salary)}</div>
                            <div className="text-sm text-gray-500">per annum</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center text-gray-600">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">{job.location}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <Briefcase className="h-4 w-4 mr-1" />
                            <span className="text-sm">{job.position} positions</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <Clock className="h-4 w-4 mr-1" />
                            <span className="text-sm">Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getJobTypeColor(job.jobType)}`}>
                            {job.jobType}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getExperienceColor(job.experience)}`}>
                            {job.experience} Level
                        </span>
                    </div>

                    <p className="text-gray-600 line-clamp-2 text-sm">{job.description}</p>
                </div>
            </div>
        </Link>
    )
}

export default Job