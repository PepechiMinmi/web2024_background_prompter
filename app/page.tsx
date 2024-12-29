import Link from 'next/link';
import styles from './Home.module.css'; //CSS!!

export default function page() {
  return (
    <div>
      <main className={styles.main}>
        <h1>背景プロンプター</h1>
        <h2>AI画像生成用の背景プロンプトを簡単に作成しよう！</h2>

        <p>「プロンプトを作成するボタン」を押してください．</p>
        <Link href="/prompter">
          <button className={styles.button}>プロンプトを作成する</button>
        </Link>
        
        {/* プロンプトを使った参考画像ギャラリー */}
        <div className={styles.imageGallery}>
          <div className={styles.imageContainer}>
            <img src="image1.jpg" alt="プロンプト1：森の昼の賑やか雰囲気の風景" className={styles.image} />
            <p className={styles.caption}>プロンプト1：森の昼の賑やか雰囲気の風景</p>
          </div>
          <div className={styles.imageContainer}>
            <img src="image2.jpg" alt="プロンプト2：高層ビルの夜の静か雰囲気の風景" className={styles.image} />
            <p className={styles.caption}>プロンプト2：高層ビルの夜の静か雰囲気の風景</p>
          </div>
          <div className={styles.imageContainer}>
            <img src="image3.jpg" alt="プロンプト3：ドラゴンの山の朝の賑やか雰囲気の風景" className={styles.image} />
            <p className={styles.caption}>プロンプト3：ドラゴンの山の朝の賑やか雰囲気の風景</p>
          </div>
        </div>
      </main>
    </div>
  );
}
