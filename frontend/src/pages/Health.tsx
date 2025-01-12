import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { TrendingUp, Users, BarChart, Activity, Heart, MessageCircle, Clock, Zap, Award } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface HealthProps {
  darkMode: boolean;
}


const formatDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
};

const Health: React.FC<HealthProps> = ({ darkMode }) => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: darkMode ? '#C0C8D4' : '#7A92A5' }
      },
      x: {
        ticks: { color: darkMode ? '#C0C8D4' : '#7A92A5' }
      }
    },
    plugins: {
      legend: { display: false }
    }
  };

  const engagementData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Engagement',
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: darkMode ? '#5E78A2' : '#7A92A5',
      backgroundColor: darkMode ? 'rgba(94, 120, 162, 0.5)' : 'rgba(122, 146, 165, 0.5)',
      tension: 0.4
    }]
  };
  {/* <span className="text-sm font-medium">Last updated: {formatDateTime(new Date().toISOString())}</span> */ }
  const topPosts = [
    { id: 1, title: 'Top Performing Post', likes: 161, comments: 21, engagement: '30.1%' },
    { id: 2, title: 'Second Best Perfroming Post', likes: 78, comments: 11, engagement: '17.7%' },
    { id: 3, title: 'Third Best Performing Post', likes: 12, comments: 2, engagement: '8.7%' }
  ];

  return (
    <div className="relative dark:bg-dark-background bg-light-background">
      {/* Background fill that extends up behind navbar */}
      <div className="absolute inset-x-0 -top-20 h-20 dark:bg-dark-background bg-light-background" />

      {/* Main content with mt-20 preserved */}
      <div className="relative px-4 py-8 mt-20 min-h-screen dark:bg-dark-background bg-light-background bg-noise sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <header className="flex justify-between items-center mb-8">
            <div className='flex gap-2'>
              <Heart className="w-8 h-8 dark:text-dark-primary text-light-tertiary" />
              <h1 className="text-3xl font-bold dark:text-dark-primary text-light-tertiary">Account Health</h1>
            </div>
            <div className="flex gap-4 items-center dark:text-dark-secondary text-light-primary">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-medium">Last updated: {formatDateTime(new Date().toISOString())}</span>
            </div>
          </header>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: TrendingUp, title: 'Total Reach', value: '10.4K', change: '+8% from last week' },
              { icon: Users, title: 'Follower Growth', value: '+126', change: 'This week' },
              { icon: BarChart, title: 'Engagement Rate', value: '46%', change: '+3% from last month' },
              { icon: Activity, title: 'Post Frequency', value: '4/6', change: 'Posts per week' }
            ].map((stat, index) => (
              <div key={index} className="p-6 rounded-xl border transition-all duration-200 dark:border-dark-primary/20 border-light-primary/20 dark:bg-dark-tertiary/10 bg-light-tertiary/10 hover:scale-105 hover:shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <stat.icon className="w-6 h-6 dark:text-dark-primary text-light-tertiary" />
                  <span className="px-2 py-1 text-xs font-medium rounded-full dark:bg-dark-secondary/20 bg-light-secondary/20 dark:text-dark-primary text-light-tertiary">
                    Real-time
                  </span>
                </div>
                <h3 className="text-lg font-medium dark:text-dark-primary text-light-tertiary">{stat.title}</h3>
                <p className="mt-2 text-2xl font-bold dark:text-dark-primary text-light-tertiary">{stat.value}</p>
                <p className="mt-1 text-sm dark:text-dark-secondary text-light-primary">{stat.change}</p>
              </div>
            ))}
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 gap-8 mb-8 lg:grid-cols-12">
            {/* Engagement Chart */}
            <div className="lg:col-span-8">
              <div className="p-6 h-full rounded-xl border dark:border-dark-primary/20 border-light-primary/20 dark:bg-dark-tertiary/10 bg-light-tertiary/10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold dark:text-dark-primary text-light-tertiary">Engagement Trend</h2>
                  <Zap className="w-8 h-8 rotate-12 dark:text-dark-primary text-light-tertiary" />
                </div>
                <div className="h-64">
                  <Line options={chartOptions} data={engagementData} />
                </div>
              </div>
            </div>

            {/* Goals Progress */}
            <div className="lg:col-span-4">
              <div className="p-6 h-full rounded-xl border dark:border-dark-primary/20 border-light-primary/20 dark:bg-dark-tertiary/10 bg-light-tertiary/10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold dark:text-dark-primary text-light-tertiary">Goal Tracker</h2>
                  <Award className="w-8 h-8 -rotate-12 dark:text-dark-primary text-light-tertiary" />
                </div>
                <div className="space-y-6">
                  {[
                    { title: 'Follower Goal', current: 75, total: 871, progress: 1000, color: 'dark:bg-dark-tertiary bg-light-tertiary' },
                    { title: 'Engagement Rate', current: 60, total: 8, progress: 4, color: 'dark:bg-dark-tertiary bg-light-tertiary' },
                    { title: 'Post Frequency', current: 90, total: 6, progress: 5.2, color: 'dark:bg-dark-tertiary bg-light-tertiary' }
                  ].map((goal, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <h3 className="text-lg font-medium dark:text-dark-primary text-light-tertiary">{goal.title}</h3>
                        <span className="dark:text-dark-secondary text-light-primary">{goal.current}%</span>
                      </div>
                      <div className="w-full dark:bg-dark-background/50 bg-light-background/50 rounded-full h-2.5">
                        <div className={`${goal.color} h-2.5 rounded-full transition-all duration-500`} style={{ width: `${goal.current}%` }}></div>
                      </div>
                      <p className="mt-2 text-sm dark:text-dark-secondary text-light-primary">
                        {goal.progress} / {goal.total} {goal.title.toLowerCase()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Top Posts Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {topPosts.map((post, index) => (
              <div key={post.id} className="p-6 rounded-xl border transition-all duration-200 dark:border-dark-primary/20 border-light-primary/20 dark:bg-dark-tertiary/10 bg-light-tertiary/10 hover:scale-105 hover:shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold dark:text-dark-primary text-light-tertiary">#{index + 1}</span>
                  <span className="px-3 py-1 text-sm font-medium rounded-full dark:bg-dark-secondary/20 bg-light-secondary/20 dark:text-dark-primary text-light-tertiary">
                    {post.engagement}
                  </span>
                </div>
                <h3 className="mb-4 text-lg font-medium dark:text-dark-primary text-light-tertiary">{post.title}</h3>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <Heart className="w-5 h-5 dark:text-dark-secondary text-light-primary" />
                    <span className="dark:text-dark-secondary text-light-primary">{post.likes.toLocaleString()}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <MessageCircle className="w-5 h-5 dark:text-dark-secondary text-light-primary" />
                    <span className="dark:text-dark-secondary text-light-primary">{post.comments.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Health;