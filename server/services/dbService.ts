import { SalesforceData } from '../models';

export type Financials = {
  year: number;
  sales: number;
  profit: number;
};

export const getLatestFinancials = async (
  companyId: string
): Promise<Financials | null> => {
  const row = await SalesforceData.findOne({
    where: { companyId },
    order: [['year', 'DESC']],
  });
  if (!row) {
    return null;
  }

  return {
    year: Number(row.year),
    sales: Number(row.sales),
    profit: Number(row.profit),
  };
};
