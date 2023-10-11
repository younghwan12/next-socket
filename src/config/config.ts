export const config = (() => {
  if (process.env.NEXT_PUBLIC_STATUS === "dev") {
    return {
      url: {
        API_BASE_URL: "http://localhost:3000",
        API_TEST_URL: "http://localhost:8000",
        API_BACK_URL: "http://coverdreamit.co.kr:8001",
        API_LICENSE_URL: "http://localhost:3000/api/coverdreamit",
      },
    };
  }

  if (process.env.NEXT_PUBLIC_STATUS === "production") {
    return {
      url: {
        API_BASE_URL: "http://pmsplus.co.kr:3000/",
        API_TEST_URL: "http://pmsplus.co.kr:8000/",
        API_BACK_URL: "http://pmsplus.co.kr:3000/",
        API_LICENSE_URL: "https://production-license-url.com",
      },
    };
  }

  if (process.env.NEXT_PUBLIC_STATUS === "test") {
    return {
      url: {
        API_BASE_URL: "http://localhost:3000",
        API_TEST_URL: "https://test-test-url.com",
        API_BACK_URL: "https://test-back-url.com",
        API_LICENSE_URL: "https://test-license-url.com",
      },
    };
  }
  return {
    url: {
      API_BASE_URL: "http://localhost:3000",
      API_TEST_URL: "http://localhost:8000",
      API_BACK_URL: "http://default-back-url.com",
      API_LICENSE_URL: "http://default-license-url.com",
    },
  };
})();
