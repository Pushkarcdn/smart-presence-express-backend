const allowedOrigins = [
  "http://127.0.0.1",
  "http://localhost",
  "http://localhost:3000",
  "http://localhost:5000",
];

const unprotectedRoutes = [
  // root
  {
    methods: ["GET"],
    route: "/",
  },

  // manual register (Temporarily allowed for everyone)

  {
    methods: ["POST"],
    route: "/api/register",
  },

  // manual signin

  {
    methods: ["POST"],
    route: "/api/signin",
  },

  // signout
  {
    methods: ["GET"],
    route: "/api/signout",
  },

  // users
  {
    methods: ["GET"],
    route: "/api/users",
  },
];

const teacherRoutes = [
  ...unprotectedRoutes,
  {
    methods: ["GET"],
    route: "/api/current-user",
  },
  {
    methods: ["GET", "POST"],
    route: "/api/applications",
  },
  {
    methods: ["GET", "PUT", "DELETE"],
    route: "/api/applications/:id",
  },
];

const adminRoutes = [
  ...teacherRoutes,
  {
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    route: "/api/approve/:id",
  },
  {
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    route: "/api/hire-applicant/:id",
  },
  {
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    route: "/api/reject-applicant/:id",
  },
  {
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    route: "/api/shortlist-applicant/:id",
  },
  {
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    route: "/api/schedule-interview",
  },
  {
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    route: "/api/finish-interview/:id",
  },
  {
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    route: "/api/cancel-interview/:id",
  },
  {
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    route: "/api/all-applications",
  },
  {
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    route: "/api/applications/:id",
  },
  {
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    route: "/api/easy-applications",
  },
  {
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    route: "/api/easy-applications/:id",
  },
  {
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    route: "/api/all-interviews",
  },
  {
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    route: "/api/all-interviews/:id",
  },
  {
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    route: "/api/faqs",
  },
  {
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    route: "/api/faqs/:id",
  },
  {
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    route: "/api/testimonials",
  },
  {
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    route: "/api/testimonials/:id",
  },
  {
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    route: "/api/inquiries",
  },
  {
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    route: "/api/inquiries/:id",
  },
  {
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    route: "/api/employers",
  },
  {
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    route: "/api/employers/:id",
  },
];

const allowedExtension = [];

const isUserAllowed = (route, method, role) => {
  /* 
    Temporarily allow all routes for everyone (for development purpose only)
    Specify api access acc to roles and remove this before going to prodution
  */

  console.log(
    "Temporarily allowing all routes for everyone (for development purpose only)"
  );

  if (role || !role) return true;

  let currentRoutes = [];

  switch (role) {
    case "teacher":
      currentRoutes = teacherRoutes;
      break;
    case "admin":
      currentRoutes = adminRoutes;
      break;
    case "superAdmin":
      return true; // everything allowed for superAdmin
  }

  // Check if the route and method match
  const isMatch = currentRoutes.some((item) => {
    const normalizedMethods = item.methods.map((method) =>
      method.toUpperCase()
    );

    // Convert dynamic route patterns like `/api/testimonials/:id` into a regex
    const routePattern = new RegExp(
      `^${item.route.replace(/:\w+/g, "[^/]+")}$`,
      "i" // Case-insensitive
    );

    return (
      routePattern.test(route) && // Check if the route matches the pattern
      normalizedMethods.includes(method.toUpperCase()) // Check if the method is allowed
    );
  });

  if (!isMatch) {
    // console.log(route, method, role);
    console.error("User is not authorized to access this resource.");
  }
  return isMatch;
};

module.exports = {
  allowedOrigins,
  unprotectedRoutes,
  allowedExtension,
  isUserAllowed,
};
