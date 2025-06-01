
import KeyMetricsCard from "@/components/dashboard/KeyMetricsCard";
import DateFilterBar from "@/components/dashboard/DateFilterBar";
import ActivityChart from "@/components/dashboard/ActivityChart";

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-2 space-y-8">
      <h1 className="text-3xl font-bold text-primary">Dashboard Overview</h1>
      
      <div className="space-y-6">
        <DateFilterBar />
        <KeyMetricsCard />
        <ActivityChart />
      </div>
    </div>
  );
}
