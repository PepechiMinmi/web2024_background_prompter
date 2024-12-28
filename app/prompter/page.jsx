'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Prompt() {
  const router = useRouter();

  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');
  const [mood, setMood] = useState('');
  const [step, setStep] = useState(1); // 現在のステップを管理
  const [showGeneratedPrompt, setShowGeneratedPrompt] = useState(false); // プロンプト表示状態

  // プロンプトを生成する関数
  const generatePrompt = () => {
    let prompt = `背景: ${category}`;
    if (subCategory) prompt += ` > ${subCategory}`;
    if (timeOfDay) prompt += ` | 時間帯: ${timeOfDay}`;
    if (mood) prompt += ` | 雰囲気: ${mood}`;
    return prompt;
  };

  // 各ステップが選択されるたびに進む処理
  const handleCategorySelect = (category) => {
    setCategory(category);
    setSubCategory(''); // サブカテゴリをリセット
    setStep(2); // 次のステップ（サブカテゴリ）に進む
  };

  const handleSubCategorySelect = (subCategory) => {
    setSubCategory(subCategory);
    setStep(3); // 次のステップ（時間帯）に進む
  };

  const handleTimeOfDaySelect = (timeOfDay) => {
    setTimeOfDay(timeOfDay);
    setStep(4); // 次のステップ（雰囲気）に進む
  };

  const handleMoodSelect = (mood) => {
    setMood(mood);
    setStep(5); // 次のステップ（確認）に進む
    setShowGeneratedPrompt(true); // プロンプト表示をスライドインさせる
  };

  const handleConfirmNavigation = () => {
    const prompt = generatePrompt();
    router.push(`/confirm?prompt=${encodeURIComponent(prompt)}`);
  };

  return (
    <div>
      <h1>プロンプト作成</h1>
      <div>
        {step === 1 && (
          <div className="slide-in">
            <h2>カテゴリ選択</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              {['自然', '都市', 'ファンタジー'].map((option) => (
                <button
                  key={option}
                  onClick={() => handleCategorySelect(option)}
                  style={{
                    padding: '10px 20px',
                    border: category === option ? '2px solid blue' : '1px solid gray',
                    backgroundColor: category === option ? '#cce5ff' : 'white',
                    cursor: 'pointer',
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && category && (
          <div className="slide-in">
            <h2>サブカテゴリ選択</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              {category === '自然' && (
                <>
                  <button onClick={() => handleSubCategorySelect('森')}>森</button>
                  <button onClick={() => handleSubCategorySelect('湖')}>湖</button>
                  <button onClick={() => handleSubCategorySelect('山')}>山</button>
                </>
              )}
              {category === '都市' && (
                <>
                  <button onClick={() => handleSubCategorySelect('夜景')}>夜景</button>
                  <button onClick={() => handleSubCategorySelect('広場')}>広場</button>
                  <button onClick={() => handleSubCategorySelect('摩天楼')}>摩天楼</button>
                </>
              )}
              {category === 'ファンタジー' && (
                <>
                  <button onClick={() => handleSubCategorySelect('魔法の森')}>魔法の森</button>
                  <button onClick={() => handleSubCategorySelect('ドラゴンの山')}>ドラゴンの山</button>
                </>
              )}
            </div>
          </div>
        )}

        {step === 3 && subCategory && (
          <div className="slide-in">
            <h2>時間帯選択</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              {['朝', '昼', '夜'].map((option) => (
                <button
                  key={option}
                  onClick={() => handleTimeOfDaySelect(option)}
                  style={{
                    padding: '10px 20px',
                    border: timeOfDay === option ? '2px solid blue' : '1px solid gray',
                    backgroundColor: timeOfDay === option ? '#cce5ff' : 'white',
                    cursor: 'pointer',
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && timeOfDay && (
          <div className="slide-in">
            <h2>雰囲気選択</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              {['幻想的', '静か', '賑やか'].map((option) => (
                <button
                  key={option}
                  onClick={() => handleMoodSelect(option)}
                  style={{
                    padding: '10px 20px',
                    border: mood === option ? '2px solid blue' : '1px solid gray',
                    backgroundColor: mood === option ? '#cce5ff' : 'white',
                    cursor: 'pointer',
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && showGeneratedPrompt && (
          <div className="slide-in-generated-prompt">
            <h2>生成されたプロンプト</h2>
            <p>{generatePrompt()}</p>
            <button onClick={handleConfirmNavigation}>プロンプトを確認する</button>
          </div>
        )}
      </div>

      {/* プロンプト内容を下部に表示 */}
      <div className="fixed-prompt">
        {step !== 5 && ( // ステップ5の時だけ表示を消す
          <>
            <h2>選択されたプロンプト</h2>
            <p>{generatePrompt()}</p>
          </>
        )}
      </div>

      <style jsx>{`
        .slide-in {
          animation: slideIn 0.5s ease-out;
        }

        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }

        /* 生成されたプロンプトがスライドインする */
        .slide-in-generated-prompt {
          animation: slideInUp 0.5s ease-out;
        }

        @keyframes slideInUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        /* プロンプト内容を固定表示 */
        .fixed-prompt {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 20px;
          text-align: center;
          z-index: 10; /* フッターより上に表示するためにz-indexを追加 */
        }
      `}</style>
    </div>
  );
}
