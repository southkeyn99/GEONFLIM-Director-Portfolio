
export const formatImageUrl = (url: string): string => {
  if (!url) return url;
  
  // 유서 파이널 최종 포스터 드라이브 폴더 링크 매핑 지원
  if (url.includes('1yB05sOZgSQwi4Y-o5nnTqJWpO_krGAzg')) {
    return 'https://lh3.googleusercontent.com/d/1AyMsoQZoAKnIG3zZIWEY4vngCHZoczkx';
  }

  // 구글 드라이브 공유 링크 패턴 매칭 (file/d/ID 또는 id=ID)
  const driveRegex = /\/file\/d\/([^\/?#]+)|id=([^\/&?#]+)/;
  const match = url.match(driveRegex);
  
  if (match) {
    const fileId = match[1] || match[2];
    // 구글의 이미지 렌더링 서버를 사용한 직링크 반환
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }
  
  return url;
};
