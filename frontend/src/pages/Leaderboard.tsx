import React, { useState, useCallback } from 'react';
import { ThumbsUp, Share2, MessageCircle, Eye, ArrowUp, ArrowDown, LucideIcon } from 'lucide-react';

// Enum for available time ranges
enum TimeRange {
  Day = 'day',
  Week = 'week',
  Month = 'month',
  Year = 'year'
}

// Enum for sort directions
enum SortDirection {
  Ascending = 'asc',
  Descending = 'desc'
}

// Interface for component props
interface LeaderboardProps {
  darkMode: boolean;
}

// Interface for post data
interface Post {
  readonly id: number;
  readonly rank: number;
  readonly title: string;
  readonly likes: number;
  readonly shares: number;
  readonly comments: number;
  readonly reach: number;
}

// Type for sortable fields
type SortableField = keyof Omit<Post, 'id' | 'title'>;

// Interface for rank styling
interface RankStyle {
  readonly color: string;
  readonly emoji: string;
}

// Interface for metric data
interface MetricData {
  readonly icon: LucideIcon;
  readonly value: number;
  readonly label: string;
  readonly color: string;
}

// Type guard for checking valid sort fields
// const isSortableField = (field: string): field is SortableField => {
//   return ['rank', 'likes', 'shares', 'comments', 'reach'].includes(field);
// };

const Leaderboard: React.FC<LeaderboardProps> = ({ darkMode }) => {
  // State with proper typing
  const [sortField, setSortField] = useState<SortableField>('rank');
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Ascending);
  const [_selectedTimeRange, _setSelectedTimeRange] = useState<TimeRange>(TimeRange.Week);
  const [expandedPost, setExpandedPost] = useState<number | null>(null);

  // Theme variables with specific string literal types
  const bgColor = darkMode ? 'bg-dark-background' : 'bg-light-background';
  const textColor = darkMode ? 'text-dark-primary' : 'text-light-tertiary';
  const secondaryTextColor = darkMode ? 'text-dark-secondary' : 'text-light-primary';
  const borderColor = darkMode ? 'border-dark-primary/20' : 'border-light-primary/20';
  const cardBgColor = darkMode ? 'bg-dark-primary/10' : 'bg-light-primary/10';

  // Readonly array of posts
  const posts: readonly Post[] = [
    { id: 1, rank: 1, title: 'Top Performing Post 1', likes: 1500, shares: 500, comments: 200, reach: 10000 },
    { id: 2, rank: 2, title: 'Runner-up Post', likes: 1200, shares: 400, comments: 150, reach: 8000 },
    { id: 3, rank: 3, title: 'Third Place Post', likes: 1000, shares: 300, comments: 100, reach: 7000 },
    { id: 4, rank: 4, title: 'Fourth Place Post', likes: 800, shares: 250, comments: 80, reach: 6000 },
    { id: 5, rank: 5, title: 'Fifth Place Post', likes: 700, shares: 200, comments: 70, reach: 5000 },
  ] as const;

  // Readonly rank styles mapping
  const rankStyles: ReadonlyArray<RankStyle> = [
    { color: 'text-yellow-500', emoji: '🏆' },
    { color: 'text-gray-400', emoji: '🥈' },
    { color: 'text-yellow-700', emoji: '🥉' },
    { color: 'text-gray-500', emoji: '4th' },
    { color: 'text-gray-500', emoji: '5th' },
  ] as const;

  // Sort posts with type safety
  const sortedPosts = [...posts].sort((a, b) => {
    const modifier = sortDirection === SortDirection.Ascending ? 1 : -1;
    return (a[sortField] - b[sortField]) * modifier;
  });

  // Type-safe event handlers
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

  const handlePostClick = useCallback((postId: number) => {
    setExpandedPost(prevId => prevId === postId ? null : postId);
  }, []);

  // Type-safe metric renderer
  const renderMetric = useCallback(({ icon: Icon, value, label, color }: MetricData) => (
    <div className="flex flex-col items-center p-3 bg-opacity-10 rounded-lg transition-all duration-200 hover:bg-opacity-20">
      <Icon className={`w-5 h-5 ${color}`} />
      <span className="mt-1 text-lg font-bold">{value.toLocaleString()}</span>
      <span className="text-sm">{label}</span>
    </div>
  ), []);

  // Get metrics for a post
  const getPostMetrics = (post: Post): ReadonlyArray<MetricData> => [
    { icon: ThumbsUp, value: post.likes, label: 'Likes', color: 'text-sky-500' },
    { icon: Share2, value: post.shares, label: 'Shares', color: 'text-teal-500' },
    { icon: MessageCircle, value: post.comments, label: 'Comments', color: 'text-yellow-500' },
    { icon: Eye, value: post.reach, label: 'Reach', color: 'text-fuchsia-300' },
  ] as const;

  return (
    <div className={`px-4 py-8 mt-20 min-h-screen ${bgColor} sm:px-6 lg:px-8`}>
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${textColor}`}>Leaderboard</h1>
        </div>
        
        {/* Top 3 Posts Spotlight */}
        <section className="mb-12">
          <h2 className={`mb-6 text-2xl font-semibold ${textColor}`}>Top Performers</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {sortedPosts.slice(0, 3).map((post) => (
              <div 
                key={post.id} 
                className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer ${borderColor} ${cardBgColor} hover:scale-105`}
                onClick={() => handlePostClick(post.id)}
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <span className={`text-3xl font-bold ${rankStyles[post.rank - 1].color}`}>
                      {rankStyles[post.rank - 1].emoji}
                    </span>
                    <h3 className={`ml-3 text-lg font-medium ${textColor}`}>{post.title}</h3>
                  </div>
                </div>
                
                <div className={`grid grid-cols-2 gap-4 transition-all duration-300 ${expandedPost === post.id ? 'opacity-100' : 'opacity-90'}`}>
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
        
        {/* Leaderboard Table */}
        <section>
          <h2 className={`mb-6 text-2xl font-semibold ${textColor}`}>Full Leaderboard</h2>
          <div className={`overflow-hidden rounded-xl border ${borderColor} ${cardBgColor}`}>
            <table className="w-full">
              <thead>
                <tr className={`border-b ${borderColor}`}>
                  <th 
                    className={`p-4 text-left cursor-pointer ${textColor}`}
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
                  {(['likes', 'shares', 'comments', 'reach'] as const).map((field) => (
                    <th 
                      key={field}
                      className={`p-4 text-right cursor-pointer ${textColor}`}
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
                    className={`border-b transition-colors duration-200 cursor-pointer ${borderColor} hover:bg-opacity-50`}
                    onClick={() => handlePostClick(post.id)}
                  >
                    <td className={`p-4 ${textColor}`}>
                      <span className={`font-bold ${rankStyles[post.rank - 1].color}`}>
                        {rankStyles[post.rank - 1].emoji}
                      </span>
                    </td>
                    <td className={`p-4 ${textColor}`}>
                      <div className="flex items-center">
                        <span className="font-medium">{post.title}</span>
                      </div>
                    </td>
                    <td className={`p-4 text-right ${secondaryTextColor}`}>{post.likes.toLocaleString()}</td>
                    <td className={`p-4 text-right ${secondaryTextColor}`}>{post.shares.toLocaleString()}</td>
                    <td className={`p-4 text-right ${secondaryTextColor}`}>{post.comments.toLocaleString()}</td>
                    <td className={`p-4 text-right ${secondaryTextColor}`}>{post.reach.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Leaderboard;