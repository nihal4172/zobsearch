import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Job title is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Job description is required"],
        trim: true
    },
    requirements: {
        type: String,
        required: [true, "Job requirements are required"],
        trim: true
    },
    salary: {
        type: Number,
        required: [true, "Salary is required"]
    },
    location: {
        type: String,
        required: [true, "Job location is required"],
        trim: true
    },
    jobType: {
        type: String,
        required: [true, "Job type is required"],
        enum: ["full-time", "part-time", "contract", "internship"],
        trim: true
    },
    experience: {
        type: String,
        required: [true, "Experience level is required"],
        enum: ["entry", "mid", "senior", "lead"],
        trim: true
    },
    position: {
        type: String,
        required: [true, "Position is required"],
        trim: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: [true, "Company is required"]
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Creator is required"]
    },
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application"
    }],
    status: {
        type: String,
        enum: ["active", "closed"],
        default: "active"
    }
}, {
    timestamps: true
});

// Index for better search performance
jobSchema.index({ title: "text", description: "text", requirements: "text" });

export const Job = mongoose.model("Job", jobSchema);