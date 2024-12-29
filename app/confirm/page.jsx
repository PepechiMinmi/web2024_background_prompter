'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Confirm() {
  const router = useRouter();

  const [prompt, setPrompt] = useState("背景: 自然 > 森 | 時間帯: 朝 | 雰囲気: 静か");//クエリの初期状態
  const [images, setImages] = useState([]);//画像用

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryPrompt = params.get('prompt');
    if (queryPrompt) {
      setPrompt(queryPrompt);
    }

    const fetchImages = async () => {
      const apiKey = '47913415-22773aab0e2db5c5fd880ec68';//APIキー
      const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(prompt)}&image_type=photo&per_page=50`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.hits) {
          setImages(data.hits);//50個くらい画像を取得してセット
        }
      } catch (error) {
        console.error("画像の取得に失敗しました", error);
      }
    };

    fetchImages();
  }, [prompt]);

  const handleEditPrompt = (e) => {
    setPrompt(e.target.value);
  };

  const handleConfirm = () => {
    alert("プロンプトが確定しました: " + prompt);
    router.push('/');//ホーム画面戻る
  };

  return (
    <div style={containerStyle}>
      <h1>プロンプト確認</h1>
      <div style={textareaContainerStyle}>
        <label>生成されたプロンプト:</label>
        <textarea
          value={prompt}
          onChange={handleEditPrompt}
          rows="4"
          cols="50"
          placeholder="ここでプロンプトを編集できます"
          style={textareaStyle}
        />
      </div>
      <div style={buttonContainerStyle}>
        <button onClick={handleConfirm} style={buttonStyle}>プロンプトを確定</button>
        <button onClick={() => router.push('/prompter')} style={buttonStyle}>プロンプトを作り直す</button>
      </div>

      <div style={galleryStyle}>
        <h2>プロンプト関連画像ギャラリー</h2>
        <div style={galleryGridStyle}>
          {images.length > 0 ? (
            images.map((image) => (
              <div key={image.id} style={imageContainerStyle}>
                <img
                  src={image.webformatURL}
                  alt={image.tags}
                  style={imageStyle}
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

const containerStyle = {
  textAlign: 'center',
  margin: '20px auto',
};

const textareaContainerStyle = {
  marginBottom: '20px',
};

const textareaStyle = {
  width: '80%',
  maxWidth: '500px',
  fontSize: '16px',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const buttonContainerStyle = {
  marginBottom: '20px',
};

const buttonStyle = {
  margin: '0 10px',
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#007BFF',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const galleryStyle = {
  marginTop: '20px',
};

const galleryGridStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '10px',
};

const imageContainerStyle = {
  width: '200px',
  borderRadius: '8px',
  overflow: 'hidden',
};

const imageStyle = {
  width: '100%',
  height: 'auto',
  borderRadius: '8px',
};
