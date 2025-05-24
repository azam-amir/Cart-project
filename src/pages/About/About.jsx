import { Descriptions } from "antd";
import { motion } from "framer-motion";
import { memo } from "react";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const aboutData = [
  {
    label: "About Me",
    content:
      "Hello! My name is Muhammad Azam Raza, and I am a passionate and experienced Frontend Developer...",
  },
  {
    label: "My Expertise",
    content:
      "I take pride in my strong skills and deep understanding of modern frontend technologies...",
  },
  {
    label: "Project Showcase",
    content:
      "In a recent project, I developed a robust ecommerce platform with a user-friendly interface...",
  },
  {
    label: "Why Choose Me?",
    content:
      "I believe that my dedication, technical proficiency, and passion help me exceed my clients' expectations...",
  },
  {
    label: "Let's Connect",
    content:
      "If you are in need of a committed and experienced frontend developer who can take your projects to the next level...",
  },
];

function About() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{
        padding: "20px 15px",
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <motion.h1
        style={{
          color: "#5a5a5a",
          marginBottom: "30px",
          marginTop: "0",
          textAlign: "center",
          fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
          lineHeight: "1.3",
        }}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        About Us
      </motion.h1>

      <motion.div
        variants={containerVariants}
        style={{
          marginTop: "30px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {aboutData?.map(({ label, content }, i) => (
          <motion.div key={i} variants={itemVariants}>
            <Descriptions
              bordered
              column={1}
              size="small"
              labelStyle={{
                fontWeight: "bold",
                backgroundColor: "#fafafa",
                borderTopLeftRadius: "8px",
                borderBottomLeftRadius: "8px",
                width: "120px",
                fontSize: "clamp(12px, 3vw, 14px)",
                padding: "8px 12px",
              }}
              contentStyle={{
                backgroundColor: "#fff",
                borderTopRightRadius: "8px",
                borderBottomRightRadius: "8px",
                fontSize: "clamp(13px, 3vw, 15px)",
                padding: "8px 12px",
              }}
            >
              <Descriptions.Item label={label} span={3}>
                {content}
              </Descriptions.Item>
            </Descriptions>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default memo(About);
