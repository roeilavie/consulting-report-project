// Make sure you've reviewd the README.md file to understand the task and how to access the relevant resources
import { getCompanyData } from './companyDataService';
import { analyzeCompany } from './llmService';
import { isReportType, renderReportMarkdown } from './reportRenderer';

export const generateReportMarkdown = async (
  companyName: string,
  companyId: string,
  reportType: string
): Promise<string> => {
  if (!isReportType(reportType)) {
    throw new Error(`Unsupported report type: ${reportType}`);
  }

  const { financials, article } = await getCompanyData(companyId);
  const analysis = await analyzeCompany(companyName, financials, article);

  return renderReportMarkdown(
    companyName,
    article.heading,
    analysis,
    reportType
  );
};
