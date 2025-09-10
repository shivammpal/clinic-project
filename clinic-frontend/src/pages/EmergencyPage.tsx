// File: clinic-frontend/src/pages/EmergencyPage.tsx

const EmergencyPage = () => {
  return (
    <div className="max-w-4xl mx-auto text-center py-20 px-4">
      <h1 className="text-5xl font-extrabold text-red-500">Emergency / Quick Help</h1>
      <p className="mt-4 text-lg text-dark-subtle">
        If you are experiencing a medical emergency, please call your local emergency number immediately.
      </p>
      <div className="mt-8 bg-dark-card p-6 rounded-lg">
        <p className="text-2xl font-bold">National Emergency Number: <span className="text-red-400">911</span></p>
        <p className="text-2xl font-bold mt-4">Local Ambulance: <span className="text-red-400">123-456-7890</span></p>
      </div>
    </div>
  );
};
export default EmergencyPage;