/* eslint-disable @next/next/no-page-custom-font -- Material Symbols loaded for admin shell only */
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=optional"
      />
      <div className="min-h-screen">{children}</div>
    </>
  );
}
