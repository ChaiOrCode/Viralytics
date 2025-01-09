import React, { useState } from 'react';
import { Clock, Activity, ThumbsUp, ThumbsDown, AlertCircle, Timer } from 'lucide-react';

interface TimeAnalysis {
  isGoodTime: boolean;
  confidence: number;
  reason: string;
  nextBestTime: string;
  currentEngagement: string;
  risks: string[];
  recommendations: string[];
}

interface AnalyseButtonProps {
  onAnalysisComplete: (analysis: TimeAnalysis) => void;
}

const AnalyseButton: React.FC<AnalyseButtonProps> = ({ onAnalysisComplete }) => {
  const [analysis, setAnalysis] = useState<TimeAnalysis | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const analyzePostingTime = (): TimeAnalysis => {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    const minute = now.getMinutes();

    const peakHours = [9, 10, 12, 13, 14, 15, 19, 20, 21];
    const weekendPeakHours = [10, 11, 12, 13, 14, 15, 20, 21];
    const lowEngagementHours = [0, 1, 2, 3, 4, 5, 22, 23];

    const isWeekend = day === 0 || day === 6;
    const isLowEngagementHour = lowEngagementHours.includes(hour);
    const isPeakHour = isWeekend
      ? weekendPeakHours.includes(hour)
      : peakHours.includes(hour);

    let nextBestHour = peakHours.find(h => h > hour) || peakHours[0];
    const nextBestTime = new Date();
    nextBestTime.setHours(nextBestHour, 0, 0, 0);
    if (nextBestTime < now) {
      nextBestTime.setDate(nextBestTime.getDate() + 1);
    }

    const closestPeakHour = peakHours.reduce((prev, curr) =>
      Math.abs(curr - hour) < Math.abs(prev - hour) ? curr : prev
    );
    const hourDiff = Math.abs(closestPeakHour - hour);
    const confidence = Math.max(0, 100 - (hourDiff * 15));

    const risks = [];
    const recommendations = [];

    if (isLowEngagementHour) {
      risks.push("Very low active user base during these hours");
      risks.push("Reduced visibility in users' feeds");
      recommendations.push(`Wait until ${nextBestTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} for better engagement`);
    }

    if (isWeekend && !weekendPeakHours.includes(hour)) {
      risks.push("Weekend posting patterns differ from weekdays");
      recommendations.push("Consider different timing for weekend posts");
    }

    if (minute >= 45) {
      risks.push("Approaching the next hour - engagement patterns may shift");
      recommendations.push("Consider waiting for the start of the next hour");
    }

    return {
      isGoodTime: isPeakHour && !isLowEngagementHour,
      confidence,
      reason: isPeakHour
        ? `Current time aligns with peak engagement hours${isWeekend ? ' for weekends' : ''}`
        : `Current time shows ${isLowEngagementHour ? 'very low' : 'moderate'} engagement levels${isWeekend ? ' during weekends' : ''}`,
      nextBestTime: nextBestTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      currentEngagement: isLowEngagementHour ? "Low" : isPeakHour ? "High" : "Moderate",
      risks,
      recommendations
    };
  };

  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      const result = analyzePostingTime();
      setAnalysis(result);
      setLoading(false);
      onAnalysisComplete(result);
    }, 1000);
  };

  return (
    <div className="p-6 rounded-xl border transition-all duration-200 border-light-primary/20 dark:border-dark-primary/20 bg-light-tertiary/10 dark:bg-dark-tertiary/10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2 items-center">
          <Clock className="w-6 h-6 text-light-tertiary dark:text-dark-primary" />
          <h2 className="text-xl font-semibold text-light-tertiary dark:text-dark-primary">
            Post Time Analyzer
          </h2>
        </div>
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="px-4 py-2 font-medium rounded-lg shadow-md transition duration-300 bg-light-primary dark:bg-dark-primary text-nav-light dark:text-nav-dark hover:opacity-85 disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Analyze Now'}
        </button>
      </div>

      {analysis && (
        <div className="space-y-6">
          <div className="flex gap-4 items-center">
            {analysis.isGoodTime ? (
              <ThumbsUp className="w-8 h-8 text-light-tertiary dark:text-dark-primary" />
            ) : (
              <ThumbsDown className="w-8 h-8 text-text-dark dark:text-text-light" />
            )}
            <div>
              <h3 className="text-lg font-medium text-light-tertiary dark:text-dark-primary">
                {analysis.isGoodTime ? 'Good time to post!' : 'Not recommended'}
              </h3>
              <p className="text-sm text-text-light dark:text-text-dim">
                {analysis.reason}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="p-4 rounded-lg bg-light-tertiary/20 dark:bg-dark-tertiary/20">
              <div className="flex gap-2 items-center mb-2">
                <Activity className="w-5 h-5 text-light-tertiary dark:text-dark-primary" />
                <h4 className="font-medium text-light-tertiary dark:text-dark-primary">Confidence</h4>
              </div>
              <p className="text-2xl font-bold text-light-tertiary dark:text-dark-primary">
                {analysis.confidence}%
              </p>
            </div>

            <div className="p-4 rounded-lg bg-light-tertiary/20 dark:bg-dark-tertiary/20">
              <div className="flex gap-2 items-center mb-2">
                <Timer className="w-5 h-5 text-light-tertiary dark:text-dark-primary" />
                <h4 className="font-medium text-light-tertiary dark:text-dark-primary">Next Best Time</h4>
              </div>
              <p className="text-2xl font-bold text-light-tertiary dark:text-dark-primary">
                {analysis.nextBestTime}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-light-tertiary/20 dark:bg-dark-tertiary/20">
              <div className="flex gap-2 items-center mb-2">
                <Activity className="w-5 h-5 text-light-tertiary dark:text-dark-primary" />
                <h4 className="font-medium text-light-tertiary dark:text-dark-primary">Current Engagement</h4>
              </div>
              <p className="text-2xl font-bold text-light-tertiary dark:text-dark-primary">
                {analysis.currentEngagement}
              </p>
            </div>
          </div>

          {(!analysis.isGoodTime && (analysis.risks.length > 0 || analysis.recommendations.length > 0)) && (
            <div className="mt-6 space-y-4">
              {analysis.risks.length > 0 && (
                <div className="p-4 rounded-lg border border-text-dark/20 dark:border-text-light/20">
                  <div className="flex gap-2 items-center mb-3">
                    <AlertCircle className="w-5 h-5 text-text-dark dark:text-text-light" />
                    <h4 className="font-medium text-text-dark dark:text-text-light">Potential Risks</h4>
                  </div>
                  <ul className="space-y-2">
                    {analysis.risks.map((risk, index) => (
                      <li key={index} className="text-text-dim dark:text-text-fade">• {risk}</li>
                    ))}
                  </ul>
                </div>
              )}

              {analysis.recommendations.length > 0 && (
                <div className="p-4 rounded-lg border border-light-primary/20 dark:border-dark-primary/20">
                  <div className="flex gap-2 items-center mb-3">
                    <ThumbsUp className="w-5 h-5 text-light-tertiary dark:text-dark-primary" />
                    <h4 className="font-medium text-light-tertiary dark:text-dark-primary">Recommendations</h4>
                  </div>
                  <ul className="space-y-2">
                    {analysis.recommendations.map((recommendation, index) => (
                      <li key={index} className="text-text-light dark:text-text-dim">• {recommendation}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AnalyseButton;