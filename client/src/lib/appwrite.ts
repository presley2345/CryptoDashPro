import { Client, Account, Databases, Storage, ID } from 'appwrite';

// Environment variables with fallbacks
const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID || 'demo-project';

// Check if we have the minimum required configuration
if (!APPWRITE_ENDPOINT || !APPWRITE_PROJECT_ID) {
  console.warn('Appwrite configuration is incomplete. Please check your environment variables.');
}

const client = new Client();

try {
  client
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID);
} catch (error) {
  console.error('Failed to initialize Appwrite client:', error);
}

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || 'demo-database';
export const USERS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID || 'users';
export const TRANSACTIONS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_TRANSACTIONS_COLLECTION_ID || 'transactions';
export const NOTIFICATIONS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_NOTIFICATIONS_COLLECTION_ID || 'notifications';
export const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID || 'files';

export { ID };

// Export configuration status for debugging
export const isAppwriteConfigured = () => {
  return !!(
    import.meta.env.VITE_APPWRITE_ENDPOINT &&
    import.meta.env.VITE_APPWRITE_PROJECT_ID &&
    import.meta.env.VITE_APPWRITE_DATABASE_ID &&
    import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID
  );
};
