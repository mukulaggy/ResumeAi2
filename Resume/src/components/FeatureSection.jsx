import { Upload, Clipboard, Zap, CheckCircle, LayoutDashboard, Sliders } from "lucide-react"

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <div
    className="bg-neutral-900 p-8 rounded-2xl border border-neutral-700 hover:border-indigo-500 transition-all duration-300 group animate__animated animate__fadeInUp"
    style={{ animationDelay: `${delay}s` }}
  >
    <div className="w-14 h-14 bg-indigo-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-indigo-600/30 transition-colors duration-300">
      <Icon className="w-8 h-8 text-indigo-500" />
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
)

const FeaturesSection = () => {
  const features = [
    {
      icon: Upload,
      title: "Smart Resume Upload",
      description: "Upload multiple resumes in PDF format for instant AI-powered analysis and matching",
    },
    {
      icon: Clipboard,
      title: "Match Percentage",
      description: "Get precise match percentages between resumes and job descriptions using advanced AI algorithms",
    },
    {
      icon: Zap,
      title: "Skill Analysis",
      description: "Identify missing skills and get actionable recommendations for improvement",
    },
    {
      icon: CheckCircle,
      title: "Auto Shortlisting",
      description: "Automatically shortlist candidates with match percentages above 70%",
    },
    {
      icon: LayoutDashboard,
      title: "Intuitive Dashboard",
      description: "User-friendly interface for managing and analyzing multiple resumes efficiently",
    },
    {
      icon: Sliders,
      title: "Smart Suggestions",
      description: "Get personalized improvement recommendations and enhancement suggestions",
    },
  ]

  return (
    <section id="features" className="py-20 bg-gray-900 ">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate__animated animate__fadeIn">
          <h2 className="text-4xl font-bold text-white mb-4">Powerful Features</h2>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto">
            Advanced AI-powered tools to revolutionize your resume analysis and recruitment process
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={(index % 3) * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection

