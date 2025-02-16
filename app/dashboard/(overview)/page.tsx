import { Card } from "@/app/ui/dashboard/cards";
import CardWrapper from "@/app/ui/dashboard/cards";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";
import {
  LatestInvoicesSkeleton,
  RevenueChartSkeleton,
  CardsSkeleton,
} from "@/app/ui/skeletons";
import {
  fetchLatestInvoices,
  fetchCardData,
  _fetchRevenue,
} from "@/app/lib/data";

export default async function Page() {
  // const revenue = await _fetchRevenue();
  // const latestInvoices = await fetchLatestInvoices();
  // const { totalPaidInvoices, totalPendingInvoices, numberOfInvoices, numberOfCustomers } = await fetchCardData();
  // let revenue,
  //   latestInvoices,
  //   totalPaidInvoices,
  //   totalPendingInvoices,
  //   numberOfInvoices,
  //   numberOfCustomers;
  // in parallel
  try {
    // const [/*fetchedRevenue, */ fetchedLatestInvoices, cardData] =
    //   await Promise.all([
    //     /*_fetchRevenue(), */ fetchLatestInvoices(),
    //     fetchCardData(),
    //   ]);
    // // Assign the fetched values to the outer variables
    // //revenue = fetchedRevenue;
    // latestInvoices = fetchedLatestInvoices;
    // ({
    //   totalPaidInvoices,
    //   totalPendingInvoices,
    //   numberOfInvoices,
    //   numberOfCustomers,
    // } = cardData);
  } catch (err) {
    return <div>error on fetching </div>;
  }

  //console.log(revenue);
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl `}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
        {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* <RevenueChart revenue={revenue} /> */}
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}
