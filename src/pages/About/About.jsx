import React from "react";
import { Descriptions } from "antd";

function About() {
  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ color: "#5a5a5a" }}>About Us</h1>
      <Descriptions bordered style={{ marginTop: 30 }}>
        <Descriptions.Item label="About Me">
          Hello! My name is Muhammad Azam Raza, and I am a passionate and
          experienced Frontend Developer who enjoys facing new challenges and
          creating innovative solutions. I have one year of experience in web
          development, and I have handled various projects throughout my career,
          ensuring no compromise in quality and user experience.
        </Descriptions.Item>
        <Descriptions.Item label="My Expertise">
          I take pride in my strong skills and deep understanding of modern
          frontend technologies and frameworks such as ReactJS, Redux, and Ant
          Design. I also utilize React Query in my projects, which is a powerful
          state management tool that helps in making user interfaces efficient
          and responsive.
        </Descriptions.Item>
        <Descriptions.Item label="Project Showcase">
          In a recent project, I developed a robust ecommerce platform with a
          user-friendly interface and advanced features. I utilized React Query
          for state management, leveraged Redux, and employed Ant Design
          components to create an aesthetically pleasing user interface.
        </Descriptions.Item>
        <Descriptions.Item label="Why Choose Me?">
          I believe that my dedication, technical proficiency, and passion help
          me exceed my clients' expectations. I approach each project uniquely,
          with the goal of always providing high-quality and scalable solutions.
        </Descriptions.Item>
        <Descriptions.Item label="Let's Connect">
          If you are in need of a committed and experienced frontend developer
          who can take your projects to the next level, I am always available.
          Please feel free to contact me at azamrazamuhammad7@gmail.com. I look
          forward to starting a successful collaboration. Thank you, and I hope
          we can connect soon!
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}

export default About;
