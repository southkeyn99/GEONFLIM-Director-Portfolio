
export const formatImageUrl = (url: string): string => {
  if (!url) return url;
  
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
