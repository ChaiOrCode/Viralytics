import React, { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { BarChart, Clock, Lightbulb, TrendingUp, Heart, Share2, MessageCircle, ChartBarIncreasingIcon, Target } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

interface AnalyticsProps {
  darkMode: boolean;
}

const Analytics: React.FC<AnalyticsProps> = ({ darkMode }) => {
  const [timeFilter, setTimeFilter] = useState('today');
  const [postTypeFilter, setPostTypeFilter] = useState('all');
  const [sentimentFilter, setSentimentFilter] = useState('all');

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
        labels: { color: darkMode ? '#C8D5E2' : '#1A5885' }
      }
    }
  };

  const engagementData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Likes',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: '#1A5885',
      },
      {
        label: 'Shares',
        data: [28, 48, 40, 19, 86, 27, 90],
        backgroundColor: '#8AA3B8',
      },
      {
        label: 'Comments',
        data: [35, 25, 30, 45, 55, 20, 38],
        backgroundColor: '#DCE5ED',
      },
    ],
  };

  const timeOfPostData = {
    labels: ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'],
    datasets: [
      {
        label: 'Engagement',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: '#1A5885',
        backgroundColor: 'rgba(26, 88, 133, 0.5)',
        tension: 0.4
      },
    ],
  };

  const sentimentData = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        data: [60, 30, 10],
        backgroundColor: ['#4CAF50', '#FFA000', '#F44336'],
      },
    ],
  };

  return (
    <div className={`relative ${bgColor}`}>
      {/* Background fill that extends up behind navbar */}
      <div className={`absolute inset-x-0 -top-20 h-20 ${bgColor}`} />
      
      {/* Main content with mt-20 preserved */}
      <div className={`relative px-4 py-8 mt-20 min-h-screen ${bgColor} sm:px-6 lg:px-8`}>
        <div className="mx-auto max-w-7xl">
          {/* Header with Icon */}
          <header className="flex justify-between items-center mb-8">
            <div className="flex gap-2 items-center">
              <ChartBarIncreasingIcon className={`w-8 h-8 ${textColor}`} />
              <h1 className={`text-3xl font-bold ${textColor}`}>Analytics Dashboard</h1>
            </div>
            <div className={`flex gap-4 items-center ${secondaryTextColor}`}>
              <Target className="w-5 h-5" />
              <span className="text-sm font-medium">Last updated: Today, 2:30 PM</span>
            </div>
          </header>

          {/* Post Analytics Section */}
          <section className="mb-12">
            <h2 className={`mb-6 text-2xl font-semibold ${textColor}`}>Post Analytics</h2>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className={`p-6 rounded-xl border transition-transform duration-200 ${borderColor} ${cardBgColor} hover:scale-105`}>
                <div className="flex items-center mb-4">
                  <BarChart className={`mr-2 w-6 h-6 ${textColor}`} />
                  <h3 className={`text-lg font-medium ${textColor}`}>Engagement Metrics</h3>
                </div>
                <div className="h-64">
                  <Bar options={chartOptions} data={engagementData} />
                </div>
              </div>

              <div className={`p-6 rounded-xl border transition-transform duration-200 ${borderColor} ${cardBgColor} hover:scale-105`}>
                <div className="flex items-center mb-4">
                  <Clock className={`mr-2 w-6 h-6 ${textColor}`} />
                  <h3 className={`text-lg font-medium ${textColor}`}>Time-of-Post Analysis</h3>
                </div>
                <div className="h-64">
                  <Line options={chartOptions} data={timeOfPostData} />
                </div>
              </div>

              <div className={`p-6 rounded-xl border transition-transform duration-200 ${borderColor} ${cardBgColor} hover:scale-105`}>
                <div className="flex items-center mb-4">
                  <Lightbulb className={`mr-2 w-6 h-6 ${textColor}`} />
                  <h3 className={`text-lg font-medium ${textColor}`}>Content Insights</h3>
                </div>
                <ul className={`mt-4 space-y-4 ${secondaryTextColor}`}>
                  <li className="flex items-center p-3 bg-green-500 bg-opacity-10 rounded-lg">
                    <TrendingUp className="mr-3 w-5 h-5 text-green-500" />
                    <span>Video posts increased engagement by 25%</span>
                  </li>
                  <li className="flex items-center p-3 bg-red-500 bg-opacity-10 rounded-lg">
                    <Heart className="mr-3 w-5 h-5 text-red-500" />
                    <span>Posts with images get 2x more likes</span>
                  </li>
                  <li className="flex items-center p-3 bg-blue-500 bg-opacity-10 rounded-lg">
                    <Share2 className="mr-3 w-5 h-5 text-blue-500" />
                    <span>Threads receive 3x more shares</span>
                  </li>
                  <li className="flex items-center p-3 bg-yellow-500 bg-opacity-10 rounded-lg">
                    <MessageCircle className="mr-3 w-5 h-5 text-yellow-500" />
                    <span>Question posts generate 50% more comments</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Engagement & Sentiment Breakdown Section */}
          <section>
            <h2 className={`mb-6 text-2xl font-semibold ${textColor}`}>Engagement & Sentiment Breakdown</h2>

            {/* Filters */}
            <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
              <div className={`p-4 rounded-xl border ${borderColor} ${cardBgColor}`}>
                <label htmlFor="timeFilter" className={`block mb-2 font-medium ${secondaryTextColor}`}>Time Range</label>
                <select
                  id="timeFilter"
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className={`p-2 w-full bg-transparent rounded-md border ${borderColor} ${textColor} focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="today">Today</option>
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>

              <div className={`p-4 rounded-xl border ${borderColor} ${cardBgColor}`}>
                <label htmlFor="postTypeFilter" className={`block mb-2 font-medium ${secondaryTextColor}`}>Post Type</label>
                <select
                  id="postTypeFilter"
                  value={postTypeFilter}
                  onChange={(e) => setPostTypeFilter(e.target.value)}
                  className={`p-2 w-full bg-transparent rounded-md border ${borderColor} ${textColor} focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="all">All Types</option>
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                  <option value="text">Text</option>
                </select>
              </div>

              <div className={`p-4 rounded-xl border ${borderColor} ${cardBgColor}`}>
                <label htmlFor="sentimentFilter" className={`block mb-2 font-medium ${secondaryTextColor}`}>Sentiment</label>
                <select
                  id="sentimentFilter"
                  value={sentimentFilter}
                  onChange={(e) => setSentimentFilter(e.target.value)}
                  className={`p-2 w-full bg-transparent rounded-md border ${borderColor} ${textColor} focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="all">All Sentiments</option>
                  <option value="positive">Positive</option>
                  <option value="neutral">Neutral</option>
                  <option value="negative">Negative</option>
                </select>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className={`p-6 rounded-xl border transition-transform duration-200 ${borderColor} ${cardBgColor} hover:scale-105`}>
                <h3 className={`mb-4 text-lg font-medium ${textColor}`}>Engagement Breakdown</h3>
                <div className="h-64">
                  <Bar options={chartOptions} data={engagementData} />
                </div>
              </div>

              <div className={`p-6 rounded-xl border transition-transform duration-200 ${borderColor} ${cardBgColor} hover:scale-105`}>
                <h3 className={`mb-4 text-lg font-medium ${textColor}`}>Sentiment Analysis</h3>
                <div className="h-64">
                  <Pie
                    data={sentimentData}
                    options={{
                      ...chartOptions,
                      plugins: {
                        legend: {
                          position: 'bottom',
                          labels: { color: darkMode ? '#C8D5E2' : '#1A5885' }
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Analytics;