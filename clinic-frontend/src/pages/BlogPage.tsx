// File: clinic-frontend/src/pages/BlogPage.tsx
import PageWrapper from '../components/PageWrapper';

const blogs = [
  {
    id: 1,
    title: "Understanding Hypertension: Causes and Management",
    author: "Dr. Emily Carter",
    specialty: "Cardiology",
    date: "October 1, 2023",
    excerpt: "Hypertension, or high blood pressure, affects millions worldwide. In this article, we explore the common causes of hypertension and effective strategies for management and prevention.",
    url: "https://www.artemishospitals.com/blog/fall-prevention-awareness-week"
  },
  {
    id: 2,
    title: "Mental Health in the Workplace",
    author: "Dr. Michael Johnson",
    specialty: "Psychiatry",
    date: "September 15, 2023",
    excerpt: "Maintaining mental health is essential for productivity and well-being. Discover practical tips for managing stress and fostering a supportive work environment.",
    url: "https://www.artemishospitals.com/blog/early-symptoms-of-brain-tumor"
  },
  {
    id: 3,
    title: "Nutrition Tips for a Healthy Heart",
    author: "Dr. Sarah Lee",
    specialty: "Nutrition",
    date: "August 20, 2023",
    excerpt: "Diet plays a crucial role in heart health. Learn about heart-friendly foods and simple nutrition tips to reduce the risk of cardiovascular diseases.",
    url: "https://www.artemishospitals.com/blog/cardiac-arrest-symptoms-causes-treatment"
  },
  {
    id: 4,
    title: "The Importance of Regular Check-ups",
    author: "Dr. David Kim",
    specialty: "General Medicine",
    date: "July 10, 2023",
    excerpt: "Regular health check-ups can detect issues early. Find out why preventive care is key to long-term health and what to expect during your visits.",
    url: "https://www.artemishospitals.com/blog/migraine-headache-symptoms-causes-cure"
  }
];

const BlogPage = () => {
  return (
    <PageWrapper>
      <div className="min-h-screen bg-dark-bg text-dark-text max-w-7xl mx-auto py-20 px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-dark-text mb-6">Health & Wellness Blog</h1>
          <p className="mt-4 text-lg text-dark-subtle">
            Articles written by our doctors to help you stay informed and healthy.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <a
              key={blog.id}
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gray-700 rounded-lg shadow-xl p-6 hover:shadow-2xl hover:rotateY-12 hover:scale-105 transition-all duration-500 no-underline transform perspective-1000"
            >
              <h2 className="text-xl font-semibold text-white mb-2">{blog.title}</h2>
              <p className="text-sm text-gray-300 mb-1">
                By {blog.author} - {blog.specialty}
              </p>
              <p className="text-xs text-gray-400 mb-4">{blog.date}</p>
              <p className="text-white">{blog.excerpt}</p>
            </a>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default BlogPage;
