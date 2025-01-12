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
];



export const myProjects = [
  {
    title: 'Communication App',
    desc: 'Online community space with real-time messaging, custom servers and channels',
    subdesc: 
    `<span class="font-semibold">Focus:</span> Learning and implementing real-time communication with web sockets. (2-week timeframe)<br>
<span class="font-semibold">Result:</span> Delivered a precise, high-quality web app while expanding my technical skills, pace and proficiency in real-time communication systems. (3 feature CRUD)`,
    liveLink: 'https://elya-le-banter.onrender.com',
    repoLink: 'https://github.com/elya-le/Banter/',
    texture: '/textures/project/project1.mp4',
    logo: '/assets/project-logo1.png',
    logoStyle: {
      backgroundColor: '#2A1816',
      border: '0.2px solid #36201D',
      boxShadow: '0px 0px 60px 0px #AA3C304D',
    },
    previewImg1: '/assets/banter1.png',
    previewImg2: '/assets/banter2.png',
    tags: [
      { id: 1, name: 'React.js', color: '#61dafb', textColor: '#000000' }, // React.js
      { id: 3, name: 'Flask', color: '#000000' }, // Flask
      { id: 4, name: 'PostgreSQL', color: '#336791' }, // PostgreSQL
      { id: 7, name: 'Socket.io', color: '#010101' }, // Socket.io
      { id: 5, name: 'SQLAlchemy', color: '#d73351' }, // SQLAlchemy
      { id: 6, name: 'Gunicorn', color: '#499848' }, // Gunicorn
    ],
  },
  {
    title: 'E-commerce Marketplace',
    desc: 'Buy and sell online platform for unique, handmade, and vintage items',
    subdesc: `<span class="font-semibold">Focus:</span> Team collaboration, asynchronous development, version control, and feature integration. (2-week timeframe)<br>
<span class="font-semibold">Result:</span> Delivered a React web app using agile workflows and pull requests to ensure cohesion and resolve conflicts.(4 feature CRUD)
`,
    liveLink: 'https://etsyclone-4ah1.onrender.com/',
    repoLink: 'https://github.com/TomArbaugh/Ets-E-Commerce/',
    texture: '/textures/project/project2.mp4',
    logo: '/assets/project-logo1.png',
    logoStyle: {
      backgroundColor: '#2A1816',
      border: '0.2px solid #36201D',
      boxShadow: '0px 0px 60px 0px #AA3C304D',
    },
    previewImg1: '/assets/getsy1.png',
    previewImg2: '/assets/getsy2.png',
    previewImg3: '/assets/getsy3.png',
    tags: [
      { id: 1, name: 'React', color: '#61dafb', textColor: '#000000' }, // React - highly impressive, widely used frontend framework
      { id: 2, name: 'Python', color: '#306998', textColor: '#ffffff' }, // Python - versatile, backend and data-oriented
      { id: 3, name: 'Redux', color: '#764ABC', textColor: '#ffffff' }, // Redux - advanced state management, pairs well with React
      { id: 4, name: 'JavaScript', color: '#F7DF1E', textColor: '#000000' }, // JavaScript - core web technology
      { id: 5, name: 'Flask', color: '#000000', textColor: '#ffffff' }, // Flask - lightweight backend framework
      { id: 6, name: 'HTML5', color: '#e34c26', textColor: '#ffffff' }, // HTML5 - foundational but less "impressive"
      { id: 7, name: 'CSS3', color: '#2965f1', textColor: '#ffffff' }, // CSS3 - essential, but less technically complex
    ],
  },
  {
    title: 'Social Event Platform',
    desc: 'Connecting dog owners through event discovery, planning, and community organization',
    subdesc: 
    `<span class="font-semibold">Focus:</span> Independently built my first full-stack social platform. (4-week timeframe)<br>
<span class="font-semibold">Result:</span> A fully functional app that equips users in organizing and joining local meetups, showcasing my proficiency in backend and frontend integration. (2 feature CRUD)`,
    liveLink: 'https://meetpup-elya.onrender.com/',
    repoLink: 'https://github.com/elya-le/authme-elya',
    texture: '/textures/project/project3.mp4',
    logo: '/assets/project-logo1.png',
    logoStyle: {
      backgroundColor: '#2A1816',
      border: '0.2px solid #36201D',
      boxShadow: '0px 0px 60px 0px #AA3C304D',
    },
    previewImg1: '/assets/meetpup4.png',
    previewImg2: '/assets/meetpup2.png',
    previewImg3: '/assets/meetpup3.png',
    tags: [
      { id: 1, name: 'Node.js', color: '#43853d' }, // Node.js green
      { id: 2, name: 'Express', color: '#787878' }, // Express gray
      { id: 3, name: 'PostgreSQL', color: '#336791' }, // PostgreSQL blue
      { id: 4, name: 'Sequelize', color: '#02a8ef', textColor: '#000000' }, // Sequelize blue
      { id: 5, name: 'React.js', color: '#61dafb', textColor: '#000000' }, // React.js
      { id: 6, name: 'JavaScript', color: '#f7df1e', textColor: '#000000' }, // JavaScript yellow
    ],
  },
  {
    title: 'Current portfolio site',
    desc: 'Combining my love for 3D modeling, motion design and web development',
    subdesc:
    `<span class="font-semibold">Focus:</span> Design and build this current portfolio site while learning Three.js, Tailwind frameworks, and Blender software for the first time. <br>
<span class="font-semibold">Result:</span> A clean, interactive site that highlights 3D elements and innovative design techniques.`,
    liveLink: '',
    repoLink: 'https://github.com/elya-le/Elya.dev',
    texture: '/textures/project/project4.mp4',
    logo: '/assets/project-logo1.png',
    logoStyle: {
      backgroundColor: '#2A1816',
      border: '0.2px solid #36201D',
      boxShadow: '0px 0px 60px 0px #AA3C304D',
    },
    previewImg1: '/assets/portfolio1.png',
    previewImg2: '/assets/portfolio2.png',
    tags: [
      { id: 1, name: 'Three.js', color: '#000000' }, // Three.js for 3D modeling and animations
      { id: 2, name: 'Blender', color: '#f5792a', textColor: '#000000' }, // Blender for creating 3D assets
      { id: 3, name: 'Vite', color: '#646cff', textColor: '#000000' }, // Vite for the build tool
      { id: 4, name: 'React.js', color: '#58C4DC', textColor: '#000000' }, // React.js (main framework for the UI)
      { id: 5, name: 'JavaScript', color: '#f7df1e', textColor: '#000000' }, // JavaScript as the core language
      { id: 6, name: 'Tailwind CSS', color: '#38BDF8', textColor: '#000000' }, // Tailwind for styling
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
