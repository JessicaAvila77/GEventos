import NavBar from "@/app/Components/NavBar";

export default function NameLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div>
    <NavBar />
    <main className="p-6">{children}</main>
</div>
  );
}