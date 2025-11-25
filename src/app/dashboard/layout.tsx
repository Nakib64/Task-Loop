import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/dashboard/Header";
import { getServerSession } from "next-auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(); // server-side getSession()

  // PROTECT DASHBOARD
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 text-white flex w-full">
      <AppSidebar />
      <div className="flex-1 flex flex-col md:ml-64">
        <Header />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
