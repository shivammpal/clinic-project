// File: clinic-frontend/src/pages/MyProfilePage.tsx

const MyProfilePage = () => {
  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <h1 className="text-5xl font-extrabold text-dark-text text-center">My Profile</h1>
      <div className="mt-8 bg-dark-card p-8 rounded-lg space-y-4">
        <p className="text-lg text-dark-subtle">
          This page will display your personal information, appointment history, and prescriptions. You will be able to upload a profile picture and update your details here.
        </p>
      </div>
    </div>
  );
};
export default MyProfilePage;