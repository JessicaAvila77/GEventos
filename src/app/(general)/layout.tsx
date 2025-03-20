import ProviderEventos from "../Provider/providerEventos";

export default function NameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProviderEventos>{children}</ProviderEventos>
    </>
  );
}
