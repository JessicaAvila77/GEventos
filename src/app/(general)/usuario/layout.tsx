import NavBarUsuario from "@/app/Components/NavBarUsuario";

export default function NameLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
     <div>
     <NavBarUsuario />
     <main className="p-6">{children}</main>
 </div>
  )
}