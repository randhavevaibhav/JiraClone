export const baseAPIURL = 'https://jira-clone-api-bay.vercel.app';

const constructAPIURL = (endpoint: string) => {
  return `${baseAPIURL}${endpoint}`;
};
export const dbHealthURL = constructAPIURL('/db/health');
export const apiHealthURL = constructAPIURL('/api/health');
export const signupURL = constructAPIURL('/auth/signup');
export const loginURL = constructAPIURL('/auth/login');
