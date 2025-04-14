import mongoose from 'mongoose';
import { Company } from '../models/company.model.js';
import dotenv from 'dotenv';

dotenv.config();

const sampleCompanies = [
  {
    name: "TechCorp Solutions",
    description: "A leading technology company specializing in software development and digital solutions.",
    website: "https://techcorp.example.com",
    location: "Bangalore, India",
    logo: "https://via.placeholder.com/150",
    userId: new mongoose.Types.ObjectId()
  },
  {
    name: "InnovateX",
    description: "Innovative solutions for modern businesses, focusing on AI and machine learning.",
    website: "https://innovatex.example.com",
    location: "Mumbai, India",
    logo: "https://via.placeholder.com/150",
    userId: new mongoose.Types.ObjectId()
  },
  {
    name: "Digital Dynamics",
    description: "Transforming businesses through digital innovation and technology.",
    website: "https://digitaldynamics.example.com",
    location: "Hyderabad, India",
    logo: "https://via.placeholder.com/150",
    userId: new mongoose.Types.ObjectId()
  },
  {
    name: "FutureTech Systems",
    description: "Building the future of technology with cutting-edge solutions.",
    website: "https://futuretech.example.com",
    location: "Pune, India",
    logo: "https://via.placeholder.com/150",
    userId: new mongoose.Types.ObjectId()
  },
  {
    name: "Smart Solutions Inc",
    description: "Smart solutions for smarter businesses.",
    website: "https://smartsolutions.example.com",
    location: "Chennai, India",
    logo: "https://via.placeholder.com/150",
    userId: new mongoose.Types.ObjectId()
  }
];

const seedCompanies = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing companies
    await Company.deleteMany({});
    console.log('Cleared existing companies');

    // Insert sample companies
    const insertedCompanies = await Company.insertMany(sampleCompanies);
    console.log('Inserted sample companies:', insertedCompanies);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding companies:', error);
    process.exit(1);
  }
};

seedCompanies(); 