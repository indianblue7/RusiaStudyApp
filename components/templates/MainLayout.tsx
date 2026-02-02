import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <header className="py-8 text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Rucabania Russia School
        </h1>
        <p className="mt-2 text-gray-600">러시아 알파벳을 재미있게 배워보세요!</p>
      </header>

      <main className="container mx-auto px-4 py-12 flex justify-center">
        {children}
      </main>

      <footer className="py-6 text-center text-gray-500 text-sm">
        Made with Claude Code
      </footer>
    </div>
  );
};
