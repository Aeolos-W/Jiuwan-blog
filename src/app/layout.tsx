import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "九畹的博客 | Updates on my research and expository papers",
  description: "辨彰学术，考镜源流，岐轩故纸堆的小门徒.",
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
