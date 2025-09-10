// File: clinic-frontend/src/pages/SettingsPage.tsx

const SettingsPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <h1 className="text-5xl font-extrabold text-dark-text text-center">Settings</h1>
       <div className="mt-8 bg-dark-card p-8 rounded-lg space-y-4">
        <p className="text-lg text-dark-subtle">
          Here you will be able to manage your account settings, such as changing your password, managing notifications, and setting your preferences for the application.
        </p>
      </div>
    </div>
  );
};
export default SettingsPage;