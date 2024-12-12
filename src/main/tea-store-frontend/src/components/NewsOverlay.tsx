// NewsOverlay.tsx
import React from 'react';

interface NewsOverlayProps {
  newsItems: {
    id: string;
    title: string;
    date: string;
    content: string;
  }[];
}

const NewsOverlay: React.FC<NewsOverlayProps> = ({ newsItems }) => {
  return (
    <div className="w-70 h-full bg-secondary text-background shadow-lg p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Latest News</h2>
      {newsItems.length > 0 ? (
        <ul className="space-y-4">
          {newsItems.map((item) => (
            <li key={item.id} className="p-4 bg-primary rounded-lg shadow-md">
              <h3 className="text-background text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-text_subtitle mb-2">{item.date}</p>
              <p className="text-text_subtitle">{item.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-text_subtitle">No news available.</p>
      )}
    </div>
  );
};

export default NewsOverlay;