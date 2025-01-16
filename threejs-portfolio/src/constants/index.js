export const navLinks = [
  {
    id: 1,
    name: 'Projects',
    href: '#projects',
  },
  {
    id: 2,
    name: 'Contact',
    href: '#contact',
  },
  {
    id: 3,
    name: 'Non-Code Projects',
    href: '#non-code-projects',
  },
];

export const myProjects = [
  {
    title: 'Communication App',
    desc: 'Online community space with real-time messaging, custom servers and channels',
    subdesc: 
    `Focus: <span class="font-thin">Learning and implementing real-time communication with web sockets. (2-week build deadline)</span><br><br>
Result: <span class="font-thin"> Delivered a precise, high-quality web app while expanding my technical skills, and proficiency in real-time communication systems. (3 feature CRUD)</span>`,
    liveLink: 'https://elya-le-banter.onrender.com',
    repoLink: 'https://github.com/elya-le/Banter/',
    texture: '/textures/project/project1.mp4',
    previewImg1: '/assets/banter1.png',
    previewImg2: '/assets/banter2.png',
    previewImg3: '/assets/banter3.png',
    previewImg4: '/assets/banter4.png',
    tags: [
      { id: 1, name: 'React.js', color: '#393D00', }, // React.js
      { id: 3, name: 'Flask', color: '#393D00' }, // Flask
      { id: 4, name: 'PostgreSQL', color: '#393D00' }, // PostgreSQL
      { id: 7, name: 'Socket.io', color: '#393D00' }, // Socket.io
      { id: 5, name: 'SQLAlchemy', color: '#393D00' }, // SQLAlchemy
      { id: 6, name: 'Gunicorn', color: '#393D00' }, // Gunicorn
    ],
  },
  {
    title: 'E-commerce Platform',
    desc: 'Buy and sell online marketplace for unique, handmade and vintage items',
    subdesc: `Focus: <span class="font-thin"> Team collaboration, asynchronous development, version control, and feature integration. (2-week build deadline)</span><br><br>
Result: <span class="font-thin"> Delivered a React web app using agile workflows and pull requests to ensure cohesion and conflict resolution. (4 feature CRUD)</span>
`,
    liveLink: 'https://etsyclone-4ah1.onrender.com/',
    repoLink: 'https://github.com/TomArbaugh/Ets-E-Commerce/',
    previewImg1: '/assets/getsy1.png',
    previewImg2: '/assets/getsy2.png',
    previewImg3: '/assets/getsy3.png',
    previewImg3: '/assets/getsy4.png',
    tags: [
      { id: 1, name: 'React.js', color: '#393D00', }, // React - highly impressive, widely used frontend framework
      { id: 2, name: 'Python', color: '#393D00', }, // Python - versatile, backend and data-oriented
      { id: 3, name: 'Redux', color: '#393D00', }, // Redux - advanced state management, pairs well with React
      { id: 4, name: 'JavaScript', color: '#393D00', }, // JavaScript - core web technology
      { id: 5, name: 'Flask', color: '#393D00', }, // Flask - lightweight backend framework
      { id: 6, name: 'HTML5', color: '#393D00', }, // HTML5 - foundational but less "impressive"
      { id: 7, name: 'CSS3', color: '#393D00', }, // CSS3 - essential, but less technically complex
    ],
  },
  {
    title: 'Event Platform',
    desc: 'Connecting dog owners through event discovery, planning and community organization',
    subdesc: 
    `Focus:<span class="font-thin"> First independent full-stack social platform. (4-week build deadline)</span><br><br>
Result:<span class="font-thin"> A fully functional app that equips users in organizing and joining local meetups, showcasing my proficiency in backend and frontend integration. (2 feature CRUD)</span>`,
    liveLink: 'https://meetpup-elya.onrender.com/',
    repoLink: 'https://github.com/elya-le/authme-elya',
    previewImg1: '/assets/meetpup1.png',
    previewImg2: '/assets/meetpup2.png',
    previewImg3: '/assets/meetpup3.png',
    previewImg3: '/assets/meetpup4.png',
    previewImg3: '/assets/meetpup5.png',
    tags: [
      { id: 1, name: 'Node.js', color: '#393D00' }, // Node.js green
      { id: 2, name: 'Express', color: '#393D00' }, // Express gray
      { id: 3, name: 'PostgreSQL', color: '#393D00' }, // PostgreSQL blue
      { id: 4, name: 'Sequelize', color: '#393D00', }, // Sequelize blue
      { id: 5, name: 'React.js', color: '#393D00', }, // React.js
      { id: 6, name: 'JavaScript', color: '#393D00', }, // JavaScript yellow
    ],
  },
  {
    title: 'Current Portfolio Site',
    desc: 'Combining my love for 3D modeling, motion design and web development',
    subdesc:
    `Focus:<span class="font-thin"> Challenge myself to learn Three.js, Tailwind and Blender to design and build Elya.dev.<br><br>
Result:<span class="font-thin"> A clean, interactive site that highlights 3D elements and innovative design techniques.`,
    liveLink: '',
    repoLink: 'https://github.com/elya-le/Elya.dev',
    previewImg1: '/assets/portfolio1.png',
    previewImg2: '/assets/portfolio2.png',
    tags: [
      { id: 1, name: 'Three.js', color: '#393D00' }, // Three.js for 3D modeling and animations
      { id: 2, name: 'Blender', color: '#393D00', }, // Blender for creating 3D assets
      { id: 3, name: 'Vite', color: '#393D00', }, // Vite for the build tool
      { id: 4, name: 'React.js', color: '#393D00', }, // React.js (main framework for the UI)
      { id: 5, name: 'JavaScript', color: '#393D00', }, // JavaScript as the core language
      { id: 6, name: 'Tailwind CSS', color: '#393D00', }, // Tailwind for styling
    ],
  },
];

export const otherProjects = [
  {
    title: 'Weather App',
    desc: 'A simple weather forecasting app using OpenWeatherMap API',
    subdesc: 
    `Focus: <span class="font-thin">Learning API integration and data visualization. (1-week build deadline)</span><br><br>
Result: <span class="font-thin"> Delivered a functional weather app that fetches and displays weather data based on user input.</span>`,
    liveLink: 'https://example.com/weather-app',
    repoLink: 'https://github.com/username/weather-app',
    previewImg1: '/assets/weather1.png',
    previewImg2: '/assets/weather2.png',
    tags: [
      { id: 1, name: 'JavaScript', color: '#393D00', }, // JavaScript
      { id: 2, name: 'HTML5', color: '#393D00', }, // HTML5
      { id: 3, name: 'CSS3', color: '#393D00', }, // CSS3
    ],
  },
  {
    title: 'To-Do List App',
    desc: 'A simple to-do list app to manage daily tasks',
    subdesc: 
    `Focus: <span class="font-thin">Learning CRUD operations and local storage. (1-week build deadline)</span><br><br>
Result: <span class="font-thin"> Delivered a to-do list app that allows users to add, edit, and delete tasks, with data persistence using local storage.</span>`,
    liveLink: 'https://example.com/todo-app',
    repoLink: 'https://github.com/username/todo-app',
    previewImg1: '/assets/todo1.png',
    previewImg2: '/assets/todo2.png',
    tags: [
      { id: 1, name: 'JavaScript', color: '#393D00', }, // JavaScript
      { id: 2, name: 'HTML5', color: '#393D00', }, // HTML5
      { id: 3, name: 'CSS3', color: '#393D00', }, // CSS3
    ],
  },
];

// export const workExperiences = [
//   {
//     id: 1,
//     name: 'Company 1',
//     pos: 'Position Placeholder',
//     duration: 'Year - Year',
//     title: 'Placeholder description for the work experience at Company 1.',
//     icon: '/assets/placeholder-icon1.svg',
//     animation: 'animation1',
//   },
//   {
//     id: 2,
//     name: 'Company 2',
//     pos: 'Position Placeholder',
//     duration: 'Year - Year',
//     title: 'Placeholder description for the work experience at Company 2.',
//     icon: '/assets/placeholder-icon2.svg',
//     animation: 'animation2',
//   },
// ];
