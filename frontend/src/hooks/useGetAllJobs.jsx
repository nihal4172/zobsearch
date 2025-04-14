import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);
    const MAX_RETRIES = 3;

    const fetchAllJobs = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, {
                withCredentials: true,
                timeout: 5000 // 5 second timeout
            });
            if (res.data.success) {
                dispatch(setAllJobs(res.data.jobs));
                setRetryCount(0); // Reset retry count on success
            }
        } catch (error) {
            console.error("Error fetching jobs:", error);
            setError(error.response?.data?.message || "Error fetching jobs");
            
            if (error.response?.status === 401) {
                toast.error("Please login to view jobs");
            } else if (error.code === 'ECONNABORTED') {
                toast.error("Request timed out. Please try again.");
            } else if (!error.response && retryCount < MAX_RETRIES) {
                // Network error, retry
                setRetryCount(prev => prev + 1);
                toast.error("Connection error. Retrying...");
                setTimeout(fetchAllJobs, 1000 * (retryCount + 1)); // Exponential backoff
                return;
            } else {
                toast.error(error.response?.data?.message || "Error fetching jobs");
            }
            dispatch(setAllJobs([]));
        } finally {
            setLoading(false);
        }
    }, [searchedQuery, dispatch, retryCount]);

    useEffect(() => {
        fetchAllJobs();
    }, [fetchAllJobs]);

    return { loading, error };
}

export default useGetAllJobs;