import AnalyseButton from '../components/AnalyseButton'
import TextArea from '../components/TextArea'

const Content: React.FC = () => {
  // @ts-ignore
  const handleAnalysisComplete = (analysis: TimeAnalysis) => {
    console.log(analysis); 
  };

  return (
    <div className='mt-20'>
      <AnalyseButton onAnalysisComplete={handleAnalysisComplete} />
      <TextArea />
    </div>
  );
}

export default Content