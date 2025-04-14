import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: "Resume is required",
                success: false
            });
        }

        // check if the user has already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });
        }

        // check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        // Upload resume to cloudinary
        const fileUri = getDataUri(req.file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
            resource_type: 'raw',
            format: 'pdf'
        });

        // create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
            resume: cloudResponse.secure_url
        });

        job.applications.push(newApplication._id);
        await job.save();
        
        return res.status(201).json({
            message: "Job applied successfully.",
            success: true
        });
    } catch (error) {
        console.log("Apply job error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const applications = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } },
            }
        });
        if (!applications || applications.length === 0) {
            return res.status(404).json({
                message: "No Applications",
                success: false
            });
        }
        return res.status(200).json({
            applications,
            success: true
        });
    } catch (error) {
        console.log("Get applied jobs error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const applications = await Application.find({ job: jobId }).populate({
            path: 'applicant',
            select: 'fullname email phoneNumber profile'
        });
        if (!applications || applications.length === 0) {
            return res.status(404).json({
                message: "No applicants found for this job.",
                success: false
            });
        }
        return res.status(200).json({
            applications,
            success: true
        });
    } catch (error) {
        console.log("Get applicants error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        if (!status) {
            return res.status(400).json({
                message: "Status is required",
                success: false
            });
        }

        const application = await Application.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        ).populate({
            path: 'job',
            populate: {
                path: 'company'
            }
        });

        if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Application status updated successfully",
            application,
            success: true
        });
    } catch (error) {
        console.log("Update application status error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};