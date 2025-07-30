import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { subscriptionService } from "../services/subscriptionService";
import { useAuth } from "../contexts/AuthContext";
import { useCurrency } from "../contexts/CurrencyContext";

const SubscriptionForm = ({ subscription, onClose, onSuccess }) => {
  const { currentUser } = useAuth();
  const { currentCurrency, convertAmount } = useCurrency();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: subscription
      ? {
          ...subscription,
          cost: convertAmount(subscription.cost, "USD").toFixed(2), // Convert from USD to current currency for display
        }
      : {
          serviceName: "",
          cost: "",
          dueDate: "",
          billingFrequency: "monthly",
          status: "active",
        },
  });

  useEffect(() => {
    if (subscription) {
      reset({
        ...subscription,
        cost: convertAmount(subscription.cost, "USD").toFixed(2), // Convert from USD to current currency for display
      });
    }
  }, [subscription, reset, convertAmount]);

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    try {
      const subscriptionData = {
        ...data,
        // Convert cost to USD for storage (assuming input is in current currency)
        cost:
          currentCurrency.code === "USD"
            ? parseFloat(data.cost)
            : convertAmount(parseFloat(data.cost), currentCurrency.code, "USD"),
        dueDate: new Date(data.dueDate),
      };

      if (subscription) {
        await subscriptionService.updateSubscription(
          subscription.id,
          subscriptionData
        );
      } else {
        await subscriptionService.addSubscription(
          currentUser.uid,
          subscriptionData
        );
      }

      onSuccess();
      onClose();
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center'>
      <div className='bg-white p-6 rounded-lg shadow-xl w-full max-w-md'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-lg font-medium text-gray-900'>
            {subscription ? "Edit Subscription" : "Add New Subscription"}
          </h3>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600'
          >
            <span className='sr-only'>Close</span>
            <svg
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <label
              htmlFor='serviceName'
              className='block text-sm font-medium text-gray-700'
            >
              Service Name
            </label>
            <input
              type='text'
              id='serviceName'
              {...register("serviceName", {
                required: "Service name is required",
              })}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            />
            {errors.serviceName && (
              <p className='mt-1 text-sm text-red-600'>
                {errors.serviceName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor='cost'
              className='block text-sm font-medium text-gray-700'
            >
              Cost ({currentCurrency.symbol})
            </label>
            <input
              type='number'
              step='0.01'
              id='cost'
              {...register("cost", {
                required: "Cost is required",
                min: { value: 0, message: "Cost must be positive" },
              })}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            />
            {errors.cost && (
              <p className='mt-1 text-sm text-red-600'>{errors.cost.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor='dueDate'
              className='block text-sm font-medium text-gray-700'
            >
              Next Due Date
            </label>
            <input
              type='date'
              id='dueDate'
              {...register("dueDate", { required: "Due date is required" })}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            />
            {errors.dueDate && (
              <p className='mt-1 text-sm text-red-600'>
                {errors.dueDate.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor='billingFrequency'
              className='block text-sm font-medium text-gray-700'
            >
              Billing Frequency
            </label>
            <select
              id='billingFrequency'
              {...register("billingFrequency")}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            >
              <option value='weekly'>Weekly</option>
              <option value='monthly'>Monthly</option>
              <option value='quarterly'>Quarterly</option>
              <option value='annually'>Annually</option>
            </select>
          </div>

          <div>
            <label
              htmlFor='status'
              className='block text-sm font-medium text-gray-700'
            >
              Status
            </label>
            <select
              id='status'
              {...register("status")}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            >
              <option value='active'>Active</option>
              <option value='inactive'>Inactive</option>
              <option value='cancelled'>Cancelled</option>
            </select>
          </div>

          {error && <div className='text-red-600 text-sm'>{error}</div>}

          <div className='flex gap-3 pt-4'>
            <button
              type='submit'
              disabled={loading}
              className='flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
            >
              {loading ? "Saving..." : subscription ? "Update" : "Add"}
            </button>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionForm;
