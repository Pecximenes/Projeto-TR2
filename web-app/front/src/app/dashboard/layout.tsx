import { Footer, Navbar } from "~/components/app";

export default function LayoutDashboard({ children }: React.PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen w-full px-8 pb-10 pt-14 sm:pt-16 md:px-24">
        {children}
      </main>
      <Footer />
    </>
  );
}
