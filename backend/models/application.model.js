import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: [true, "Job is required"]
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Applicant is required"]
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    },
    coverLetter: {
        type: String,
        trim: true
    },
    resume: {
        type: String,
        required: [true, "Resume is required"]
    },
    appliedAt: {
        type: Date,
        default: Date.now
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for better query performance
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });
applicationSchema.index({ status: 1 });
applicationSchema.index({ appliedAt: -1 });

// Pre-save middleware to update lastUpdated
applicationSchema.pre("save", function(next) {
    this.lastUpdated = new Date();
    next();
});

export const Application = mongoose.model("Application", applicationSchema);