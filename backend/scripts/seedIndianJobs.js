import mongoose from 'mongoose';
import { Job } from '../models/job.model.js';
import dotenv from 'dotenv';

dotenv.config();

const indianJobs = [
  {
    title: "Senior Software Engineer",
    description: "Looking for an experienced Senior Software Engineer to join our growing tech team. You will be responsible for developing scalable applications and mentoring junior developers.",
    requirements: "5+ years of experience in full-stack development, Strong knowledge of React/Node.js, Experience with cloud platforms (AWS/GCP), Database design and optimization",
    salary: 2500000, // 25 LPA
    location: "Bangalore, Karnataka",
    jobType: "full-time",
    experience: "senior",
    position: "Senior Software Engineer",
    company: new mongoose.Types.ObjectId(),
    created_by: new mongoose.Types.ObjectId(),
    status: "active"
  },
  {
    title: "Data Scientist",
    description: "Join our data science team to work on cutting-edge machine learning projects. You will be responsible for developing predictive models and analyzing large datasets.",
    requirements: "3+ years of experience in data science, Strong Python skills, Experience with ML frameworks (TensorFlow/PyTorch), Statistical analysis expertise",
    salary: 1800000, // 18 LPA
    location: "Hyderabad, Telangana",
    jobType: "full-time",
    experience: "mid",
    position: "Data Scientist",
    company: new mongoose.Types.ObjectId(),
    created_by: new mongoose.Types.ObjectId(),
    status: "active"
  },
  {
    title: "Product Manager",
    description: "We're seeking a Product Manager to drive product strategy and development. You will work closely with engineering teams and stakeholders to deliver successful products.",
    requirements: "4+ years of product management experience, Strong analytical skills, Excellent communication, Experience with agile methodologies",
    salary: 2200000, // 22 LPA
    location: "Mumbai, Maharashtra",
    jobType: "full-time",
    experience: "mid",
    position: "Product Manager",
    company: new mongoose.Types.ObjectId(),
    created_by: new mongoose.Types.ObjectId(),
    status: "active"
  },
  {
    title: "Frontend Developer",
    description: "Join our frontend team to create beautiful and responsive user interfaces. You will work with modern frameworks and tools to build engaging web applications.",
    requirements: "2+ years of frontend development, Strong React skills, CSS/SASS expertise, Responsive design experience",
    salary: 1200000, // 12 LPA
    location: "Pune, Maharashtra",
    jobType: "full-time",
    experience: "entry",
    position: "Frontend Developer",
    company: new mongoose.Types.ObjectId(),
    created_by: new mongoose.Types.ObjectId(),
    status: "active"
  },
  {
    title: "DevOps Engineer",
    description: "Looking for a DevOps Engineer to streamline our deployment processes and maintain cloud infrastructure. You will work on CI/CD pipelines and infrastructure automation.",
    requirements: "3+ years of DevOps experience, AWS/Azure expertise, Docker/Kubernetes knowledge, CI/CD tools experience",
    salary: 2000000, // 20 LPA
    location: "Gurgaon, Haryana",
    jobType: "full-time",
    experience: "mid",
    position: "DevOps Engineer",
    company: new mongoose.Types.ObjectId(),
    created_by: new mongoose.Types.ObjectId(),
    status: "active"
  },
  {
    title: "Machine Learning Engineer",
    description: "Join our AI team to develop and deploy machine learning models. You will work on cutting-edge projects in computer vision and natural language processing.",
    requirements: "4+ years of ML experience, Python expertise, Deep learning frameworks knowledge, Model deployment experience",
    salary: 2800000, // 28 LPA
    location: "Chennai, Tamil Nadu",
    jobType: "full-time",
    experience: "senior",
    position: "Machine Learning Engineer",
    company: new mongoose.Types.ObjectId(),
    created_by: new mongoose.Types.ObjectId(),
    status: "active"
  },
  {
    title: "UI/UX Designer",
    description: "We're looking for a creative UI/UX Designer to create intuitive and beautiful user interfaces. You will work closely with product and development teams.",
    requirements: "3+ years of UI/UX design experience, Figma/Sketch expertise, User research skills, Portfolio required",
    salary: 1500000, // 15 LPA
    location: "Noida, Uttar Pradesh",
    jobType: "full-time",
    experience: "mid",
    position: "UI/UX Designer",
    company: new mongoose.Types.ObjectId(),
    created_by: new mongoose.Types.ObjectId(),
    status: "active"
  },
  {
    title: "Backend Developer",
    description: "Join our backend team to build robust and scalable APIs. You will work with modern technologies and best practices in backend development.",
    requirements: "3+ years of backend development, Node.js/Python expertise, Database design skills, API development experience",
    salary: 1600000, // 16 LPA
    location: "Kolkata, West Bengal",
    jobType: "full-time",
    experience: "mid",
    position: "Backend Developer",
    company: new mongoose.Types.ObjectId(),
    created_by: new mongoose.Types.ObjectId(),
    status: "active"
  }
];

const seedIndianJobs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Insert Indian jobs
    const insertedJobs = await Job.insertMany(indianJobs);
    console.log('Inserted Indian jobs:', insertedJobs);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding Indian jobs:', error);
    process.exit(1);
  }
};

seedIndianJobs(); 