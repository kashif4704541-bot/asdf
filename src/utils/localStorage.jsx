export const Employee = [
  {
    id: 1,
    name: "Ali",
    email: "alifazal.321@gmail.com",
    role: "Engineer",
    status: "Active",
    password: "123",
    leaves: [
      { dates: ["2025-09-05", "2025-09-06", "2025-09-07"], reason: "Sick Leave" },
      { dates: ["2025-09-15"], reason: "Personal Work" }
    ], // ✅ Added leave array
    
    tasks: [
      {
        id: "1-4",
        title: "Design Homepage",
        description: "Create wireframes and UI design for the homepage",
        date: "2025-08-22",
        category: "High",
        active: false,
        newTask: false,
        completed: false,
        pending: true,
        notes: [],
        extensions: [],
      },
      {
        id: "1-5",
        title: "Team Meeting",
        description: "Attend daily scrum meeting",
        date: "2025-08-21",
        category: "In Progress",
        active: true,
        newTask: false,
        completed: false,
        pending: false,
        notes: [],
        extensions: [],
      },
      {
        id: "1-6",
        title: "Bug Fix",
        description: "Fix login page error for incorrect password handling",
        date: "2025-08-20",
        category: "Low",
        active: false,
        newTask: true,
        completed: false,
        pending: false,
        notes: [],
        extensions: [],
      },
      {
        id: "1-7",
        title: "Prepare Presentation",
        description: "Prepare slides for product demo",
        date: "2025-08-24",
        category: "In Progress",
        active: true,
        newTask: false,
        completed: false,
        pending: false,
        notes: [],
        extensions: [],
      },
      // ✅ Completed tasks
      {
        id: "1-1",
        title: "Fix Navbar Bug",
        description: "Resolved navbar dropdown issue",
        date: "2025-08-15",
        category: "medium",
        active: false,
        newTask: false,
        completed: true,
        pending: false,
        file: []
      },
      {
        id: "1-2",
        title: "Setup GitHub Actions",
        description: "Configured CI/CD pipeline",
        date: "2025-08-14",
        category: "medium",
        active: false,
        newTask: false,
        completed: true,
        pending: false,
        file: []
      },
      {
        id: "1-3",
        title: "Write Test Cases",
        description: "Added unit tests for dashboard",
        date: "2025-08-12",
        category: "medium",
        active: false,
        newTask: false,
        completed: true,
        pending: false,
        file: []
      },
    ],
  },
  {
    id: 2,
    name: "Rubina",
    email: "rubinadilaik.321@gmail.com",
    role: "Finance",
    status: "On Leave",
    password: "123",
    leaves: [], // ✅ Added leave array
    tasks: [
      {
        id: "2-4",
        title: "Write Documentation",
        description: "Complete project documentation for user module",
        date: "2025-08-25",
        category: "Low",
        active: false,
        newTask: true,
        completed: false,
        pending: false,
        notes: [],
        extensions: [],
      },
      {
        id: "2-5",
        title: "Client Call",
        description: "Discuss requirements with the client",
        date: "2025-08-23",
        category: "High",
        active: false,
        newTask: false,
        completed: false,
        pending: true,
        notes: [],
        extensions: [],
      },
      {
        id: "2-6",
        title: "Testing API",
        description: "Test employee authentication API",
        date: "2025-08-22",
        category: "In Progress",
        active: true,
        newTask: false,
        completed: false,
        pending: false,
        notes: [],
        extensions: [],
      },
      {
        id: "2-7",
        title: "Code Review",
        description: "Review code pushed by Samarth",
        date: "2025-08-21",
        category: "In Progress",
        active: true,
        newTask: false,
        completed: false,
        pending: false,
        notes: [],
        extensions: [],
      },
      {
        id: "2-8",
        title: "Update README",
        description: "Update main README file with installation steps",
        date: "2025-08-19",
        category: "Low",
        active: false,
        newTask: true,
        completed: false,
        pending: false,
        notes: [],
        extensions: [],
      },
      // ✅ Completed
      {
        id: "2-1",
        title: "Logo Design",
        description: "Created new company logo draft",
        date: "2025-08-16",
        category: "medium",
        active: false,
        newTask: false,
        completed: true,
        pending: false,
        file: []
      },
      {
        id: "2-2",
        title: "Setup Dev Server",
        description: "Configured local development environment",
        date: "2025-08-15",
        category: "medium",
        active: false,
        newTask: false,
        completed: true,
        pending: false,
        file: []
      },
      {
        id: "2-3",
        title: "Team Training",
        description: "Organized onboarding for interns",
        date: "2025-08-13",
        category: "medium",
        active: false,
        newTask: false,
        completed: true,
        pending: false,
        file: []
      },
    ],
  },
  {
    id: 3,
    name: "Samarth",
    email: "samarthjurel.321@gmail.com",
    role: "Designer",
    status: "Active",
    password: "123",
    leaves: [], // ✅ Added leave array
    tasks: [
      {
        id: "3-4",
        title: "Implement Auth",
        description: "Work on JWT authentication flow",
        date: "2025-08-26",
        category: "Low",
        active: false,
        newTask: true,
        completed: false,
        pending: false,
        notes: [],
        extensions: [],
      },
      {
        id: "3-5",
        title: "Database Backup",
        description: "Take backup of production database",
        date: "2025-08-20",
        category: "In Progress",
        active: true,
        newTask: false,
        completed: false,
        pending: false,
        notes: [],
        extensions: [],
      },
      {
        id: "3-6",
        title: "UI Fixes",
        description: "Fix UI alignment in dashboard",
        date: "2025-08-21",
        category: "In Progress",
        active: true,
        newTask: false,
        completed: false,
        pending: false,
        notes: [],
        extensions: [],
      },
      {
        id: "3-7",
        title: "Security Audit",
        description: "Run security audit tools on the project",
        date: "2025-08-22",
        category: "High",
        active: false,
        newTask: false,
        completed: false,
        pending: true,
        notes: [],
        extensions: [],
      },
      // ✅ Completed
      {
        id: "3-1",
        title: "Setup Docker",
        description: "Created docker-compose for services",
        date: "2025-08-18",
        category: "medium",
        active: false,
        newTask: false,
        completed: true,
        pending: false,
        file: []
      },
      {
        id: "3-2",
        title: "Update API Docs",
        description: "Updated Swagger documentation",
        date: "2025-08-16",
        category: "medium",
        active: false,
        newTask: false,
        completed: true,
        pending: false,
        file: []
      },
      {
        id: "3-3",
        title: "Refactor Code",
        description: "Cleaned up utility functions",
        date: "2025-08-14",
        category: "medium",
        active: false,
        newTask: false,
        completed: true,
        pending: false,
        file: []
      },
    ],
  },
  {
    id: 4,
    name: "Kapil",
    email: "kapilsharma.321@gmail.com",
    role: "Engineer",
    status: "Inactive",
    password: "123",
    leaves: [], // ✅ Added leave array
    tasks: [
      {
        id: "4-4",
        title: "Deploy Update",
        description: "Deploy new version to staging server",
        date: "2025-08-23",
        category: "High",
        active: false,
        newTask: false,
        completed: false,
        pending: true,
        notes: [],
        extensions: [],
      },
      {
        id: "4-5",
        title: "Optimize Queries",
        description: "Improve performance of SQL queries",
        date: "2025-08-22",
        category: "Low",
        active: false,
        newTask: true,
        completed: false,
        pending: false,
        notes: [],
        extensions: [],
      },
      {
        id: "4-6",
        title: "Write Unit Tests",
        description: "Add unit tests for the payment module",
        date: "2025-08-21",
        category: "In Progress",
        active: true,
        newTask: false,
        completed: false,
        pending: false,
        notes: [],
        extensions: [],
      },
      {
        id: "4-7",
        title: "Daily Standup",
        description: "Attend team standup call",
        date: "2025-08-20",
        category: "High",
        active: false,
        newTask: false,
        completed: false,
        pending: true,
        notes: [],
        extensions: [],
      },
      {
        id: "4-8",
        title: "Fix Deployment Script",
        description: "Resolve errors in CI/CD pipeline",
        date: "2025-08-19",
        category: "In Progress",
        active: true,
        newTask: false,
        completed: false,
        pending: false,
        notes: [],
        extensions: [],
      },
      // ✅ Completed
      {
        id: "4-1",
        title: "Integrate Payments",
        description: "Added Stripe integration",
        date: "2025-08-17",
        category: "medium",
        active: false,
        newTask: false,
        completed: true,
        pending: false,
        file: []
      },
      {
        id: "4-2",
        title: "Optimize Images",
        description: "Compressed images for faster load",
        date: "2025-08-15",
        category: "medium",
        active: false,
        newTask: false,
        completed: true,
        pending: false,
        file: []
      },
      {
        id: "4-3",
        title: "Fix Typo Errors",
        description: "Corrected spelling mistakes in UI",
        date: "2025-08-14",
        category: "medium",
        active: false,
        newTask: false,
        completed: true,
        pending: false,
        file: []
      },
    ],
  },
  {
    id: 5,
    name: "Reem",
    email: "reemsameer.321@gmail.com",
    role: "Internee",
    status: "Active",
    password: "123",
    leaves: [], // ✅ Added leave array
    meetings: [ // ✅ Added meeting array for Reem
      {
        title: "Marketing Strategy Sync",
        description: "Team sync-up on product launch plan",
        date: "2025-09-02",
        attendees: ["Ali", "Rubina", "Samarth"],
        time: "10:00 AM",
        location: "Zoom"
      },
      {
        title: "Design Review",
        description: "Discuss campaign poster design",
        date: "2025-09-05",
        attendees: ["Reem", "Kapil"],
        time: "2:00 PM",
        location: "Meeting Room B"
      }
    ],
    tasks: [
      {
        id: "5-4",
        title: "Marketing Plan",
        description: "Draft marketing strategy for product launch",
        date: "2025-08-27",
        category: "High",
        active: false,
        newTask: false,
        completed: false,
        pending: true,
        notes: [],
        extensions: [],
      },
      {
        id: "5-5",
        title: "Design Poster",
        description: "Create promotional poster for campaign",
        date: "2025-08-22",
        category: "In Progress",
        active: true,
        newTask: false,
        completed: false,
        pending: false,
        notes: [],
        extensions: [],
      },
      {
        id: "5-6",
        title: "Social Media Content",
        description: "Plan posts for next week on Instagram and Twitter",
        date: "2025-08-23",
        category: "Low",
        active: false,
        newTask: true,
        completed: false,
        pending: false,
        notes: [],
        extensions: [],
      },
      {
        id: "5-7",
        title: "Survey Analysis",
        description: "Analyze customer feedback survey",
        date: "2025-08-21",
        category: "Low",
        active: false,
        newTask: true,
        completed: false,
        pending: false,
        notes: [],
        extensions: [],
      },
      {
        id: "5-8",
        title: "Email Campaign",
        description: "Set up automated email workflow",
        date: "2025-08-20",
        category: "In Progress",
        active: true,
        newTask: false,
        completed: false,
        pending: false,
        notes: [],
        extensions: [],
      },
      // ✅ Completed
      {
        id: "5-1",
        title: "Market Research",
        description: "Analyzed competitor strategies",
        date: "2025-08-17",
        category: "medium",
        active: false,
        newTask: false,
        completed: true,
        pending: false,
        file: []
      },
      {
        id: "5-2",
        title: "Blog Article",
        description: "Wrote SEO blog for campaign",
        date: "2025-08-16",
        category: "medium",
        active: false,
        newTask: false,
        completed: true,
        pending: false,
        file: []
      },
      {
        id: "5-3",
        title: "Video Editing",
        description: "Edited product intro video",
        date: "2025-08-14",
        category: "medium",
        active: false,
        newTask: false,
        completed: true,
        pending: false,
        file: []
      },
    ],
  },
];



export const Admin = [
  {
    id: 1,
    email: "shaheer.kas08@gmail.com",
    password: "321",
  },
];

// utils/localStorage.js

// ✅ Save to localStorage
export const saveLocalStorage = (key, data) => {
  if (!key) {
    console.error("saveLocalStorage called without a key");
    return;
  }
  try {
    localStorage.setItem(key.toLowerCase(), JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving localStorage data for key: ${key}`, error);
  }
};

// ✅ Get from localStorage
export const getLocalStorage = (key) => {
  if (!key) {
    console.error("getLocalStorage called without a key");
    return null;
  }
  try {
    const data = localStorage.getItem(key.toLowerCase());
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error parsing localStorage data for key: ${key}`, error);
    return null;
  }
};


