// File: clinic-frontend/src/pages/BlogPage.tsx
import PageWrapper from '../components/PageWrapper';
const BlogPage = () => {
  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto text-center py-20 px-4">
        <h1 className="text-5xl font-extrabold text-dark-text">Health & Wellness Blog</h1>
        <p className="mt-4 text-lg text-dark-subtle">
          Articles written by our doctors to help you stay informed. A list of posts will be shown here.
        </p>
      </div>
    </PageWrapper>
  );
};
export default BlogPage;