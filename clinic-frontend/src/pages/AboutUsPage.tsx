// File: clinic-frontend/src/pages/AboutUsPage.tsx

import PageWrapper from '../components/PageWrapper'; // 1. Import the wrapper

const AboutUsPage = () => {
  return (
    // 2. Wrap your existing content with the PageWrapper component
    <PageWrapper> 
      <div className="max-w-4xl mx-auto text-center py-20 px-4">
        {/* I've updated the styles slightly to match the rest of the dark theme */}
        <h1 className="text-5xl font-extrabold text-dark-text">About Us</h1>
        <p className="mt-4 text-lg text-dark-subtle">
          Content for this page will be added soon.
        </p>
      </div>
    </PageWrapper>
  );
};
export default AboutUsPage;