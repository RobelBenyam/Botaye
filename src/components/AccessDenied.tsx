import React from "react";

const AccessDenied: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <h1 className="text-xl font-bold text-red-600">
        This page is only allowed to be accessed by superadmins
      </h1>
    </div>
  );
};

export default AccessDenied;
