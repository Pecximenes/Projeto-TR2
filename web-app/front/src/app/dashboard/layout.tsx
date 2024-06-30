import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

export default function LayoutDashboard({ children }: React.PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-14 sm:pt-16">{children}</main>
      <Footer />
    </>
  );
}
