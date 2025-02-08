import React from "react"
import { SignIn } from "@clerk/clerk-react"

const StudentAuth = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <SignIn redirectUrl="/student-dashboard" />
      </div>
    </div>
  )
}

export default StudentAuth

