import { InvestmentAnalysis } from './llmService';

export type ReportType = 'high-level' | 'detailed';

export const isReportType = (value: string): value is ReportType =>
  value === 'high-level' || value === 'detailed';

export const renderReportMarkdown = (
  companyName: string,
  articleHeading: string,
  analysis: InvestmentAnalysis,
  reportType: ReportType
): string => {
  const title = `# ${companyName} — Investment Report`;

  if (reportType === 'high-level') {
    return [
      title,
      `**News:** ${articleHeading}`,
      `**Summary:** ${analysis.executiveSummary}`,
      `**Final recommendation: ${analysis.recommendation}**`,
    ].join('\n\n');
  }

  return [
    title,
    `## Executive Summary\n${analysis.executiveSummary}`,
    `## Sales & Profit Snapshot\n${analysis.salesProfitSnapshot}`,
    `## News Analysis\n${analysis.newsAnalysis}`,
    `## Final Investment Recommendation\n**Recommendation:** ${analysis.recommendation}\n\n${analysis.rationale}`,
  ].join('\n\n');
};
