import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { subscriptionService } from "../services/subscriptionService";
import SubscriptionList from "./SubscriptionList";
import SubscriptionForm from "./SubscriptionForm";
import CostSummary from "./CostSummary";
import CurrencySelector from "./CurrencySelector";

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = subscriptionService.subscribeToUserSubscriptions(
      currentUser.uid,
      (querySnapshot) => {
        const subscriptionsData = [];
        querySnapshot.forEach((doc) => {
          subscriptionsData.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setSubscriptions(subscriptionsData);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  const handleEdit = (subscription) => {
    setEditingSubscription(subscription);
    setShowForm(true);
  };

  const handleDelete = async (subscriptionId) => {
    if (window.confirm("Are you sure you want to delete this subscription?")) {
      try {
        await subscriptionService.deleteSubscription(subscriptionId);
      } catch (error) {
        alert("Error deleting subscription: " + error.message);
      }
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingSubscription(null);
  };

  const handleFormSuccess = () => {
    // The subscription list will automatically update via the real-time listener
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600'></div>
          <p className='mt-4 text-gray-600'>Loading your subscriptions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-white shadow'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center py-6'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>SubTrack</h1>
              <p className='text-sm text-gray-600'>
                Welcome back, {currentUser.displayName || currentUser.email}
              </p>
            </div>
            <div className='flex items-center space-x-4'>
              <div className='w-48'>
                <CurrencySelector />
              </div>
              <button
                onClick={handleLogout}
                className='bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500'
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
        <div className='px-4 py-6 sm:px-0'>
          {/* Cost Summary */}
          <div className='mb-6'>
            <CostSummary subscriptions={subscriptions} />
          </div>

          {/* Actions */}
          <div className='mb-6'>
            <button
              onClick={() => setShowForm(true)}
              className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              Add New Subscription
            </button>
          </div>

          {/* Subscriptions List */}
          <div>
            <h2 className='text-lg font-medium text-gray-900 mb-4'>
              Your Subscriptions
            </h2>
            <SubscriptionList
              subscriptions={subscriptions}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <SubscriptionForm
          subscription={editingSubscription}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
};

export default Dashboard;
