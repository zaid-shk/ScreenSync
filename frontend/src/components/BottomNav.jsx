import React from "react";
import { Settings,Plus } from "lucide-react";

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 flex items-center justify-end px-8 text-black h-8 w-full bg-white">
      <div className="flex gap-5">
        <Plus size={25} />
        <Settings size={25} />
      </div>
    </div>
  );
};

export default BottomNav;
