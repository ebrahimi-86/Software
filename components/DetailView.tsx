import React, { useState, useCallback, useEffect } from 'react';
import type { CategoryInfo, QuizQuestion } from '../types';
import LoadingSpinner from './LoadingSpinner';
import { generateQuiz, generateImage } from '../services/geminiService';

interface DetailViewProps {
  info: CategoryInfo | null;
  isLoading: boolean;
  error: string | null;
  onBack: () => void;
}

const DetailView: React.FC<DetailViewProps> = ({ info, isLoading, error, onBack }) => {
  const [activeTab, setActiveTab] = useState<'learn' | 'quiz'>('learn');
  const [quizQuestion, setQuizQuestion] = useState<QuizQuestion | null>(null);
  const [isQuizLoading, setIsQuizLoading] = useState(false);
  const [quizError, setQuizError] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const [imageUrls, setImageUrls] = useState<(string | 'loading' | 'error')[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      if (info?.imagePrompts && info.imagePrompts.length > 0) {
        // Initialize UI with loading skeletons for each expected image
        setImageUrls(Array(info.imagePrompts.length).fill('loading'));

        // Fetch images sequentially to avoid hitting API rate limits
        for (let i = 0; i < info.imagePrompts.length; i++) {
          try {
            const prompt = info.imagePrompts[i];
            const url = await generateImage(prompt);
            setImageUrls(prevUrls => {
              const newUrls = [...prevUrls];
              newUrls[i] = url;
              return newUrls;
            });
          } catch (e) {
            console.error(`Error fetching image ${i + 1}:`, e);
            setImageUrls(prevUrls => {
              const newUrls = [...prevUrls];
              newUrls[i] = 'error';
              return newUrls;
            });
          }
        }
      }
    };

    if (activeTab === 'learn' && info) {
      fetchImages();
    }
  }, [info, activeTab]);

  const fetchQuiz = useCallback(async () => {
    if (!info) return;
    setIsQuizLoading(true);
    setQuizError(null);
    setSelectedAnswer(null);
    setIsAnswered(false);
    try {
      const facts = `${info.summary} ${info.funFact}`;
      const question = await generateQuiz(info.title, facts);
      setQuizQuestion(question);
    } catch (e) {
      setQuizError("Couldn't load a quiz question. Please try again!");
    } finally {
      setIsQuizLoading(false);
    }
  }, [info]);

  const handleTabChange = (tab: 'learn' | 'quiz') => {
    setActiveTab(tab);
    if (tab === 'quiz' && !quizQuestion && !isQuizLoading) {
      fetchQuiz();
    }
  };

  const handleAnswerClick = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
  };
  
  const getButtonClass = (index: number) => {
    if (!isAnswered) {
      return 'bg-blue-500 hover:bg-blue-600';
    }
    if (index === quizQuestion?.correctAnswerIndex) {
      return 'bg-green-500 cursor-not-allowed';
    }
    if (index === selectedAnswer) {
      return 'bg-red-500 cursor-not-allowed';
    }
    return 'bg-gray-400 cursor-not-allowed opacity-70';
  };

  const handleShare = async () => {
    if (navigator.share && info?.funFact) {
      try {
        await navigator.share({
          title: `A Fun Fact About ${info.title}!`,
          text: `Here's something cool I learned: ${info.funFact}`,
        });
      } catch (err) {
        console.log('Share was cancelled or failed.', err);
      }
    }
  };
  
  const encouragementMessages = ["Great job!", "You got it!", "Awesome!", "Correct!", "Well done!"];
  const [encouragement, setEncouragement] = useState('');

  React.useEffect(() => {
    if (isAnswered && selectedAnswer === quizQuestion?.correctAnswerIndex) {
      setEncouragement(encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)]);
    } else {
      setEncouragement('');
    }
  }, [isAnswered, selectedAnswer, quizQuestion]);

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg relative">
      <button
        onClick={onBack}
        className="absolute top-4 left-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full transition-colors duration-300 z-10"
        aria-label="Go back to categories"
      >
        &larr; Back
      </button>

      {isLoading && (
        <div className="min-h-[400px] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}

      {error && (
        <div className="min-h-[400px] flex flex-col items-center justify-center text-center text-red-600">
          <h2 className="text-2xl font-bold mb-4">Oh no!</h2>
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && info && (
        <div className="animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4 text-center">{info.title}</h2>
          
          <div className="mb-6 border-b border-gray-200 flex justify-center">
            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
              <button
                onClick={() => handleTabChange('learn')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${activeTab === 'learn' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Learn
              </button>
              <button
                onClick={() => handleTabChange('quiz')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${activeTab === 'quiz' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Quiz
              </button>
            </nav>
          </div>

          {activeTab === 'learn' && (
             <div className="space-y-6 text-gray-700 animate-fade-in">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 border-b-2 border-blue-200 pb-1">What are they?</h3>
                  <p className="text-lg leading-relaxed">{info.summary}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 border-b-2 border-green-200 pb-1">Fun Fact! 💡</h3>
                  <blockquote className="text-lg italic bg-yellow-100 p-4 rounded-lg border-l-4 border-yellow-400">
                    {info.funFact}
                  </blockquote>
                   {navigator.share && (
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={handleShare}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-300"
                        aria-label="Share this fun fact"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                        </svg>
                        Share Fun Fact
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 border-b-2 border-purple-200 pb-1">Examples</h3>
                  <ul className="list-disc list-inside space-y-1 pl-2">
                    {info.examples.map((example, index) => (
                      <li key={index} className="text-lg">{example}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 border-b-2 border-rose-200 pb-1">Gallery</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {imageUrls.map((urlState, index) => {
                      if (urlState === 'loading') {
                        return <div key={index} className="bg-gray-200 rounded-lg aspect-square animate-pulse"></div>;
                      }
                      if (urlState === 'error') {
                        return (
                          <div key={index} className="bg-red-100 border border-red-300 rounded-lg aspect-square flex items-center justify-center text-red-600 flex-col p-2 text-center" title="Image failed to load">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs font-semibold">Failed</span>
                          </div>
                        );
                      }
                      return (
                        <img 
                          key={index} 
                          src={urlState} 
                          alt={`Example of ${info?.title || 'category'} ${index + 1}`} 
                          className="w-full h-full object-cover rounded-lg shadow-md aspect-square"
                        />
                      );
                    })}
                  </div>
                </div>
            </div>
          )}
          
          {activeTab === 'quiz' && (
            <div className="min-h-[300px] animate-fade-in">
              {isQuizLoading && <LoadingSpinner />}
              {quizError && <p className="text-center text-red-600">{quizError}</p>}
              {!isQuizLoading && !quizError && quizQuestion && (
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">{quizQuestion.question}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {quizQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerClick(index)}
                        disabled={isAnswered}
                        className={`p-4 rounded-lg text-white font-bold text-lg transition-transform transform hover:scale-105 ${getButtonClass(index)}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  {isAnswered && (
                    <div className="mt-6 animate-fade-in">
                        {selectedAnswer === quizQuestion.correctAnswerIndex && (
                            <p className="text-2xl font-bold text-green-600">{encouragement}</p>
                        )}
                        <button
                          onClick={fetchQuiz}
                          className="mt-4 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition-all duration-300"
                        >
                          Next Question
                        </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DetailView;