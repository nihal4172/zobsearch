import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName, description, website, location } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "You can't register same company.",
                success: false
            })
        };
        
        let logo = "";
        // Handle file upload if a file was provided
        if (req.file) {
            try {
                const fileUri = getDataUri(req.file);
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
                logo = cloudResponse.secure_url;
            } catch (uploadError) {
                console.log("File upload error:", uploadError);
                // Continue without logo if upload fails
            }
        }
        
        company = await Company.create({
            name: companyName,
            description,
            website,
            location,
            logo,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        })
    } catch (error) {
        console.log("Company registration error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            })
        };
        return res.status(200).json({
            companies,
            success: true
        })
    } catch (error) {
        console.log("Get companies error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        };
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log("Get company by ID error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export const updateCompany = async (req, res) => {
    try {
        const { companyName, description, website, location } = req.body;
        const companyId = req.params.id;
        
        let company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        };
        
        // Check if user owns the company
        if (company.userId.toString() !== req.id) {
            return res.status(403).json({
                message: "You don't have permission to update this company.",
                success: false
            });
        }
        
        // Update company fields
        if (companyName) company.name = companyName;
        if (description) company.description = description;
        if (website) company.website = website;
        if (location) company.location = location;
        
        // Handle logo upload if a file was provided
        if (req.file) {
            try {
                const fileUri = getDataUri(req.file);
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
                company.logo = cloudResponse.secure_url;
            } catch (uploadError) {
                console.log("File upload error:", uploadError);
                // Continue without updating logo if upload fails
            }
        }
        
        await company.save();
        
        return res.status(200).json({
            message: "Company updated successfully.",
            company,
            success: true
        })
    } catch (error) {
        console.log("Update company error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}