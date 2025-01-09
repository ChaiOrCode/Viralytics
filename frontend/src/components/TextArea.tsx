import { useState } from 'react';
import { Send, Copy, Check } from 'lucide-react';

const PostGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [response, _setResponse] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8 bg-noise">
      <div className="mx-auto space-y-6 max-w-2xl">
        <div className="relative group">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Create a X post for my latest trip to Gwalior..."
            className="w-full min-h-[120px] p-4 rounded-xl border resize-none 
              bg-light-tertiary/10 text-light-tertiary border-light-primary/20
              dark:bg-dark-tertiary/10 dark:text-dark-primary dark:border-dark-primary/20
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

        {response && (
          <div className="relative group">
            <textarea
              readOnly
              value={response}
              className="w-full min-h-[100px] p-4 rounded-xl border resize-none
                bg-light-tertiary/5 text-light-tertiary border-light-primary/10
                dark:bg-dark-tertiary/5 dark:text-dark-primary dark:border-dark-primary/10"
            />
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 p-2 rounded-lg bg-light-tertiary/10 hover:bg-light-tertiary/20 dark:bg-dark-tertiary/10 dark:hover:bg-dark-tertiary/20"
            >
              {copied ? 
                <Check className="w-4 h-4 text-green-500" /> : 
                <Copy className="w-4 h-4 text-light-primary dark:text-dark-primary" />
              }
            </button>
          </div>
        )}

        <button type="button" 
          className="flex gap-2 justify-center items-center px-6 py-3 w-full font-medium rounded-xl bg-light-tertiary text-light-background dark:bg-dark-tertiary dark:text-dark-primary hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed">
          <Send className="w-5 h-5" />
          <span>Generate</span>
        </button>
      </div>
    </div>
  );
};

export default PostGenerator;