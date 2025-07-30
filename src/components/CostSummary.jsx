import React from "react";
import { useCurrency } from "../contexts/CurrencyContext";

const CostSummary = ({ subscriptions }) => {
  const { formatAmount, convertAmount } = useCurrency();

  const calculateTotals = () => {
    const activeSubscriptions = subscriptions.filter(
      (sub) => sub.status === "active"
    );

    let monthlyTotal = 0;

    activeSubscriptions.forEach((sub) => {
      // Convert subscription cost from USD to current currency
      const convertedCost = convertAmount(sub.cost, "USD");

      switch (sub.billingFrequency) {
        case "weekly":
          monthlyTotal += convertedCost * 4.33; // Average weeks per month
          break;
        case "monthly":
          monthlyTotal += convertedCost;
          break;
        case "quarterly":
          monthlyTotal += convertedCost / 3;
          break;
        case "annually":
          monthlyTotal += convertedCost / 12;
          break;
        default:
          monthlyTotal += convertedCost;
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
              {formatAmount(totals.monthly)}
            </div>
            <div className='text-sm text-gray-500'>Monthly</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-green-600'>
              {formatAmount(totals.annual)}
            </div>
            <div className='text-sm text-gray-500'>Annual</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostSummary;
