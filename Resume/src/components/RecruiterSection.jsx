const RecruitersSection = () => {
    return (
      <section id="recruiters" className="py-20 bg-gray-900 ">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Interactive Visual Side */}
            <div className="animate__animated animate__fadeInLeft order-2 lg:order-1">
              <div className="relative">
                {/* Glowing background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 rounded-2xl filter blur-3xl"></div>
  
                {/* Mock Dashboard */}
                <div className="relative bg-neutral-900 p-6 rounded-2xl border border-neutral-700">
                  {/* Dashboard Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
  
                  {/* Mock Resume List */}
                  <div className="space-y-4">
                    <ResumeItem name="Resume_1.pdf" score="92%" scoreColor="text-green-500" />
                    <ResumeItem name="Resume_2.pdf" score="78%" scoreColor="text-yellow-500" />
                    <ResumeItem name="Resume_3.pdf" score="65%" scoreColor="text-red-500" />
                  </div>
                </div>
              </div>
            </div>
  
            {/* Content Side */}
            <div className="animate__animated animate__fadeInRight order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-white mb-6">For Recruiters</h2>
              <p className="text-xl text-gray-300 mb-8">
                Streamline your hiring process with bulk resume analysis and intelligent shortlisting
              </p>
  
              <div className="space-y-6">
                <Feature
                  icon={<UploadIcon />}
                  title="Bulk Resume Processing"
                  description="Upload and analyze multiple resumes simultaneously against job requirements"
                />
                <Feature
                  icon={<ClipboardIcon />}
                  title="Automated Shortlisting"
                  description="AI-powered candidate ranking and automatic shortlisting based on match scores"
                />
                <Feature
                  icon={<ChartIcon />}
                  title="Detailed Analytics"
                  description="Comprehensive insights into candidate strengths, weaknesses, and potential"
                />
              </div>
  
              <div className="mt-10">
                <a
                  href="#"
                  className="inline-flex items-center px-8 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-300"
                >
                  Start Recruiting
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  const ResumeItem = ({ name, score, scoreColor }) => (
    <div className="bg-neutral-800 p-4 rounded-lg flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-indigo-600/20 rounded-full flex items-center justify-center">
          <UserIcon className="w-6 h-6 text-indigo-500" />
        </div>
        <span className="text-white">{name}</span>
      </div>
      <span className={scoreColor}>{score}</span>
    </div>
  )
  
  const Feature = ({ icon, title, description }) => (
    <div className="flex items-start space-x-4">
      <div className="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center flex-shrink-0">{icon}</div>
      <div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  )
  
  const UserIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  )
  
  const UploadIcon = () => (
    <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
      />
    </svg>
  )
  
  const ClipboardIcon = () => (
    <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
      />
    </svg>
  )
  
  const ChartIcon = () => (
    <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  )
  
  const ArrowRightIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  )
  
  export default RecruitersSection
  
  