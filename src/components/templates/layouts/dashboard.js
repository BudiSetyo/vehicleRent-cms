import { Navbar, Sidebar } from "@/components";

const DashboardLayout = ({ children, active }) => {
  return (
    <main>
      <section className="flex flex-col">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="w-full md:pl-48 pl-20 pr-4 mt-20 overflow-auto">
            {children}
          </main>
        </div>
      </section>
    </main>
  );
};

export default DashboardLayout;
