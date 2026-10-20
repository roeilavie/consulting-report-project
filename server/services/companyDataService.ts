import { Financials, getLatestFinancials } from './dbService';
import { NewsArticle, fetchCompanyNews } from './newsService';

export type CompanyData = {
  financials: (Financials & { source: 'db' }) | null;
  dbFinancials: Financials | null;
  article: NewsArticle;
};

// The news API only returns heading and content (no structured financials),
// so the DB figures are used and the article is passed along as-is.
export const getCompanyData = async (
  companyId: string
): Promise<CompanyData> => {
  const [dbFinancials, article] = await Promise.all([
    getLatestFinancials(companyId),
    fetchCompanyNews(companyId),
  ]);

  return {
    financials: dbFinancials ? { ...dbFinancials, source: 'db' } : null,
    dbFinancials,
    article,
  };
};
