// File: clinic-frontend/src/pages/ServicesPage.tsx
import PageWrapper from '../components/PageWrapper';

const ServicesPage = () => {
  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto py-20 px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-dark-text">Our Services</h1>
          <p className="mt-4 text-lg text-dark-subtle max-w-3xl mx-auto">
            At our clinic, we offer a wide range of comprehensive healthcare services designed to meet your needs. From routine check-ups to specialized treatments, our experienced team is dedicated to providing high-quality care in a compassionate and professional environment.
          </p>
        </div>

        {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16" style={{ perspective: '1000px' }}>
            <PageWrapper>
            <div className="bg-dark-card p-8 rounded-lg shadow-lg hover:shadow-xl transform-style-preserve-3d hover:rotate-y-12 hover:scale-105 transition-all duration-500">
              <img
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="General Consultation"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-bold text-dark-text mb-2">General Consultation</h3>
              <p className="text-dark-subtle">
                Comprehensive health assessments and consultations for all ages. Our general practitioners provide personalized care and preventive health advice.
              </p>
            </div>
            </PageWrapper>
            <PageWrapper>
            <div className="bg-dark-card p-8 rounded-lg shadow-lg hover:shadow-xl transform-style-preserve-3d hover:rotate-y-12 hover:scale-105 transition-all duration-500">
              <img
                src="https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Specialist Advice"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-bold text-dark-text mb-2">Specialist Advice</h3>
              <p className="text-dark-subtle">
                Access to a network of specialists including cardiologists, dermatologists, and more. Get expert opinions and advanced treatments.
              </p>
            </div>
            </PageWrapper>
            <PageWrapper>
            <div className="bg-dark-card p-8 rounded-lg shadow-lg hover:shadow-xl transform-style-preserve-3d hover:rotate-y-12 hover:scale-105 transition-all duration-500">
              <img
                src="https://images.pexels.com/photos/6285383/pexels-photo-6285383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="E-Prescriptions"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-bold text-dark-text mb-2">E-Prescriptions</h3>
              <p className="text-dark-subtle">
                Convenient electronic prescriptions delivered directly to your preferred pharmacy. Fast, secure, and paperless medication management.
              </p>
            </div>
            </PageWrapper>
          <PageWrapper>
          <div className="bg-dark-card p-8 rounded-lg shadow-lg hover:shadow-xl transform-style-preserve-3d hover:rotate-y-12 hover:scale-105 transition-all duration-500">
            <img
              src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              alt="Diagnostic Services"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-2xl font-bold text-dark-text mb-2">Diagnostic Services</h3>
            <p className="text-dark-subtle">
              State-of-the-art diagnostic testing including blood work, imaging, and screenings to help identify and monitor health conditions.
            </p>
          </div>
          </PageWrapper>
          <PageWrapper>
          <div className="bg-dark-card p-8 rounded-lg shadow-lg hover:shadow-xl transform-style-preserve-3d hover:rotate-y-12 hover:scale-105 transition-all duration-500">
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              alt="Telemedicine"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-2xl font-bold text-dark-text mb-2">Telemedicine</h3>
            <p className="text-dark-subtle">
              Virtual consultations from the comfort of your home. Connect with our healthcare professionals via secure video calls.
            </p>
          </div>
          </PageWrapper>
          <PageWrapper>
          <div className="bg-dark-card p-8 rounded-lg shadow-lg hover:shadow-xl transform-style-preserve-3d hover:rotate-y-12 hover:scale-105 transition-all duration-500">
            <img
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              alt="Preventive Care"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-2xl font-bold text-dark-text mb-2">Preventive Care</h3>
            <p className="text-dark-subtle">
              Focus on preventing illnesses before they occur. Vaccinations, health screenings, and lifestyle counseling for optimal wellness.
            </p>
          </div>
          </PageWrapper>
        </div>

        {/* Additional Content Section with Image and Text */}
        <div className="relative mb-16 overflow-hidden rounded-lg shadow-lg">
          <img
            src="https://images.pexels.com/photos/6169040/pexels-photo-6169040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Clinic Interior"
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h2 className="text-4xl font-bold mb-4">Advanced Healthcare at Your Fingertips</h2>
              <p className="text-xl max-w-2xl mx-auto">
                Experience state-of-the-art medical facilities and compassionate care. Our team of experts is dedicated to your well-being, offering personalized treatments in a welcoming environment.
              </p>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="bg-dark-card p-8 rounded-lg shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-dark-text text-center mb-6">Our Clinic in Action</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.youtube.com/embed/t299t45xeSE"
              title="Clinic Services Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-64 md:h-96 rounded-md"
            ></iframe>
          </div>
          <p className="mt-4 text-dark-subtle text-center">
            Take a virtual tour of our modern clinic facilities and see how we provide exceptional healthcare services to our patients.
          </p>
        </div>

        {/* Additional Text Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-dark-text mb-4">Why Choose Our Clinic?</h2>
          <p className="text-lg text-dark-subtle max-w-4xl mx-auto">
            Our clinic is committed to providing exceptional healthcare services with a patient-centered approach. We combine cutting-edge technology with compassionate care to ensure you receive the best possible treatment. From our modern facilities to our dedicated team of professionals, we're here to support your health journey every step of the way.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ServicesPage;
