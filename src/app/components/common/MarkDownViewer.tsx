import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const MarkDownViewer = ({ course_code }: { course_code: string }) => {
  const [eligibility, setEligibility] = useState('');

  useEffect(() => {
    setEligibility('Loading...');
    fetch(`api/degree_programs/${course_code}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Internal server error');
        }
        return res.json();
      })
      .then(res => setEligibility(res.data))
      .catch(() => setEligibility('Not Available!'));
  }, [course_code]);

  return (
    <div className="prose prose-sm sm:prose max-w-none *:text-sm">
      <ReactMarkdown>{eligibility}</ReactMarkdown>
    </div>
  );
};

export default MarkDownViewer;
