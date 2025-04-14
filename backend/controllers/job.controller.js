import { Job } from "../models/job.model.js";

// admin post krega job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false
            });
        }

        // Validate jobType
        const validJobTypes = ["full-time", "part-time", "contract", "internship"];
        if (!validJobTypes.includes(jobType)) {
            return res.status(400).json({
                message: "Invalid job type. Must be one of: full-time, part-time, contract, internship",
                success: false
            });
        }

        // Validate experience level
        const validExperienceLevels = ["entry", "mid", "senior", "lead"];
        if (!validExperienceLevels.includes(experience)) {
            return res.status(400).json({
                message: "Invalid experience level. Must be one of: entry, mid, senior, lead",
                success: false
            });
        }

        // Validate salary is a number
        const salaryNum = Number(salary);
        if (isNaN(salaryNum) || salaryNum <= 0) {
            return res.status(400).json({
                message: "Salary must be a valid positive number",
                success: false
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements, // Keep as string, don't split
            salary: salaryNum,
            location,
            jobType,
            experience,
            position,
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "Job posted successfully",
            success: true,
            job
        });
    } catch (error) {
        console.log("Post job error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}
// student k liye
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query)
            .populate({
                path: "company"
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            jobs: jobs || [],
            success: true,
            message: jobs.length === 0 ? "No jobs found matching your search criteria" : "Jobs fetched successfully"
        });
    } catch (error) {
        console.error("Get all jobs error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}
// student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "company"
        }).populate({
            path: "applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log("Get job by ID error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}
// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company'
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log("Get admin jobs error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}
