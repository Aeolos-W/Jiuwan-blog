import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "What's new | Updates on my research and expository papers",
  description: "Updates on my research and expository papers, discussion of open problems, and other maths-related topics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-white">
          <div className="mx-auto" style={{ maxWidth: '760px', width: '100%' }}>
            <Header />
            <Navigation />
            <div className="flex gap-10 mt-4">
              {/* 左侧边栏 */}
              <aside className="flex-shrink-0" style={{ width: '200px' }}>
                <Sidebar />
              </aside>
              {/* 主内容区 */}
              <main className="flex-1" style={{ width: '500px' }}>
                {children}
              </main>
            </div>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
