const JobSeekersSection = () => {
    return (
      <section id="students" className="py-20 bg-neutral-900">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content Side */}
            <div className="animate__animated animate__fadeInLeft">
              <h2 className="text-4xl font-bold text-white mb-6">For Job Seekers</h2>
              <p className="text-xl text-gray-300 mb-8">
                Maximize your job search success with AI-powered resume analysis
              </p>
  
              <div className="space-y-6">
                {/* Feature 1 */}
                <Feature
                  icon={<CheckCircleIcon />}
                  title="Match Analysis"
                  description="Get instant feedback on how well your resume matches specific job descriptions"
                />
  
                {/* Feature 2 */}
                <Feature
                  icon={<LightningBoltIcon />}
                  title="Skill Gap Analysis"
                  description="Identify missing skills and qualifications needed for your target role"
                />
  
                {/* Feature 3 */}
                <Feature
                  icon={<ClipboardIcon />}
                  title="Smart Suggestions"
                  description="Receive personalized recommendations to improve your resume"
                />
              </div>
  
              <div className="mt-10">
                <a
                  href="#"
                  className="inline-flex items-center px-8 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-300"
                >
                  Get Started
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </a>
              </div>
            </div>
  
            {/* Interactive Visual Side */}
            <div className="animate__animated animate__fadeInRight">
              <div className="relative">
                {/* Glowing background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 rounded-2xl filter blur-3xl"></div>
  
                {/* Mock Interface */}
                <div className="relative bg-neutral-800 p-6 rounded-2xl border border-neutral-700">
                  {/* Interface Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
  
                  {/* Match Percentage Circle */}
                  <div className="flex justify-center mb-8">
                    <div className="relative w-32 h-32">
                      <svg className="transform -rotate-90 w-32 h-32">
                        <circle
                          cx="64"
                          cy="64"
                          r="60"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          className="text-neutral-700"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="60"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          className="text-indigo-500"
                          strokeDasharray="377"
                          strokeDashoffset="94"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">75%</span>
                      </div>
                    </div>
                  </div>
  
                  {/* Mock Analysis Results */}
                  <div className="space-y-4">
                    <div className="h-4 bg-neutral-700 rounded-full w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-neutral-700 rounded-full w-1/2 animate-pulse"></div>
                    <div className="h-4 bg-neutral-700 rounded-full w-5/6 animate-pulse"></div>
                    <div className="h-4 bg-neutral-700 rounded-full w-2/3 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  const Feature = ({ icon, title, description }) => (
    <div className="flex items-start space-x-4">
      <div className="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center flex-shrink-0">{icon}</div>
      <div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  )
  
  const CheckCircleIcon = () => (
    <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
  
  const LightningBoltIcon = () => (
    <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
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
  
  const ArrowRightIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  )
  
  export default JobSeekersSection
  
  