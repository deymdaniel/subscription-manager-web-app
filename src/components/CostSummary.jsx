import React from "react";

const CostSummary = ({ subscriptions }) => {
  const calculateTotals = () => {
    const activeSubscriptions = subscriptions.filter(
      (sub) => sub.status === "active"
    );

    let monthlyTotal = 0;

    activeSubscriptions.forEach((sub) => {
      const cost = sub.cost;
      switch (sub.billingFrequency) {
        case "weekly":
          monthlyTotal += cost * 4.33; // Average weeks per month
          break;
        case "monthly":
          monthlyTotal += cost;
          break;
        case "quarterly":
          monthlyTotal += cost / 3;
          break;
        case "annually":
          monthlyTotal += cost / 12;
          break;
        default:
          monthlyTotal += cost;
      }
    });

    const annualTotal = monthlyTotal * 12;

    return {
      monthly: monthlyTotal,
      annual: annualTotal,
      activeCount: activeSubscriptions.length,
    };
  };

  const totals = calculateTotals();

  return (
    <div className='bg-white overflow-hidden shadow rounded-lg'>
      <div className='p-5'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            <svg
              className='h-6 w-6 text-gray-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'
              />
            </svg>
          </div>
          <div className='ml-5 w-0 flex-1'>
            <dl>
              <dt className='text-sm font-medium text-gray-500 truncate'>
                Total Cost Summary
              </dt>
              <dd className='text-lg font-medium text-gray-900'>
                {totals.activeCount} active subscription
                {totals.activeCount !== 1 ? "s" : ""}
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className='bg-gray-50 px-5 py-3'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='text-center'>
            <div className='text-2xl font-bold text-blue-600'>
              ${totals.monthly.toFixed(2)}
            </div>
            <div className='text-sm text-gray-500'>Monthly</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-green-600'>
              ${totals.annual.toFixed(2)}
            </div>
            <div className='text-sm text-gray-500'>Annual</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostSummary;
