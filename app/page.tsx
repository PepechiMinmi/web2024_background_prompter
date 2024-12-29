import Link from 'next/link';

const mainStyle: React.CSSProperties = {
  textAlign: 'center',
};

const buttonStyle: React.CSSProperties = {
  width: '200px',
  height: '50px',
  fontSize: '16px',
  padding: '10px', // 内側の余白
  backgroundColor: '#007BFF', // ボタンの背景色
  color: '#fff', // ボタンの文字色
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginBottom: '30px', // ボタンの下にスペースを追加
};

const imageGalleryStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center', // 画像を中央揃え
  gap: '20px', // 画像間の間隔
};

const imageStyle: React.CSSProperties = {
  width: '200px', // 画像の幅
  height: 'auto', // 高さは自動
  borderRadius: '10px', // 画像の角を丸くする
};

export default function Home() {
  return (
    <div>
      <main style={mainStyle}>
        <h1>背景プロンプター</h1>
        <h2>AI画像生成用の背景プロンプトを簡単に作成しよう！</h2>

        <p>「プロンプトを作成するボタン」を押してください．</p>
        <Link href="/prompter">
          <button style={buttonStyle}>プロンプトを作成する</button>
        </Link>
        
        {/* プロンプトを使った、参考画像ギャラリー */}
        <div style={imageGalleryStyle}>
          <img src="image1.jpg" alt="プロンプト1：森の昼の賑やか雰囲気の風景" style={imageStyle} />
          <img src="image2.jpg" alt="プロンプト2：" style={imageStyle} />
          <img src="image3.jpg" alt="プロンプト3：" style={imageStyle} />
        </div>
      </main>
    </div>
  );
}
