import React from 'react'
import './About.css'
const About = () => {
  const teamMembers = [ 
    { 
      name: 'Sapnish Sharma ',
      role: "Product Manager and Front End Lead",
      description:"As a dedicated Product Manager and Front-End Lead, I've spearheaded the development of MaestroMinds. I've driven product strategy, user experience design, and technical implementation, ensuring a seamless and efficient platform. By leveraging React and Vite, I've built a dynamic and performant interface, prioritizing user experience and accessibility.",
      imgSrc: './img/profilepic.png' }, 
      
    { name: 'Joshua Villanueva',
      role: 'Full Stack Developer and Incharge of Database', 
      description: "In charge of creating and maintaining the database used in registration, login, and authentication. Handles interactions between the Python back end and the React front end, such as updates, requests, and console logging.",
      imgSrc: './img/JoshPicture.jpg', }, 
      
    { name: 'Erica Morales Salinas', 
      role: 'Testing and Documentation Lead', 
      description: "Developing and executing test plans to ensure the system, database, and user interface are secure and reliable. Documenting initial plans as well as updating as project is developed and adjusted.",
      imgSrc: 'https://media.licdn.com/dms/image/v2/D4E03AQHxAe7qaCIKzQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1696730458546?e=1738800000&v=beta&t=ZKmd66a5RGZ6CRYG0be83a4GF95WTfypc0DGOwIRnqc'},
  
    { name: 'Hayden Eddy', 
      role: 'Back End Developer',
      description: "Responsible for testing and project organization. Developing and maintaining the project trello workspace to ensure the project is well managed. Monitors code validity, conciseness, and efficiency." ,
      imgSrc: './img/Hayden.png'}, ];
  return (
    <div className="team-container">
       {teamMembers.map((member, index) => ( 
        <div key={index} className="team-member"> 
          <img src={member.imgSrc} alt={`${member.name}`} className="team-member-img" /> 
          <h3>{member.name}</h3> 
          <h4>{member.role}</h4> 
          <p className="description">{member.description}</p> 
          </div> ))}
           </div>
  )
}

export default About