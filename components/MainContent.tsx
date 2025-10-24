
import React from 'react';

interface TopicCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const TopicCard: React.FC<TopicCardProps> = ({ icon, title, description }) => (
  <a href="#" className="block p-6 bg-gray-50 hover:bg-usda-medium-gray hover:shadow-lg rounded-lg transition-all border border-gray-200">
    <div className="flex items-center mb-4">
      <div className="bg-usda-blue text-white p-3 rounded-full mr-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold font-serif text-usda-blue">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </a>
);

const MainContent: React.FC = () => {
  const topics = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
      title: 'Housing Assistance',
      description: 'Find loans and grants for single and multi-family housing in rural areas.'
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
      title: 'Business & Industry',
      description: 'Support for rural businesses to create jobs and stimulate economic growth.'
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-9.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-9.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>,
      title: 'Community Facilities',
      description: 'Funding for essential community infrastructure like hospitals, schools, and public safety.'
    },
     {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
      title: 'Electric Programs',
      description: 'Helping to maintain, expand, and modernize rural electric infrastructure.'
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      title: 'Water & Environment',
      description: 'Ensure safe drinking water and sanitary waste disposal for rural households.'
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.128 19.825A1.5 1.5 0 0110 18.5V7a1.5 1.5 0 012 1.075L15.5 15.5h2.5a1.5 1.5 0 011.5 1.5v.5a1.5 1.5 0 01-1.5 1.5H8.128z" /></svg>,
      title: 'Telecommunications',
      description: 'Expanding access to broadband and other telecom services in rural areas.'
    }
  ];

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-usda-blue font-serif">A Catalyst for Rural Prosperity</h2>
          <p className="mt-2 text-lg text-gray-600 max-w-3xl mx-auto">We are committed to helping improve the economy and quality of life in rural America.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map(topic => (
            <TopicCard key={topic.title} {...topic} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
