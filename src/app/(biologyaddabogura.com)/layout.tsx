import DefaultNavbar from "@/components/core/navbars/DefaultNavbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <DefaultNavbar />
      {children}
    </div>
  );
};

export default layout;
