import "./globals.css";

export const metadata = {
  title: "나의 별 타입은?",
  description: "우주 성향 테스트 이벤트 페이지",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}