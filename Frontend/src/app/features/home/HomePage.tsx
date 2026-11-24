import { useQuery } from "@apollo/client/react";
import { GetStatsDocument } from "../../../graphql/generate/operations";
import { PageLoader } from "../PageLoader";
import { PageError } from "../PageError";
import type { StatsModel } from "../../../graphql/generate/schema";
import StatsGrid from "./StatsGrid";

export const HomePage = () => {
  const {
    data: statsData,
    loading: statsLoading,
    error: statsError,
  } = useQuery(GetStatsDocument, {
    fetchPolicy: "cache-and-network",
  });

  if (statsLoading) {
    return <PageLoader />;
  }

  if (statsError || !statsData) {
    return <PageError message="Failed to load data stats. Please try agian." />;
  }

  const stats = statsData.stats as StatsModel;

  return <StatsGrid stats={stats} />;
};
