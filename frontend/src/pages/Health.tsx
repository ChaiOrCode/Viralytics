import React from 'react';
import { TrendingUp, Users, BarChart, Activity } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface HealthProps {
  darkMode: boolean;
}

const Health: React.FC<HealthProps> = ({ darkMode }) => {
  const bgColor = darkMode ? 'bg-dark-background' : 'bg-light-background';
  const textColor = darkMode ? 'text-dark-primary' : 'text-light-tertiary';
  const secondaryTextColor = darkMode ? 'text-dark-secondary' : 'text-light-primary';
  const borderColor = darkMode ? 'border-dark-primary/20' : 'border-light-primary/20';
  const cardBgColor = darkMode ? 'bg-dark-primary/10' : 'bg-light-primary/10';

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: darkMode ? '#C8D5E2' : '#1A5885' }
      },
      x: {
        ticks: { color: darkMode ? '#C8D5E2' : '#1A5885' }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  const engagementData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Engagement',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: '#1A5885',
        backgroundColor: 'rgba(26, 88, 133, 0.5)',
        tension: 0.4
      },
    ],
  };

  const topPosts = [
    { id: 1, thumbnail: '/api/placeholder/400/320', title: 'Top Performing Post 1', likes: 1500, comments: 200 },
    { id: 2, thumbnail: '/api/placeholder/400/320', title: 'Runner-up Post', likes: 1200, comments: 150 },
    { id: 3, thumbnail: '/api/placeholder/400/320', title: 'Third Place Post', likes: 1000, comments: 100 },
  ];

  // Added margin-top (mt-20) to the main container as requested
  return (
    <div className={`px-4 py-8 mt-20 min-h-screen ${bgColor} sm:px-6 lg:px-8`}>
      <div className="mx-auto max-w-7xl">
        <h1 className={`mb-8 text-3xl font-bold ${textColor}`}>Account Health</h1>
        
        {/* Account Overview - Bento Grid Layout */}
        <section className="mb-8">
          <h2 className={`mb-4 text-2xl font-semibold ${textColor}`}>Account Overview</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className={`p-6 rounded-xl border shadow-sm transition-all duration-200 ${borderColor} ${cardBgColor} hover:scale-105 hover:shadow-lg`}>
              <div className="flex items-center mb-2">
                <TrendingUp className={`mr-2 w-6 h-6 ${textColor}`} />
                <h3 className={`text-lg font-medium ${textColor}`}>Total Reach</h3>
              </div>
              <p className={`text-2xl font-bold ${textColor}`}>1.2M</p>
              <p className={`text-sm ${secondaryTextColor}`}>+5% from last week</p>
            </div>
            <div className={`p-6 rounded-xl border shadow-sm transition-all duration-200 ${borderColor} ${cardBgColor} hover:scale-105 hover:shadow-lg`}>
              <div className="flex items-center mb-2">
                <Users className={`mr-2 w-6 h-6 ${textColor}`} />
                <h3 className={`text-lg font-medium ${textColor}`}>Follower Growth</h3>
              </div>
              <p className={`text-2xl font-bold ${textColor}`}>+2,500</p>
              <p className={`text-sm ${secondaryTextColor}`}>This week</p>
            </div>
            <div className={`p-6 rounded-xl border shadow-sm transition-all duration-200 ${borderColor} ${cardBgColor} hover:scale-105 hover:shadow-lg`}>
              <div className="flex items-center mb-2">
                <BarChart className={`mr-2 w-6 h-6 ${textColor}`} />
                <h3 className={`text-lg font-medium ${textColor}`}>Engagement Rate</h3>
              </div>
              <p className={`text-2xl font-bold ${textColor}`}>4.7%</p>
              <p className={`text-sm ${secondaryTextColor}`}>+0.5% from last month</p>
            </div>
            <div className={`p-6 rounded-xl border shadow-sm transition-all duration-200 ${borderColor} ${cardBgColor} hover:scale-105 hover:shadow-lg`}>
              <div className="flex items-center mb-2">
                <Activity className={`mr-2 w-6 h-6 ${textColor}`} />
                <h3 className={`text-lg font-medium ${textColor}`}>Post Frequency</h3>
              </div>
              <p className={`text-2xl font-bold ${textColor}`}>5.2</p>
              <p className={`text-sm ${secondaryTextColor}`}>Posts per week</p>
            </div>
          </div>
        </section>
        
        {/* Main Dashboard Bento Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Engagement Trend - Spans 7 columns */}
          <section className="lg:col-span-7">
            <h2 className={`mb-4 text-2xl font-semibold ${textColor}`}>Engagement Trend</h2>
            <div className={`p-6 rounded-xl border shadow-sm backdrop-blur-sm transition-shadow duration-200 ${borderColor} ${cardBgColor} hover:shadow-lg`}>
              <div className="h-64">
                <Line options={chartOptions} data={engagementData} />
              </div>
            </div>
          </section>
          
          {/* Goals Progress - Spans 5 columns */}
          <section className="lg:col-span-5">
            <h2 className={`mb-4 text-2xl font-semibold ${textColor}`}>Goals Progress</h2>
            <div className={`p-6 rounded-xl border shadow-sm transition-shadow duration-200 ${borderColor} ${cardBgColor} hover:shadow-lg`}>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <h3 className={`text-lg font-medium ${textColor}`}>Follower Goal</h3>
                    <span className={`${secondaryTextColor}`}>75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: '75%' }}></div>
                  </div>
                  <p className={`mt-2 text-sm ${secondaryTextColor}`}>75,000 / 100,000 followers</p>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <h3 className={`text-lg font-medium ${textColor}`}>Engagement Rate Goal</h3>
                    <span className={`${secondaryTextColor}`}>60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-green-600 h-2.5 rounded-full transition-all duration-500" style={{ width: '60%' }}></div>
                  </div>
                  <p className={`mt-2 text-sm ${secondaryTextColor}`}>4.7% / 8% engagement rate</p>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <h3 className={`text-lg font-medium ${textColor}`}>Post Frequency Goal</h3>
                    <span className={`${secondaryTextColor}`}>90%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-yellow-600 h-2.5 rounded-full transition-all duration-500" style={{ width: '90%' }}></div>
                  </div>
                  <p className={`mt-2 text-sm ${secondaryTextColor}`}>5.2 / 6 posts per week</p>
                </div>
              </div>
            </div>
          </section>
        </div>
        
        {/* Best Performing Posts - Bento Grid */}
        <section className="mt-8">
          <h2 className={`mb-4 text-2xl font-semibold ${textColor}`}>Best Performing Posts</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {topPosts.map((post) => (
              <div 
                key={post.id} 
                className={`p-4 rounded-xl border shadow-sm transition-all duration-200 ${borderColor} ${cardBgColor} hover:scale-105 hover:shadow-lg`}
              >
                <div className="overflow-hidden rounded-lg">
                  <img 
                    src={post.thumbnail} 
                    alt={post.title} 
                    className="object-cover w-full h-40 rounded-lg transition-transform duration-200 transform hover:scale-110" 
                  />
                </div>
                <h3 className={`mt-4 mb-2 text-lg font-medium ${textColor}`}>{post.title}</h3>
                <div className="flex justify-between">
                  <span className={`flex gap-1 items-center ${secondaryTextColor}`}>
                    <span className="text-red-500">❤️</span> {post.likes.toLocaleString()}
                  </span>
                  <span className={`flex gap-1 items-center ${secondaryTextColor}`}>
                    <span>💬</span> {post.comments.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Health;