import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useAuthStore } from '../stores/authStore';
import StarRating from '../components/StarRating';

// ... (DoctorProfile type definition)
type DoctorProfile = { full_name: string; specialty: string; photo_url: string | null; bio: string | null; };

// NEW: Review type
type Review = { review_id: string; patient_id: string; rating: number; comment: string | null; created_at: string; };

type DoctorProfilePageProps = {
  doctorId: string;
};

const DoctorProfilePage = ({ doctorId }: DoctorProfilePageProps) => {
  const [doctor, setDoctor] = useState<DoctorProfile | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const { isAuthenticated, user, token } = useAuthStore(state => ({
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    token: state.token
  }));

  // State for the review form
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviewError, setReviewError] = useState('');

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

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setReviewError("Please select a rating.");
      return;
    }
    setReviewError('');
    try {
      const response = await axiosInstance.post(`/reviews/${doctorId}`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Add the new review to the top of the list for immediate feedback
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
      {/* Doctor Info Section */}
      <div className="bg-dark-card rounded-lg shadow-xl p-8 md:flex gap-8">
        {/* ... (doctor details JSX) ... */}
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-dark-text mb-6">Patient Reviews</h2>

        {/* Review Submission Form (Only for logged-in patients) */}
        {isAuthenticated && user?.role === 'patient' && (
          <div className="bg-dark-card p-6 rounded-lg mb-8 border border-slate-700">
            <h3 className="text-xl font-semibold mb-4">Leave a Review</h3>
            <form onSubmit={handleReviewSubmit}>
              {/* ... (form JSX) ... */}
            </form>
          </div>
        )}

        {/* Display Existing Reviews */}
        <div className="space-y-6">
          {reviews.length > 0 ? reviews.map(review => (
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
          )) : <p className="text-dark-subtle">This doctor has no reviews yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfilePage;
