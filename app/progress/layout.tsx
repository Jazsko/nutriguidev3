export const metadata = {
  title: "Nutriguide",
  description: "Spor matinntak og fremgang",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      <body>{children}</body>
    </html>
  );
}
