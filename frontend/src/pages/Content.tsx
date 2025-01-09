import React, { useState } from 'react';
import { Clock, ThumbsUp, MessageCircle, Send, Copy, Check, TrendingUp, Users, Zap, Info } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface PostAnalysisData {
  should_post: number;
  predicted_retweets: number;
  predicted_likes: number;
  timestamp: string;
  should_post_at: string;
  reason: string;
}

interface GeneratedPostData {
  predicted_likes: number;
  predicted_retweets: number;
  predicted_engagement_rate: number;
  explanation: string;
}

const Card: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}> = ({ title, icon, children, className = "" }) => (
  <div className={`p-4 rounded-xl border transition-all duration-200 border-light-primary/20 dark:border-dark-primary/20 bg-light-secondary/10 dark:bg-dark-secondary/10 hover:scale-105 hover:shadow-lg ${className}`}>
    <div className="flex gap-2 items-center mb-3">
      {icon}
      <h4 className="font-medium text-light-tertiary dark:text-dark-primary">{title}</h4>
    </div>
    {children}
  </div>
);

const AnalysisResult: React.FC<{ analysis: PostAnalysisData }> = ({ analysis }) => (
  <div className="flex gap-4 items-center">
    {analysis.should_post === 1 ? (
      <ThumbsUp className="w-8 h-8 text-light-tertiary dark:text-dark-primary" />
    ) : (
      <Clock className="w-8 h-8 text-text-dark dark:text-text-light" />
    )}
    <div>
      <h3 className="text-lg font-medium text-light-tertiary dark:text-dark-primary">
        {analysis.should_post === 1 ? 'Good time to post!' : 'Wait to post'}
      </h3>
      <p className="text-sm text-text-light dark:text-text-dim">
        {analysis.reason}
      </p>
    </div>
  </div>
);

const PostGenerator: React.FC<{
  prompt: string;
  setPrompt: (value: string) => void;
  generatedPost: GeneratedPostData | null;
  handleGenerate: () => void;
  handleCopy: () => void;
  copied: boolean;
}> = ({ prompt, setPrompt, generatedPost, handleGenerate, handleCopy, copied }) => (
  <div className="mx-auto space-y-4 max-w-2xl">
    <div className="relative group">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Create a post for your latest update..."
        className="w-full min-h-[120px] p-4 rounded-xl border resize-none 
          bg-light-secondary/10 text-light-tertiary border-light-primary/20
          dark:bg-dark-secondary/10 dark:text-dark-primary dark:border-dark-primary/20
          placeholder-light-primary/50 dark:placeholder-dark-secondary/50
          focus:outline-none focus:ring-2 focus:ring-light-secondary/20 
          dark:focus:ring-dark-secondary/20
          group-hover:border-light-primary/40 dark:group-hover:border-dark-primary/40"
        maxLength={280}
      />
      <div className="absolute right-3 bottom-3 text-sm text-light-primary dark:text-dark-secondary">
        {prompt.length}/280
      </div>
    </div>

    <button
      onClick={handleGenerate}
      className="flex gap-2 justify-center items-center px-4 py-2 w-full font-medium rounded-lg transition duration-300 bg-light-tertiary text-nav-light dark:bg-dark-tertiary dark:text-nav-dark hover:opacity-85 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Zap className="w-4 h-4" />
      <span>Generate Post Analysis</span>
    </button>

    {generatedPost && (
      <div className="relative mt-4 group">
        <textarea
          readOnly
          value={prompt}
          className="w-full min-h-[100px] p-4 rounded-xl border resize-none
            bg-light-secondary/5 text-light-tertiary border-light-primary/10
            dark:bg-dark-secondary/5 dark:text-dark-primary dark:border-dark-primary/10"
        />
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 rounded-lg transition duration-300 bg-light-secondary/10 hover:bg-light-secondary/20 dark:bg-dark-secondary/10 dark:hover:bg-dark-secondary/20"
        >
          {copied ?
            <Check className="w-4 h-4 text-green-500" /> :
            <Copy className="w-4 h-4 text-light-primary dark:text-dark-primary" />
          }
        </button>
      </div>
    )}
  </div>
);

const Content: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [postAnalysis, setPostAnalysis] = useState<PostAnalysisData | null>(null);
  const [generatedPost, setGeneratedPost] = useState<GeneratedPostData | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    // Simulate API call for post time analysis
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const analysisResponse = {
      "should_post": 1,
      "predicted_retweets": 120,
      "predicted_likes": 800,
      "timestamp": "2025-01-09 19:48:59.497714",
      "should_post_at": "2025-01-09 20:00:00",
      "reason": "The post should be posted now as it's evening and people are likely to be active on social media, increasing the chances of engagement and reach."
    };
    setPostAnalysis(analysisResponse);
    setLoading(false);
  };

  const handleGenerate = async () => {
    setLoading(true);
    // Simulate API call for post generation
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const generatedResponse = {
      "predicted_likes": 64,
      "predicted_retweets": 13,
      "predicted_engagement_rate": 0.0003,
      "explanation": "Based on the provided data, the most similar post in context of user input is 'my recent internship'. This post has a neutral sentiment and has received 64 likes and 13 retweets. Considering the historical engagement trends for similar content, I predict that the user's post idea will receive approximately 64 likes and 13 retweets. The predicted engagement rate is 0.0003, which is relatively low compared to other posts in the dataset. This is because the user's post idea is not directly relevant to the most similar post, and the engagement metrics for similar content are not exceptionally high. However, the user's post idea has the potential to be unique and viral, which could lead to higher engagement metrics."
    };
    setGeneratedPost(generatedResponse);
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#7A92A5' }
      },
      x: {
        ticks: { color: '#7A92A5' }
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
      borderColor: '#7A92A5',
      backgroundColor: 'rgba(122, 146, 165, 0.5)',
      tension: 0.4
    }]
  };

  return (
    <div className="relative dark:bg-dark-background bg-light-background">
      <div className="absolute inset-x-0 -top-20 h-20 dark:bg-dark-background bg-light-background" />

      <div className="relative px-4 py-8 mt-20 min-h-screen dark:bg-dark-background bg-light-background bg-noise sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <header className="flex justify-between items-center mb-8">
            <div className='flex gap-2'>
              <Zap className="w-8 h-8 text-light-tertiary dark:text-dark-primary" />
              <h1 className="text-3xl font-bold text-light-tertiary dark:text-dark-primary">Post Analyzer</h1>
            </div>
            <div className="flex gap-4 items-center text-light-primary dark:text-dark-secondary">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-medium">Last updated: {formatDateTime(new Date().toISOString())}</span>
            </div>
          </header>

          <Card title="Post Generator" icon={<Send className="w-5 h-5 text-light-tertiary dark:text-dark-primary" />} className="mb-8">
            <PostGenerator
              prompt={prompt}
              setPrompt={setPrompt}
              generatedPost={generatedPost}
              handleGenerate={handleGenerate}
              handleCopy={handleCopy}
              copied={copied}
            />
          </Card>

          {generatedPost && (
            <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-4">
              <Card title="Predicted Likes" icon={<ThumbsUp className="w-5 h-5 text-light-tertiary dark:text-dark-primary" />}>
                <p className="text-3xl font-bold text-light-tertiary dark:text-dark-primary">
                  {generatedPost.predicted_likes}
                </p>
              </Card>
              <Card title="Predicted Retweets" icon={<MessageCircle className="w-5 h-5 text-light-tertiary dark:text-dark-primary" />}>
                <p className="text-3xl font-bold text-light-tertiary dark:text-dark-primary">
                  {generatedPost.predicted_retweets}
                </p>
              </Card>
              <Card title="Engagement Rate" icon={<Users className="w-5 h-5 text-light-tertiary dark:text-dark-primary" />}>
                <p className="text-3xl font-bold text-light-tertiary dark:text-dark-primary">
                  {(generatedPost.predicted_engagement_rate * 100).toFixed(2)}%
                </p>
              </Card>
              <Card title="Analysis" icon={<Info className="w-5 h-5 text-light-tertiary dark:text-dark-primary" />}>
                <p className="text-sm text-light-tertiary dark:text-dark-primary line-clamp-4">
                  {generatedPost.explanation}
                </p>
                <button className="mt-2 text-sm text-light-primary dark:text-dark-secondary hover:underline">
                  Read more
                </button>
              </Card>
            </div>
          )}

          <div className="grid grid-cols-1 gap-8 mb-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Card title="Engagement Trend" icon={<TrendingUp className="w-5 h-5 text-light-tertiary dark:text-dark-primary" />}>
                <div className="h-64">
                  <Line options={chartOptions} data={engagementData} />
                </div>
              </Card>
            </div>

            <div className="lg:col-span-4">
              <Card title="Post Time Analysis" icon={<Clock className="w-5 h-5 text-light-tertiary dark:text-dark-primary" />}>
                <div className="flex flex-col justify-between items-start mb-4">
                  <div className="flex-grow mb-4">
                    {postAnalysis ? (
                      <AnalysisResult analysis={postAnalysis} />
                    ) : (
                      <p className="text-light-tertiary dark:text-dark-primary">Click 'Analyze Timing' to get post time recommendations.</p>
                    )}
                  </div>
                  <button
                    onClick={handleAnalyze}
                    disabled={loading}
                    className="px-4 py-2 w-full font-medium rounded-lg shadow-md transition duration-300 bg-light-primary dark:bg-dark-primary text-nav-light dark:text-nav-dark hover:opacity-85 disabled:opacity-50"
                  >
                    {loading ? 'Analyzing...' : 'Analyze Timing'}
                  </button>
                </div>
              </Card>
            </div>
          </div>

          {postAnalysis && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card title="Recommended Post Time" icon={<Clock className="w-5 h-5 text-light-tertiary dark:text-dark-primary" />}>
                <p className="text-xl font-bold text-light-tertiary dark:text-dark-primary">
                  {formatDateTime(postAnalysis.should_post_at)}
                </p>
              </Card>
              <Card title="Predicted Retweets" icon={<MessageCircle className="w-5 h-5 text-light-tertiary dark:text-dark-primary" />}>
                <p className="text-3xl font-bold text-light-tertiary dark:text-dark-primary">
                  {postAnalysis.predicted_retweets}
                </p>
              </Card>
              <Card title="Predicted Likes" icon={<ThumbsUp className="w-5 h-5 text-light-tertiary dark:text-dark-primary" />}>
                <p className="text-3xl font-bold text-light-tertiary dark:text-dark-primary">
                  {postAnalysis.predicted_likes}
                </p>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;