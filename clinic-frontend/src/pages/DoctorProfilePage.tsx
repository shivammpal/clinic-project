// File: clinic-frontend/src/pages/DoctorProfilePage.tsx

import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useAuthStore } from '../stores/authStore';
import StarRating from '../components/StarRating';

// Doctor profile type
type DoctorProfile = { 
  full_name: string; 
  specialty: string; 
  photo_url: string | null; 
  bio: string | null; 
};

// Review type
type Review = { 
  review_id: string; 
  patient_id: string; 
  rating: number; 
  comment: string | null; 
  created_at: string; 
};

import type { NavigateFunction } from '../App';

type DoctorProfilePageProps = {
  doctorId: string;
  onNavigate: NavigateFunction;
};

const DoctorProfilePage = ({ doctorId, onNavigate }: DoctorProfilePageProps) => {
  const [doctor, setDoctor] = useState<DoctorProfile | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  const handleBookAppointment = () => {
    if (doctor) {
      onNavigate('bookAppointment', { doctorId, doctorName: doctor.full_name });
    }
  };

  // ✅ Safe store usage (no infinite loop)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  // Review form state
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviewError, setReviewError] = useState('');

  // Fetch doctor details + reviews
  useEffect(() => {
    if (!doctorId) return;
    const fetchDoctorData = async () => {
      try {
        const [profileRes, reviewsRes] = await Promise.all([
          axiosInstance.get(`/public/doctors/${doctorId}`),
          axiosInstance.get(`/reviews/${doctorId}`)
        ]);
        setDoctor(profileRes.data);
        setReviews(reviewsRes.data);
      } catch (err) {
        console.error("Failed to fetch doctor data", err);
      }
    };
    fetchDoctorData();
  }, [doctorId]);

  // Submit new review
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setReviewError("Please select a rating.");
      return;
    }
    setReviewError('');
    try {
      const response = await axiosInstance.post(
        `/reviews/${doctorId}`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReviews([response.data, ...reviews]);
      setRating(0);
      setComment('');
    } catch (error: any) {
      setReviewError(error.response?.data?.detail || "Failed to submit review.");
    }
  };

  if (!doctor) return <div className="text-center py-20">Loading profile...</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      {/* Doctor Info */}
      <div className="bg-dark-card rounded-lg shadow-xl p-8 md:flex gap-8">
        <div className="flex-shrink-0">
          {doctor.photo_url ? (
            <img
              src={doctor.photo_url}
              alt={doctor.full_name}
              className="w-40 h-40 rounded-full object-cover"
            />
          ) : (
            <div className="w-40 h-40 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl">
              {doctor.full_name[0]}
            </div>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold">{doctor.full_name}</h1>
          <p className="text-lg text-dark-subtle">{doctor.specialty}</p>
          {doctor.bio && <p className="mt-4 text-dark-text">{doctor.bio}</p>}
          {isAuthenticated && user?.role === 'patient' && (
            <button
              onClick={handleBookAppointment}
              className="mt-4 bg-brand-blue text-white py-2 px-4 rounded-lg font-semibold hover:bg-sky-600 transition-colors"
            >
              Book Appointment
            </button>
          )}
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-dark-text mb-6">Patient Reviews</h2>

        {/* Review Form */}
        {isAuthenticated && user?.role === 'patient' && (
          <div className="bg-dark-card p-6 rounded-lg mb-8 border border-slate-700">
            <h3 className="text-xl font-semibold mb-4">Leave a Review</h3>
            <form onSubmit={handleReviewSubmit}>
              <StarRating rating={rating} onRatingChange={setRating} />
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review..."
                className="w-full mt-4 p-2 rounded-md bg-dark-bg border border-slate-600 text-dark-text"
              />
              {reviewError && <p className="text-red-500 mt-2">{reviewError}</p>}
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Submit Review
              </button>
            </form>
          </div>
        )}

        {/* Existing Reviews */}
        <div className="space-y-6">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.review_id} className="bg-dark-card p-5 rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-dark-text">Anonymous Patient</p>
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-dark-subtle mt-2">{review.comment}</p>
                <p className="text-xs text-slate-500 text-right mt-3">
                  {new Date(review.created_at).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-dark-subtle">This doctor has no reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfilePage;
