import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <main>
        <h1>背景プロンプター</h1>
        <h2>AI画像生成用の背景プロンプトを簡単に作成しよう！</h2>

        <Link href="/prompter">        
          <button>プロンプトを作成する</button>
        </Link>

      </main>
    </div>
  );
}
