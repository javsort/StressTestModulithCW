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

// NewsOverlay component -> Displays the latest news & announcements
const NewsOverlay: React.FC<NewsOverlayProps> = ({  }) => {

  // Fake news items
  const newsItems = [
    {
      id: '1',
      title: 'New Product Launch',
      date: '2023-10-01',
      content: 'We are excited to announce the launch of our new product line. Check it out now!',
    },
    {
      id: '2',
      title: 'Holiday Sale',
      date: '2023-11-15',
      content: 'Don\'t miss our holiday sale with discounts up to 50% on selected items.',
    },
    {
      id: '3',
      title: 'Website Maintenance',
      date: '2023-12-05',
      content: 'Our website will be undergoing maintenance on December 5th from 12:00 AM to 4:00 AM.',
    },
  ];


  return (
    <div className="w-70 h-full bg-secondary text-background shadow-lg p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Latest News</h2>
      {newsItems.length > 0 ? (
        <ul className="space-y-4">
          {newsItems.map((news) => (
            <li key={news.id} className="p-4 bg-primary rounded-lg shadow-md">
              <h3 className="text-background text-lg font-bold mb-2">{news.title}</h3>
              <p className="text-sm text-text_subtitle mb-2">{news.date}</p>
              <p className="text-text_subtitle">{news.content}</p>
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