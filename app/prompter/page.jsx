'use client'; 
//プロンプター画面：メインカテゴリ->サブカテゴリ->時間帯->雰囲気->リザルト、のみ
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Prompt() {
  const router = useRouter();

  const [category, setCategory] = useState('');//カテゴリ用
  const [subCategory, setSubCategory] = useState('');//サブカテ用
  const [timeOfDay, setTimeOfDay] = useState('');//時間帯
  const [mood, setMood] = useState('');//雰囲気用
  const [step, setStep] = useState(1); // 現在のステップ管理
  const [showGeneratedPrompt, setShowGeneratedPrompt] = useState(false); // プロンプト表示状態

  //プロンプト生成用の関数
  const generatePrompt = () => {
    let prompt = '';
    
    // カテゴリとサブカテゴリの合体
    if (category === '自然') {
      prompt += subCategory ? `${subCategory}の` : '';
    } else if (category === '都市') {
      prompt += subCategory ? `${subCategory}の` : '';
    } else if (category === 'ファンタジー') {
      prompt += subCategory ? `${subCategory}の` : '';
    }

    //時間帯
    if (timeOfDay) {
      prompt += `${timeOfDay}の`;
    }

    //雰囲気
    if (mood) {
      prompt += `${mood}雰囲気の`;
    }

    //表示文字の最後に「風景」を表示、次の画面にいくと画像表示されにくいなぜ：治った
    prompt+='風景';

    return prompt;
  };

  //カテゴリを選択すると次に行く様
  const handleCategorySelect = (category) => {
    setCategory(category);
    setSubCategory(''); // サブカテゴリをリセット
    setStep(2); // 次のステップ:サブカテゴリ
  };

  //サブカテセット
  const handleSubCategorySelect = (subCategory) => {
    setSubCategory(subCategory);
    setStep(3); //時間
  };

  //時間セット
  const handleTimeOfDaySelect = (timeOfDay) => {
    setTimeOfDay(timeOfDay);
    setStep(4); //次のステップ：雰囲気
  };

  //雰囲気セット
  const handleMoodSelect = (mood) => {
    setMood(mood);
    setStep(5); //次のステップ：確認
    setShowGeneratedPrompt(true);
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
                    padding: '20px 40px',
                    border: category === option ? '2px solid blue' : '1px solid gray',
                    backgroundColor: category === option ? '#cce5ff' : 'white',
                    cursor: 'pointer',
                    fontSize: '25px',
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
                  <button onClick={() => handleSubCategorySelect('森')} style={{ padding: '20px 40px' }}>森</button>
                  <button onClick={() => handleSubCategorySelect('湖')} style={{ padding: '20px 40px' }}>湖</button>
                  <button onClick={() => handleSubCategorySelect('山')} style={{ padding: '20px 40px' }}>山</button>
                </>
              )}
              {category === '都市' && (
                <>
                  <button onClick={() => handleSubCategorySelect('夜景')} style={{ padding: '20px 40px' }}>夜景</button>
                  <button onClick={() => handleSubCategorySelect('広場')} style={{ padding: '20px 40px' }}>広場</button>
                  <button onClick={() => handleSubCategorySelect('高層ビル')} style={{ padding: '20px 40px' }}>高層ビル</button>
                </>
              )}
              {category === 'ファンタジー' && (
                <>
                  <button onClick={() => handleSubCategorySelect('魔法の森')} style={{ padding: '20px 40px' }}>魔法の森</button>
                  <button onClick={() => handleSubCategorySelect('ドラゴンの山')} style={{ padding: '20px 40px' }}>ドラゴンの山</button>
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
                    padding: '20px 40px',
                    border: timeOfDay === option ? '2px solid blue' : '1px solid gray',
                    backgroundColor: timeOfDay === option ? '#cce5ff' : 'white',
                    cursor: 'pointer',
                    fontSize: '25px',
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
                    padding: '20px 40px',
                    border: mood === option ? '2px solid blue' : '1px solid gray',
                    backgroundColor: mood === option ? '#cce5ff' : 'white',
                    cursor: 'pointer',
                    fontSize: '25px',
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 修正：下部じゃなくて、上に表示されるようには*/}
        {step === 5 && showGeneratedPrompt && (
          <div className="result-prompt slide-in">
            <h2>生成されたプロンプト</h2>
            <p>{generatePrompt()}</p>
            <button onClick={handleConfirmNavigation} 
              style={{ padding: '10px 30px',
                       fontSize: '20px',
              }}>
              プロンプトを確認する
            </button>
          </div>
        )}
      </div>

      {/* 今までの選択プロンプトを下部に表示する */}
      <div className="fixed-prompt">
        {step !== 5 && ( //ステップ5の時だけ表示を消す
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

        .fixed-prompt {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 80px;
          text-align: center;
          z-index: 1500;
        }

        .result-prompt {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 80px;
          text-align: center;
          z-index: 2000;
        }
      `}</style>
    </div>
  );
}
