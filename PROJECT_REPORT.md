# SubTrack - Project Report

## Project Overview

### Objectives
SubTrack is a web application designed to help users track and manage their recurring subscriptions. The primary objectives were to create a secure, user-friendly platform where individuals can monitor their subscription costs and manage billing information effectively.

### Features
- User authentication and account management
- Add, edit, and delete subscription entries
- Track subscription costs with multiple currency support (USD and PHP)
- View monthly and annual cost summaries
- Mark subscriptions as active, inactive, or cancelled
- Real-time data synchronization across devices

## React Components

### Core Components

**Dashboard Component**
- Main application interface after user login
- Displays subscription list, cost summary, and navigation
- Integrates currency selector for multi-currency support
- Manages application state for subscriptions and form modals

**Auth Component**
- Handles user authentication (login and registration)
- Form validation for email and password inputs
- Switches between login and signup modes
- Error handling for authentication failures

**SubscriptionForm Component**
- Modal-based form for adding and editing subscriptions
- Input fields for service name, cost, due date, billing frequency, and status
- Form validation using React Hook Form
- Currency conversion for cost inputs

**SubscriptionList Component**
- Displays user subscriptions in a structured list format
- Shows subscription details with status indicators
- Provides edit and delete functionality for each subscription
- Real-time currency conversion for cost display

**CostSummary Component**
- Calculates and displays total monthly and annual costs
- Converts costs based on billing frequency (weekly, monthly, quarterly, annual)
- Shows active subscription count
- Real-time currency conversion

**CurrencySelector Component**
- Dropdown interface for switching between USD and PHP
- Persists user currency preference in local storage

### Context Providers

**AuthContext**
- Manages user authentication state
- Provides login, signup, and logout functions
- Handles authentication persistence across sessions

**CurrencyContext**
- Manages currency selection and conversion
- Provides conversion functions between USD and PHP
- Handles currency preference persistence

## Firebase Services

### Authentication
Firebase Authentication is implemented with email/password provider for user account management. The service handles user registration, login, logout, and session persistence.

### Firestore Database
Cloud Firestore stores subscription data with real-time synchronization. The database structure uses a single collection for subscriptions with user-specific access control.

### Security Implementation
Custom security rules ensure data privacy by restricting access to user-owned documents only. Users can only read and write their own subscription data.

## Data Structure

### Subscription Document Schema
```javascript
{
  id: "document_id",
  userId: "user_uid",
  serviceName: "string",
  cost: "number (stored in USD)",
  dueDate: "timestamp",
  billingFrequency: "string (weekly/monthly/quarterly/annually)",
  status: "string (active/inactive/cancelled)",
  createdAt: "timestamp",
  updatedAt: "timestamp"
}
```

### Firebase Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /subscriptions/{subscriptionId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
    
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## Challenges and Solutions

### Challenge 1: Database Index Error
**Problem:** The app crashed when trying to load subscriptions because Firebase needed a special database index.
**Solution:** Created the required index in Firebase Console to allow the app to sort subscriptions by date.

### Challenge 2: Currency Support
**Problem:** Users wanted to see costs in different currencies, but storing different currencies in the database would be messy.
**Solution:** Store all costs in USD in the database, then convert to the user's preferred currency when displaying. This keeps the data clean while showing costs in PHP or USD.

### Challenge 3: Page Not Loading
**Problem:** The currency feature caused the entire app to stop working and show a blank page.
**Solution:** Only load the currency feature on the main dashboard, not on the login page. This fixed the loading issue.

### Challenge 4: Form Currency Input
**Problem:** When users entered costs in PHP, the app needed to save it correctly in the database.
**Solution:** Automatically convert PHP amounts to USD before saving, so all database costs are consistent. When editing, convert back to PHP for display.