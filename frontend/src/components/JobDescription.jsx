import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Building2, MapPin, Briefcase, Clock, DollarSign, Users, Calendar, FileText } from 'lucide-react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { JOB_API_END_POINT, APPLICATION_API_END_POINT } from '@/utils/constant'
import { Input } from './ui/input'
import { Label } from './ui/label'

const JobDescription = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);
    const [resume, setResume] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`);
                if (res.data.success) {
                    setJob(res.data.job);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response?.data?.message || "Error fetching job details");
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    const handleApply = async () => {
        if (!user) {
            toast.error("Please login to apply for this job");
            navigate('/login');
            return;
        }
        if (!resume) {
            toast.error("Please upload your resume");
            return;
        }
        setApplying(true);
        try {
            const formData = new FormData();
            formData.append('resume', resume);
            
            const res = await axios.post(`${APPLICATION_API_END_POINT}/apply/${id}`, formData, { 
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (res.data.success) {
                toast.success(res.data.message);
                setResume(null);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Error applying for job");
        } finally {
            setApplying(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6A38C2]"></div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h2>
                    <p className="text-gray-600 mb-4">The job you're looking for doesn't exist or has been removed.</p>
                    <Link to="/jobs">
                        <Button>Browse Other Jobs</Button>
                    </Link>
                </div>
            </div>
        );
    }

    // Helper function to capitalize first letter
    const capitalizeFirstLetter = (str) => {
        return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                            <div className="flex items-center text-gray-600 mb-4">
                                <Building2 className="h-5 w-5 mr-2" />
                                <span className="text-lg">{job.company?.name || 'Company Name Not Available'}</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="resume">Upload Resume (PDF)</Label>
                                <Input 
                                    type="file" 
                                    id="resume" 
                                    accept=".pdf"
                                    onChange={(e) => setResume(e.target.files[0])}
                                    className="w-full"
                                />
                            </div>
                            <Button 
                                onClick={handleApply}
                                disabled={applying}
                                className="bg-[#6A38C2] hover:bg-[#5b30a6] px-8"
                            >
                                {applying ? "Applying..." : "Apply Now"}
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                        <div className="flex items-center text-gray-600">
                            <MapPin className="h-5 w-5 mr-2" />
                            <div>
                                <div className="text-sm text-gray-500">Location</div>
                                <div className="font-medium">{job.location || 'Location Not Specified'}</div>
                            </div>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <DollarSign className="h-5 w-5 mr-2" />
                            <div>
                                <div className="text-sm text-gray-500">Salary</div>
                                <div className="font-medium">
                                    {job.salary ? `₹${(job.salary / 100000).toLocaleString('en-IN')} LPA` : 'Not Specified'}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <Briefcase className="h-5 w-5 mr-2" />
                            <div>
                                <div className="text-sm text-gray-500">Job Type</div>
                                <div className="font-medium">{job.jobType || 'Not Specified'}</div>
                            </div>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <Users className="h-5 w-5 mr-2" />
                            <div>
                                <div className="text-sm text-gray-500">Experience</div>
                                <div className="font-medium">
                                    {job.experienceLevel ? `${capitalizeFirstLetter(job.experienceLevel)} Level` : 'Not Specified'}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">Job Description</h2>
                            <p className="text-gray-600 whitespace-pre-line">{job.description || 'No description available'}</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">Requirements</h2>
                            <p className="text-gray-600 whitespace-pre-line">{job.requirements || 'No requirements specified'}</p>
                        </div>

                        <div className="flex items-center text-gray-500 text-sm">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>Posted on {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Date not available'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDescription;