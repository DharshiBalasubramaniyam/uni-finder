import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const MarkDownViewer = ({ filePath }: { filePath: string }) => {
  const [eligibility, setEligibility] = useState('');

  useEffect(() => {
    setEligibility('Loading...');
    fetch(filePath)
      .then(res => {
        if (!res.ok) {
          throw new Error('File not found');
        }
        return res.text();
      })
      .then(text => setEligibility(text))
      .catch(() => setEligibility('N/A'));
  }, [filePath]);

  return (
    <div className="prose prose-sm sm:prose max-w-none *:text-sm">
      <ReactMarkdown>{eligibility}</ReactMarkdown>
    </div>
  );
};

export default MarkDownViewer;
