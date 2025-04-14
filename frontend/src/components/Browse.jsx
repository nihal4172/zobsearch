import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { Input } from './ui/input';
import { Search } from 'lucide-react';

// const randomJobs = [1, 2,45];

const Browse = () => {
    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const dispatch = useDispatch();
    
    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [])

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 py-8'>
                <div className="mb-8">
                    <h1 className='text-3xl font-bold text-gray-900 mb-2'>Find Your Dream Job</h1>
                    <p className="text-gray-600">Browse through thousands of job listings</p>
                </div>

                <div className="relative mb-8">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                            type="text"
                            placeholder="Search jobs by title, company, or location..."
                            className="pl-10 py-6 text-lg"
                            value={searchedQuery}
                            onChange={(e) => dispatch(setSearchedQuery(e.target.value))}
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className='text-xl font-semibold text-gray-900'>
                        {searchedQuery ? `Search Results for "${searchedQuery}"` : 'All Jobs'} 
                        <span className="text-gray-500 ml-2">({allJobs.length})</span>
                    </h2>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {allJobs.length === 0 ? (
                        <div className="col-span-full text-center py-12 bg-white rounded-xl shadow-sm">
                            <div className="text-gray-500 mb-4">No jobs found matching your search criteria.</div>
                            <p className="text-sm text-gray-400">Try adjusting your search terms or browse all jobs</p>
                        </div>
                    ) : (
                        allJobs.map((job) => (
                            <Job key={job._id} job={job}/>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Browse