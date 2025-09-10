// File: clinic-frontend/src/pages/ServicesPage.tsx

const ServicesPage = () => {
  return (
    <div className="max-w-7xl mx-auto text-center py-20 px-4">
      <h1 className="text-5xl font-extrabold text-dark-text">Our Services</h1>
      <p className="mt-4 text-lg text-dark-subtle">
        Comprehensive healthcare solutions tailored for you.
      </p>
      {/* This is just a placeholder for the actual service list */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-dark-card p-8 rounded-lg">
          <h3 className="text-2xl font-bold">General Consultation</h3>
        </div>
        <div className="bg-dark-card p-8 rounded-lg">
          <h3 className="text-2xl font-bold">Specialist Advice</h3>
        </div>
        <div className="bg-dark-card p-8 rounded-lg">
          <h3 className="text-2xl font-bold">E-Prescriptions</h3>
        </div>
      </div>
    </div>
  );
};
export default ServicesPage;