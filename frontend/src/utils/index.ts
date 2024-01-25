export const healthCheck = async () => {
  const url =
    process.env.NODE_ENV?.trim() === "development"
      ? process.env.VUE_APP_SERVER_URL_DEVELOPMENT
      : process.env.VUE_APP_SERVER_URL;

  const healthCheckQuery = `
    query {
      healthCheck
    }`;

  try {
    const response = await fetch(url as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "test",
      },
      body: JSON.stringify({
        query: healthCheckQuery,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data.data);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    window.open(url, "_self");
  }
};
