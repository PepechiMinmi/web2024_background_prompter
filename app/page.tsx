import Link from 'next/link';


const mainStyle: React.CSSProperties = {
  textAlign: 'center',
};

const buttonStyle: React.CSSProperties = {
  width: '200px',
  height: '50px',
  fontSize: '16px',
  padding: '10px',//内側の余白
  backgroundColor: '#007BFF',//ボタンの背景色
  color: '#fff',//ボタンの文字色
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
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
      </main>
    </div>
  );
}
