'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Confirm() {
  const router = useRouter();

  // クエリパラメータからプロンプトを取得
  const [prompt, setPrompt] = useState("背景: 自然 > 森 | 時間帯: 朝 | 雰囲気: 静か");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryPrompt = params.get('prompt');
    if (queryPrompt) {
      setPrompt(queryPrompt);
    }
  }, []);

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
        <button onClick={() => router.push('/prompter')}>戻る</button>
      </div>
    </div>
  );
}
