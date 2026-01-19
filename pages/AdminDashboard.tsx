
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  // 작업 관리자 기능을 사용하지 않으므로 홈으로 리다이렉트
  return <Navigate to="/" replace />;
};

export default AdminDashboard;
