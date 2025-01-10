import React, { useState, useCallback, useEffect } from 'react';
import { ThumbsUp, Share2, MessageCircle, Eye, ArrowUp, ArrowDown, LucideIcon, TrendingUp, Award } from 'lucide-react';

enum SortDirection {
  Ascending = 'asc',
  Descending = 'desc'
}

interface LeaderboardProps {
  darkMode: boolean;
}

interface Post {
  readonly id: number;
  readonly rank: number;
  readonly title: string;
  readonly likes: number;
  readonly shares: number;
  readonly followers: number;
  readonly reach: number;
  readonly trend?: number;
}

type SortableField = keyof Omit<Post, 'id' | 'title' | 'trend'>;

interface RankStyle {
  readonly color: string;
  readonly emoji: string;
  readonly bgColor: string;
}

interface MetricData {
  readonly icon: LucideIcon;
  readonly value: number;
  readonly label: string;
  readonly color: string;
  readonly trend?: number;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ darkMode }) => {
  const [sortField, setSortField] = useState<SortableField>('rank');
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Ascending);

  const bgColor = darkMode ? 'bg-dark-background' : 'bg-light-background';
  const textColor = darkMode ? 'text-dark-primary' : 'text-light-tertiary';
  const secondaryTextColor = darkMode ? 'text-dark-secondary' : 'text-light-primary';
  const borderColor = darkMode ? 'border-dark-primary/20' : 'border-light-primary/20';
  const cardBgColor = darkMode ? 'bg-dark-primary/10' : 'bg-light-primary/10';
  const hoverBgColor = darkMode ? 'hover:bg-dark-primary/20' : 'hover:bg-light-primary/20';
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchLeaderboardData = async (): Promise<readonly Post[]> => {
    try {
      const response = await fetch('https://pythonbackend-n73y.onrender.com/api/leaderboard');

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const apiData = await response.json();
      const parsedData = JSON.parse(apiData.response);

      // Map the API response to the Post type structure
      const formattedPosts: Post[] = parsedData.map((item: any, index: number) => ({
        id: item['Tweet ID'],
        rank: index + 1,
        title: item['Tweet Text'],
        likes: item.Favorites || 0,
        shares: item.Retweets || 0,
        followers: item.Followers, // Assuming no followers data in API
        reach: item.Engagement || 0,
        trend: 0, // Placeholder for trend calculation
      }));

      // return formattedPosts;
      console.log(formattedPosts);
      setPosts(formattedPosts);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
      return [];
    }
  };  
  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const rankStyles: ReadonlyArray<RankStyle> = [
    { color: 'text-yellow-500', emoji: '👑', bgColor: 'bg-yellow-500/10' },
    { color: 'text-gray-400', emoji: '🥈', bgColor: 'bg-gray-400/10' },
    { color: 'text-yellow-700', emoji: '🥉', bgColor: 'bg-yellow-700/10' },
    { color: 'text-gray-500', emoji: '4', bgColor: 'bg-gray-500/10' },
    { color: 'text-gray-500', emoji: '5', bgColor: 'bg-gray-500/10' },
  ] as const;

  const sortedPosts = [...posts].sort((a, b) => {
    const modifier = sortDirection === SortDirection.Ascending ? 1 : -1;
    return (a[sortField] - b[sortField]) * modifier;
  });

  const handleSort = useCallback((field: SortableField) => {
    if (sortField === field) {
      setSortDirection(prev =>
        prev === SortDirection.Ascending ? SortDirection.Descending : SortDirection.Ascending
      );
    } else {
      setSortField(field);
      setSortDirection(SortDirection.Descending);
    }
  }, [sortField]);

  const renderMetric = useCallback(({ icon: Icon, value, label, color, trend }: MetricData) => (
    <div className={`flex flex-col items-center p-3 rounded-lg ${hoverBgColor}`}>
      <div className="flex items-center space-x-2">
        <Icon className={`w-5 h-5 ${color}`} />
        {trend !== undefined && (
          <span className={`text-xs ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <span className={`mt-1 text-lg font-bold ${textColor}`}>{value.toLocaleString()}</span>
      <span className={`text-sm ${secondaryTextColor}`}>{label}</span>
    </div>
  ), [textColor, secondaryTextColor, hoverBgColor]);

  const getPostMetrics = (post: Post): ReadonlyArray<MetricData> => [
    { icon: ThumbsUp, value: post.likes, label: 'Likes', color: 'text-sky-500', trend: post.trend },
    { icon: Share2, value: post.shares, label: 'Shares', color: 'text-teal-500' },
    { icon: MessageCircle, value: post.followers, label: 'Comments', color: 'text-yellow-500' },
    { icon: Eye, value: post.reach, label: 'Reach', color: 'text-fuchsia-300' },
  ] as const;

  return (
    <div className={`relative ${bgColor}`}>
      {/* Background fill that extends up behind navbar */}
      <div className={`absolute inset-x-0 -top-20 h-20 ${bgColor}`} />

      {/* Main content with mt-20 preserved */}
      <div className={`relative px-4 py-8 mt-20 min-h-screen ${bgColor} sm:px-6 lg:px-8`}>
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center mb-8">
            <Award className={`w-8 h-8 ${textColor}`} />
            <h1 className={`ml-3 text-3xl font-bold ${textColor}`}>Leaderboard</h1>
          </div>

          <section className="mb-12">
            <h2 className={`mb-6 text-2xl font-semibold ${textColor}`}>Top Performers</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {sortedPosts.slice(0, 3).map((post) => (
                <div
                  key={post.id}
                  className={`p-6 rounded-xl border transition-colors ${borderColor} ${cardBgColor}`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${rankStyles[post.rank - 1].bgColor}`}>
                        <span className={`text-2xl ${rankStyles[post.rank - 1].color}`}>
                          {rankStyles[post.rank - 1].emoji}
                        </span>
                      </div>
                      <h3 className={`text-lg font-medium ${textColor}`}>{post.title}</h3>
                    </div>
                    {post.trend && (
                      <div className={`flex items-center px-2 py-1 rounded-full ${post.trend > 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                        <TrendingUp className="mr-1 w-4 h-4" />
                        <span className="text-sm">{post.trend}%</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {getPostMetrics(post).map((metric, index) => (
                      <React.Fragment key={index}>
                        {renderMetric(metric)}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className={`mb-6 text-2xl font-semibold ${textColor}`}>Full Leaderboard</h2>
            <div className={`overflow-hidden rounded-xl border ${borderColor} ${cardBgColor}`}>
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${borderColor}`}>
                    <th
                      className={`p-4 text-left cursor-pointer ${textColor} hover:${cardBgColor}`}
                      onClick={() => handleSort('rank')}
                    >
                      <div className="flex items-center">
                        Rank
                        {sortField === 'rank' && (
                          sortDirection === SortDirection.Ascending ?
                            <ArrowUp className="ml-1 w-4 h-4" /> :
                            <ArrowDown className="ml-1 w-4 h-4" />
                        )}
                      </div>
                    </th>
                    <th className={`p-4 text-left ${textColor}`}>Post</th>
                    {(['likes', 'shares', 'followers', 'reach'] as const).map((field) => (
                      <th
                        key={field}
                        className={`p-4 text-right cursor-pointer ${textColor} hover:${cardBgColor}`}
                        onClick={() => handleSort(field)}
                      >
                        <div className="flex justify-end items-center">
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                          {sortField === field && (
                            sortDirection === SortDirection.Ascending ?
                              <ArrowUp className="ml-1 w-4 h-4" /> :
                              <ArrowDown className="ml-1 w-4 h-4" />
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedPosts.map((post) => (
                    <tr
                      key={post.id}
                      className={`border-b ${borderColor} hover:${cardBgColor}`}
                    >
                      <td className={`p-4 ${textColor}`}>
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${rankStyles[post.rank - 1].bgColor}`}>
                          <span className={`text-sm font-bold ${rankStyles[post.rank - 1].color}`}>
                            {rankStyles[post.rank - 1].emoji}
                          </span>
                        </div>
                      </td>
                      <td className={`p-4 ${textColor}`}>
                        <div className="flex items-center">
                          <span className="font-medium">{post.title}</span>
                          {post.trend && (
                            <span className={`ml-2 px-2 py-1 text-xs rounded-full ${post.trend > 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                              {post.trend > 0 ? '+' : ''}{post.trend}%
                            </span>
                          )}
                        </div>
                      </td>
                      <td className={`p-4 text-right ${secondaryTextColor}`}>{post.likes.toLocaleString()}</td>
                      <td className={`p-4 text-right ${secondaryTextColor}`}>{post.shares.toLocaleString()}</td>
                      <td className={`p-4 text-right ${secondaryTextColor}`}>{post.followers.toLocaleString()}</td>
                      <td className={`p-4 text-right ${secondaryTextColor}`}>{post.reach.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;