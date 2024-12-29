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

const imageContainerStyle: React.CSSProperties = {
  textAlign: 'center', // 画像と説明文を中央揃え
};

const imageStyle: React.CSSProperties = {
  width: '200px', // 画像の幅
  height: 'auto', // 高さは自動
  borderRadius: '10px', // 画像の角を丸くする
};

const captionStyle: React.CSSProperties = {
  marginTop: '10px', // 画像と説明文の間にスペースを追加
  fontSize: '14px', // 説明文のフォントサイズ
  color: '#555', // 説明文の色
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
          <div style={imageContainerStyle}>
            <img src="image1.jpg" alt="プロンプト1：森の昼の賑やか雰囲気の風景" style={imageStyle} />
            <p style={captionStyle}>プロンプト1：森の昼の賑やか雰囲気の風景</p>
          </div>
          <div style={imageContainerStyle}>
            <img src="image2.jpg" alt="プロンプト2：高層ビルの夜の静か雰囲気の風景" style={imageStyle} />
            <p style={captionStyle}>プロンプト2：高層ビルの夜の静か雰囲気の風景</p>
          </div>
          <div style={imageContainerStyle}>
            <img src="image3.jpg" alt="プロンプト3：ドラゴンの山の朝の賑やか雰囲気の風景" style={imageStyle} />
            <p style={captionStyle}>プロンプト3：ドラゴンの山の朝の賑やか雰囲気の風景</p>
          </div>
        </div>
      </main>
    </div>
  );
}
