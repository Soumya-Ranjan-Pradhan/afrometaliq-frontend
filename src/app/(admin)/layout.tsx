import "../globals.css";

export const metadata = {
  title: "Admin Panel",
  description: "Admin management area for the website.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 h-screen">
        {children}
      </body>
    </html>
  );
}
