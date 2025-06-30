import { startOfDay, subDays } from "date-fns";


const getSalesSummary = async () => {
  try {
    const fromDate = null

    

    return fromDate;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Failed to get sales summary!");
    }
  }
};

const getRecentExpensesAnalytics = async () => {
  try {
    const expenses = null

    

    return expenses;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Failed to get recent expenses analytics!");
    }
  }
};

export const AnalyticsServices = {
  getSalesSummary,
  getRecentExpensesAnalytics,
};
