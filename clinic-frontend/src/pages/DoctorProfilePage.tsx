import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useAuthStore } from '../stores/authStore';
import type { NavigateFunction } from '../App';
import StarRating from '../components/StarRating';

// ... (DoctorProfile type definition)
type DoctorProfile = { full_name: string; specialty: string; photo_url: string | null; bio: string | null; };

// NEW: Review type
type Review = { review_id: string; patient_id: string; rating: number; comment: string | null; created_at: string; };

type DoctorProfilePageProps = {
  doctorId: string;
  onNavigate: NavigateFunction;
};

const DoctorProfilePage = ({ doctorId, onNavigate }: DoctorProfilePageProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        {/* ... (doctor details JSX from previous task) ... */}
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-dark-text mb-6">Patient Reviews</h2>

        {/* Review Submission Form (Only for logged-in patients) */}
        {isAuthenticated && user?.role === 'patient' && (
          <div className="bg-dark-card p-6 rounded-lg mb-8 border border-slate-700">
            <h3 className="text-xl font-semibold mb-4">Leave a Review</h3>
            <form onSubmit={handleReviewSubmit}>
              <div className="flex items-center mb-4">
                <span className="mr-4 text-dark-subtle">Your Rating:</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <button type="button" key={i} onClick={() => setRating(i + 1)}>
                      <svg className={`w-7 h-7 ${i < rating ? 'text-amber-400' : 'text-slate-600'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.955c.3.921-.755 1.688-1.54 1.118l-3.368-2.448a1 1 0 00-1.176 0l-3.368 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.955a1 1 0 00-.364-1.118L2.05 9.382c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience..."
                className="w-full h-24 p-3 bg-slate-700/50 border border-slate-600 rounded-md text-dark-text focus:outline-none focus:ring-2 focus:ring-brand-blue"
              ></textarea>
              <button type="submit" className="mt-4 bg-brand-blue text-white font-semibold py-2 px-6 rounded-lg hover:bg-sky-600 transition-colors">
                Submit Review
              </button>
              {reviewError && <p className="text-red-400 mt-2">{reviewError}</p>}
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
