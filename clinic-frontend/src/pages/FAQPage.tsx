// File: clinic-frontend/src/pages/FAQPage.tsx
import PageWrapper from '../components/PageWrapper';
const FAQPage = () => {
  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto text-center py-20 px-4">
        <h1 className="text-5xl font-extrabold text-dark-text">Frequently Asked Questions</h1>
        <p className="mt-4 text-lg text-dark-subtle">
          Find answers to common questions about our services, insurance, and more.
        </p>
      </div>
    </PageWrapper>
  );
};
export default FAQPage;