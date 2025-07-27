// for vercel 
import { Suspense } from 'react';
import QuestionClient from './QuestionClient';

export default function QuestionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuestionClient />
    </Suspense>
  );
}

