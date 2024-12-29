'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

//クエリを貰って来て表示・確定、再編集ボタン、クエリ関連の画像を表示、

export default function Confirm() {
  const router = useRouter();

  const [prompt, setPrompt] = useState("背景: 自然 > 森 | 時間帯: 朝 | 雰囲気: 静か");//プロンプトの初期状態
  const [images, setImages] = useState([]);//画像

  //クエリパラメータからプロンプトを受け取る
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryPrompt = params.get('prompt');
    if (queryPrompt) {
      setPrompt(queryPrompt);
    }

    //PixabayAPI
    const fetchImages = async () => {
      const apiKey = '47913415-22773aab0e2db5c5fd880ec68'; //PixabayAPIキー
      const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(prompt)}&image_type=photo&per_page=50`;
      
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.hits) {
          setImages(data.hits); //画像データのセット、50個くらいもらってくる
        }
      } catch (error) {
        console.error("画像の取得に失敗しました", error);
      }
    };

    fetchImages();//画像を取得
  }, [prompt]);//プロンプトが変更されるたびに再実行

  const handleEditPrompt = (e) => {
    setPrompt(e.target.value);
  };

  const handleConfirm = () => {
    alert("プロンプトが確定しました: " + prompt);
    router.push('/'); // ホーム画面へ戻る
  };

  return (
    <div>
      <h1>プロンプト確認</h1>
      <div>
        <label>生成されたプロンプト:</label>
        <textarea
          value={prompt}
          onChange={handleEditPrompt}
          rows="4"
          cols="50"
          placeholder="ここでプロンプトを編集できます"
        />
      </div>
      <div>
        <button onClick={handleConfirm}>プロンプトを確定</button>
        <button onClick={() => router.push('/prompter')}>プロンプトを作り直す</button>
      </div>

      {/* ギャラリー表示 */}
      <div style={{ marginTop: '20px' }}>
        <h2>プロンプト関連画像ギャラリー</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {images.length > 0 ? (
            images.map((image) => (
              <div key={image.id} style={{ width: '200px', borderRadius: '8px', overflow: 'hidden' }}>
                <img
                  src={image.webformatURL}
                  alt={image.tags}
                  style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                />
              </div>
            ))
          ) : (
            <p>関連する画像が見つかりませんでした。</p>
          )}
        </div>
      </div>
    </div>
  );
}
