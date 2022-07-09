export const getEnvironment = () => {
  return process.env.NEXT_PUBLIC_VERCEL_ENV as 'production' | 'preview' | 'development';
};

export const getBuildId = () => {
  return process.env.NEXT_PUBLIC_BUILD_ID;
};

export const getSiteUrl = () => {
  const url =
    // Production: prefer registered domain
    (getEnvironment() === 'production' && process.env.NEXT_PUBLIC_DOMAIN) ||
    // Other hosted environments: use the autogenerated URL
    process.env.NEXT_PUBLIC_VERCEL_URL ||
    // Local environment: fall back to localhost
    'http://localhost:3000';

  // Ensure URL starts with protocol
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }

  return url;
};

export const getAbsoluteUrl = (path: string) => {
  const siteUrl = getSiteUrl();

  if (siteUrl) {
    return new URL(path, getSiteUrl()).toString();
  }

  return path;
};

export const getGoogleAnalyticsToken = () => {
  // Never collect analytics from non-production builds
  if (getEnvironment() !== 'production') {
    return null;
  }

  return process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TOKEN;
};

export const getRedditClientId = () => {
  return process.env.NEXT_PUBLIC_REDDIT_CLIENT_ID;
};

export const getRedditClientSecret = () => {
  return process.env.NEXT_PRIVATE_REDDIT_CLIENT_SECRET;
};
