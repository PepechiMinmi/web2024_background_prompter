export default function Footer() {
  return (
      <footer style={footerStyle}>
          <p>&copy; 2024 Backgroud Prompter. All rights reserved.</p>
          <p>Author：Kaori Takakura　Student Number：5420077　This site：日本大学文理学部情報科学科 2024Webプログラミングの演習課題</p>
      </footer>
  );
}

const footerStyle = {
  position: 'fixed',
  bottom: 0,
  width: '100%',
  height: 'auto', // 高さを自動に調整
  backgroundColor: '#000',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column', // 縦並びに設定
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};
