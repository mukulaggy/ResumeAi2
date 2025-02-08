import React from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

const SelectionPage = () => {
    const navigate = useNavigate()

    const handleCardClick = (type) => {
      if (type === "Student") {
        navigate("/student-auth")
      } 
        else if (type === "Recruiter") {
        navigate("/recruiter-registration")
      }
    }
  

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold text-white text-center mb-12 tracking-wider"
        >
          CHOOSE YOUR PATH
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {["Student", "Recruiter"].map((type, index) => (
            <motion.div
              key={type}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255,255,255,0.2)" }}
              className="bg-black rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 ease-in-out border border-white"
              onClick={() => handleCardClick(type)}
            >
              <div className="h-full p-8 flex flex-col justify-center items-center relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-white opacity-0"
                  whileHover={{ opacity: 0.05 }}
                  transition={{ duration: 0.3 }}
                />
                <h2 className="text-3xl font-bold mb-4 text-white relative z-10">Are you a {type}?</h2>
                <p className="text-gray-400 text-center relative z-10">Click here to get started</p>
                <motion.div
                  className="mt-6 w-12 h-12 rounded-full border-2 border-white flex items-center justify-center relative z-10"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SelectionPage

