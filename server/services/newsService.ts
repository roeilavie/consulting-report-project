import dotenv from 'dotenv';

dotenv.config();

export type NewsArticle = {
  heading: string;
  content: string;
};

export const fetchCompanyNews = async (
  companyId: string
): Promise<NewsArticle> => {
  const baseUrl = process.env.NEWS_API_URL;
  if (!baseUrl) {
    throw new Error('NEWS_API_URL is not set in server/.env');
  }

  const response = await fetch(
    `${baseUrl}?id=${encodeURIComponent(companyId)}`
  );
  if (!response.ok) {
    throw new Error(`News API request failed with status ${response.status}`);
  }

  return response.json();
};
