import mongoose from 'mongoose';
import { Job } from '../models/job.model.js';
import dotenv from 'dotenv';

dotenv.config();

const sampleJobs = [
  {
    title: "Senior Software Engineer",
    description: "We are looking for a Senior Software Engineer to join our team. You will be responsible for developing and maintaining our web applications.",
    requirements: "5+ years of experience, Strong JavaScript skills, React experience, Node.js knowledge",
    salary: 120000,
    location: "San Francisco, CA",
    jobType: "full-time",
    experience: "senior",
    position: "Senior Software Engineer",
    company: new mongoose.Types.ObjectId(),
    created_by: new mongoose.Types.ObjectId(),
    status: "active"
  },
  {
    title: "Frontend Developer",
    description: "Join our team as a Frontend Developer and help create beautiful user interfaces for our products.",
    requirements: "3+ years of experience, React expertise, CSS/SASS skills, Responsive design",
    salary: 90000,
    location: "New York, NY",
    jobType: "full-time",
    experience: "mid",
    position: "Frontend Developer",
    company: new mongoose.Types.ObjectId(),
    created_by: new mongoose.Types.ObjectId(),
    status: "active"
  },
  {
    title: "Backend Developer",
    description: "We're seeking a Backend Developer to build robust APIs and services.",
    requirements: "4+ years of experience, Node.js expertise, MongoDB knowledge, API design",
    salary: 100000,
    location: "Remote",
    jobType: "full-time",
    experience: "mid",
    position: "Backend Developer",
    company: new mongoose.Types.ObjectId(),
    created_by: new mongoose.Types.ObjectId(),
    status: "active"
  }
];

const seedJobs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing jobs
    await Job.deleteMany({});
    console.log('Cleared existing jobs');

    // Insert sample jobs
    const insertedJobs = await Job.insertMany(sampleJobs);
    console.log('Inserted sample jobs:', insertedJobs);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding jobs:', error);
    process.exit(1);
  }
};

seedJobs(); 