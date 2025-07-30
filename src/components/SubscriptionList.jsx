import React from "react";
import { format } from "date-fns";
import { useCurrency } from "../contexts/CurrencyContext";

const SubscriptionList = ({ subscriptions, onEdit, onDelete }) => {
  const { formatAmount, convertAmount } = useCurrency();
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    return format(dateObj, "MMM dd, yyyy");
  };

  if (subscriptions.length === 0) {
    return (
      <div className='text-center py-12'>
        <svg
          className='mx-auto h-12 w-12 text-gray-400'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          aria-hidden='true'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
          />
        </svg>
        <h3 className='mt-2 text-sm font-medium text-gray-900'>
          No subscriptions
        </h3>
        <p className='mt-1 text-sm text-gray-500'>
          Get started by adding a new subscription.
        </p>
      </div>
    );
  }

  return (
    <div className='bg-white shadow overflow-hidden sm:rounded-md'>
      <ul className='divide-y divide-gray-200'>
        {subscriptions.map((subscription) => (
          <li key={subscription.id}>
            <div className='px-4 py-4 sm:px-6'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    <div className='h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center'>
                      <span className='text-blue-600 font-medium text-sm'>
                        {subscription.serviceName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className='ml-4'>
                    <div className='flex items-center'>
                      <p className='text-sm font-medium text-gray-900 truncate'>
                        {subscription.serviceName}
                      </p>
                      <span
                        className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          subscription.status
                        )}`}
                      >
                        {subscription.status}
                      </span>
                    </div>
                    <div className='mt-1 flex items-center text-sm text-gray-500'>
                      <span>
                        {formatAmount(convertAmount(subscription.cost, "USD"))}{" "}
                        / {subscription.billingFrequency}
                      </span>
                      <span className='mx-2'>•</span>
                      <span>Due: {formatDate(subscription.dueDate)}</span>
                    </div>
                  </div>
                </div>
                <div className='flex items-center space-x-2'>
                  <button
                    onClick={() => onEdit(subscription)}
                    className='text-blue-600 hover:text-blue-500'
                  >
                    <svg
                      className='h-5 w-5'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => onDelete(subscription.id)}
                    className='text-red-600 hover:text-red-500'
                  >
                    <svg
                      className='h-5 w-5'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionList;
