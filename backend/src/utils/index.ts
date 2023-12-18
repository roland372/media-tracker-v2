export const getEnvVariable = (devEnvVar: string, prodEnvVar: string): string | undefined => {
  const isDevelopment = process.env.NODE_ENV?.trim() === 'development';
  const envKey = isDevelopment ? devEnvVar : prodEnvVar;

  return process.env[envKey];
};
