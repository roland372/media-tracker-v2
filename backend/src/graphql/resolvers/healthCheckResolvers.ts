export const healthCheckResolvers = {
  Query: {
    healthCheck() {
      return "healthy";
    }
  },
};
