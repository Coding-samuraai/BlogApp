const conf = {
  appURL: String(import.meta.env.VITE_APPWRITE_URL),
  appProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  // appCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appTableId: String(import.meta.env.VITE_APPWRITE_TABLE_ID),
  appUserPrefTableId: String(
    import.meta.env.VITE_APPWRITE_USER_PREFERENCES_TABLE_ID
  ),
  appBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  tinyMCEApiKey: String(import.meta.env.VITE_TINYMCE_API_KEY),
  baseURL: String(import.meta.env.VITE_BASE_URL),
};

export default conf;
