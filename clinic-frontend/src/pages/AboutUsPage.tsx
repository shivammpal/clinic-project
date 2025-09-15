// File: clinic-frontend/src/pages/AboutUsPage.tsx

import PageWrapper from '../components/PageWrapper'; // 1. Import the wrapper

const AboutUsPage = () => {
  return (
    // 2. Wrap your existing content with the PageWrapper component
    <PageWrapper> 
      <div className="min-h-screen bg-dark-bg text-dark-text">
        {/* Hero Section with 3D Parallax Effect */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-cover bg-center" style={{backgroundImage: 'url(https://images.pexels.com/photos/1692693/pexels-photo-1692693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'}}>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900 opacity-50"></div>
          <div className="relative z-10 text-center transform-gpu perspective-1000">
            <h1 className="text-6xl font-extrabold mb-6 animate-pulse">About Our Clinic</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Discover the heart of compassionate healthcare at our state-of-the-art clinic, where innovation meets empathy.
            </p>
            <div className="transform rotateX-12 rotateY-12 hover:rotateX-0 hover:rotateY-0 transition-transform duration-1000">
              <img src="" alt="Clinic Exterior" className="mx-auto rounded-lg shadow-2xl" />
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-dark-secondary rounded-lg shadow-lg" style={{backgroundImage: 'url(https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)', backgroundRepeat: 'no-repeat', backgroundPosition: 'right center', backgroundSize: '40%'}}>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">About Our Clinic</h2>
              <p className="text-lg mb-6">
                Welcome to our premier healthcare facility, dedicated to providing exceptional medical care in a compassionate and patient-centered environment. Our clinic has been a cornerstone of the community for over two decades, evolving with the latest advancements in medical technology while maintaining the personal touch that patients value most.
              </p>
              <p className="text-lg mb-6">
                We pride ourselves on our multidisciplinary approach to healthcare, bringing together experts from various fields to ensure comprehensive care for every patient. From routine check-ups to complex treatments, our team is committed to delivering personalized healthcare solutions that prioritize your well-being and comfort.
              </p>
              <p className="text-lg mb-6">
                Our modern facility is equipped with cutting-edge diagnostic tools and treatment rooms designed for optimal patient experience. We understand that visiting a healthcare provider can be stressful, which is why we've created a welcoming atmosphere that puts patients at ease from the moment they walk through our doors.
              </p>
              <p className="text-lg">
                At the heart of our practice is a commitment to excellence, innovation, and community service. We continuously invest in professional development for our staff and regularly update our equipment to ensure we provide the highest standard of care available.
              </p>
            </div>
          </div>
        </section>

        {/* Our History */}
        <section className="py-20 px-4 bg-dark-secondary">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-10 text-center">Our History</h2>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">2000: The Beginning</h3>
                  <p className="text-lg">
                    Founded in 2000 by Dr. Sarah Johnson, our clinic started as a small family practice with a vision to revolutionize community healthcare. What began as a modest operation has grown into a comprehensive medical center serving thousands of patients annually.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">2010: Expansion and Innovation</h3>
                  <p className="text-lg">
                    In 2010, we expanded our services to include specialized departments and invested heavily in digital health records. This transformation allowed us to provide more efficient care and better track patient outcomes, setting new standards in our region.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">2020: Embracing Technology</h3>
                  <p className="text-lg">
                    The COVID-19 pandemic accelerated our adoption of telemedicine and digital health solutions. We implemented video consultations, online appointment booking, and advanced health monitoring systems to ensure continuity of care during challenging times.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Today: A Legacy of Care</h3>
                  <p className="text-lg">
                    Today, our clinic stands as a beacon of medical excellence, combining traditional values with cutting-edge technology. We continue to grow and adapt, always putting patient needs first and striving for the highest standards in healthcare delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision with 3D Cards */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-10 text-center">Mission & Vision</h2>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="bg-dark-secondary p-8 rounded-lg shadow-2xl transform hover:rotateY-180 transition-transform duration-1000 perspective-1000">
                <div className="backface-hidden">
                  <h3 className="text-3xl font-semibold mb-4 text-blue-400">Our Mission</h3>
                  <p className="text-lg">
                    To provide accessible, high-quality healthcare services that improve the lives of our patients and community. We are committed to delivering compassionate care, fostering health education, and promoting wellness through innovative medical practices and personalized treatment plans.
                  </p>
                  <p className="text-lg mt-4">
                    Our mission extends beyond treatment to prevention and education, empowering patients to take control of their health. We strive to create a healthcare environment where every individual feels valued, heard, and cared for.
                  </p>
                </div>
              </div>
              <div className="bg-dark-secondary p-8 rounded-lg shadow-2xl transform hover:rotateY-180 transition-transform duration-1000 perspective-1000">
                <div className="backface-hidden">
                  <h3 className="text-3xl font-semibold mb-4 text-green-400">Our Vision</h3>
                  <p className="text-lg">
                    To be the leading healthcare provider in our region, recognized for excellence in patient care, medical innovation, and community service. We envision a future where advanced healthcare is accessible to all, and where our clinic serves as a model for compassionate and effective medical practice.
                  </p>
                  <p className="text-lg mt-4">
                    Through continuous improvement and adaptation to emerging healthcare trends, we aim to set new standards in patient satisfaction, clinical outcomes, and community health initiatives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Services */}
        <section className="py-20 px-4 bg-dark-secondary">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-10 text-center">Our Services</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center transform hover:scale-110 transition-transform duration-300">
                <img src="https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Primary Care" className="rounded-lg mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Primary Care</h3>
                <p className="text-lg">
                  Comprehensive primary healthcare services including routine check-ups, preventive care, chronic disease management, and health screenings. Our experienced physicians provide personalized care plans tailored to your unique health needs.
                </p>
              </div>
              <div className="text-center transform hover:scale-110 transition-transform duration-300">
                <img src="https://images.pexels.com/photos/7089408/pexels-photo-7089408.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Specialized Care" className="rounded-lg mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Specialized Care</h3>
                <p className="text-lg">
                  Access to specialists in cardiology, dermatology, orthopedics, and more. Our collaborative approach ensures seamless coordination between primary and specialty care for optimal patient outcomes.
                </p>
              </div>
              <div className="text-center transform hover:scale-110 transition-transform duration-300">
                <img src="https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Diagnostic Services" className="rounded-lg mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Diagnostic Services</h3>
                <p className="text-lg">
                  State-of-the-art diagnostic imaging and laboratory services including X-rays, MRIs, CT scans, blood tests, and advanced screening procedures. Fast, accurate results with minimal wait times.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-10 text-center">Our Team</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center transform hover:rotate-3 transition-transform duration-300">
                <img src="https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Dr. Sarah Johnson" className="rounded-full mx-auto mb-4 w-48 h-48 object-cover" />
                <h3 className="text-xl font-semibold">Dr. Sarah Johnson</h3>
                <p className="text-dark-subtle">Founder & Chief Physician</p>
                <p className="text-sm mt-2">
                  With over 25 years of experience in family medicine, Dr. Johnson leads our team with dedication and expertise, ensuring every patient receives the highest quality care.
                </p>
              </div>
              <div className="text-center transform hover:rotate-3 transition-transform duration-300">
                <img src="https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Dr. Michael Smith" className="rounded-full mx-auto mb-4 w-48 h-48 object-cover" />
                <h3 className="text-xl font-semibold">Dr. Michael Smith</h3>
                <p className="text-dark-subtle">Cardiologist</p>
                <p className="text-sm mt-2">
                  Specializing in cardiovascular health, Dr. Smith brings cutting-edge treatments and preventive strategies to keep hearts healthy and strong.
                </p>
              </div>
              <div className="text-center transform hover:rotate-3 transition-transform duration-300">
                <img src="https://images.pexels.com/photos/3845761/pexels-photo-3845761.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1" alt="Nurse Emily Williams" className="rounded-full mx-auto mb-4 w-48 h-48 object-cover" />
                <h3 className="text-xl font-semibold">Nurse Emily Williams</h3>
                <p className="text-dark-subtle">Head Nurse</p>
                <p className="text-sm mt-2">
                  Our compassionate head nurse coordinates patient care and ensures a smooth, supportive experience throughout your healthcare journey.
                </p>
              </div>
              <div className="text-center transform hover:rotate-3 transition-transform duration-300">
                <img src="https://images.pexels.com/photos/5212323/pexels-photo-5212323.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1" alt="Dr. Maria Garcia" className="rounded-full mx-auto mb-4 w-48 h-48 object-cover" />
                <h3 className="text-xl font-semibold">Dr. Maria Garcia</h3>
                <p className="text-dark-subtle">Pediatrician</p>
                <p className="text-sm mt-2">
                  Dedicated to children's health, Dr. Garcia provides gentle, expert care for infants, children, and adolescents with a focus on growth and development.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Facilities with Video */}
        <section className="py-20 px-4 bg-dark-secondary">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-10 text-center">Our Facilities</h2>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-3xl font-semibold mb-4">State-of-the-Art Medical Center</h3>
                <p className="text-lg mb-6">
                  Our modern facility spans over 50,000 square feet and includes 20 examination rooms, two operating suites, a full-service laboratory, and advanced imaging center. Every aspect of our clinic is designed with patient comfort and efficiency in mind.
                </p>
                <p className="text-lg mb-6">
                  We feature the latest in medical technology, including digital X-ray systems, MRI and CT scanners, electronic health records, and telemedicine capabilities. Our waiting areas are comfortable and welcoming, with amenities like complimentary Wi-Fi and refreshments.
                </p>
                <p className="text-lg">
                  Accessibility is paramount at our clinic. We offer wheelchair-accessible entrances, ramps, and elevators, ensuring that all patients can easily access our services. Our parking lot includes designated spaces for patients with disabilities and expectant mothers.
                </p>
              </div>
              <div className="transform hover:scale-105 transition-transform duration-500">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/4LrQ8V6offk"
                  title="Clinic Tour Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg shadow-xl"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-10 text-center">What Our Patients Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-dark-secondary p-6 rounded-lg shadow-xl transform hover:translateY-2 transition-transform duration-300">
                <p className="text-lg mb-4 italic">
                  "The care I received at this clinic was exceptional. Dr. Johnson took the time to listen to my concerns and provided thorough, compassionate treatment. The staff is friendly and professional."
                </p>
                <p className="font-semibold">- John D., Patient</p>
              </div>
              <div className="bg-dark-secondary p-6 rounded-lg shadow-xl transform hover:translateY-2 transition-transform duration-300">
                <p className="text-lg mb-4 italic">
                  "I've been coming here for years, and the level of care never disappoints. The facilities are clean, modern, and the doctors are always up-to-date with the latest medical advancements."
                </p>
                <p className="font-semibold">- Sarah M., Patient</p>
              </div>
              <div className="bg-dark-secondary p-6 rounded-lg shadow-xl transform hover:translateY-2 transition-transform duration-300">
                <p className="text-lg mb-4 italic">
                  "During a medical emergency, the team acted quickly and efficiently. Their expertise and calm demeanor made a stressful situation much more manageable. Highly recommend!"
                </p>
                <p className="font-semibold">- Robert L., Patient</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Us */}
        <section className="py-20 px-4 bg-dark-secondary">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
            <p className="text-xl mb-8">
              Ready to experience the difference in healthcare? Contact us today to schedule your appointment or learn more about our services.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-semibold mb-2">Phone</h3>
                <p className="text-lg">(555) 123-4567</p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">Email</h3>
                <p className="text-lg">info@ourclinic.com</p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">Address</h3>
                <p className="text-lg">123 Health Street<br />Medical City, MC 12345</p>
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300">
              Schedule Appointment
            </button>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
};
export default AboutUsPage;