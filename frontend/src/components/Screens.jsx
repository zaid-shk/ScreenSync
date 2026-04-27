import React, { useRef, useEffect } from "react";

const devices = [
  { id: "mobile", name: "Mobile", width: 375, height: 667, scale: 0.5, icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" },
  { id: "tablet", name: "Tablet", width: 768, height: 1024, scale: 0.4, icon: "M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" },
  { id: "desktop", name: "Desktop", width: 1280, height: 800, scale: 0.5, icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
];

const DeviceFrame = ({ device, url, onScroll, iframeRef }) => {
  return (
    <div className="flex flex-col gap-3 shrink-0">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2 text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={device.icon} />
          </svg>
          <span className="text-sm font-medium">{device.name}</span>
        </div>
        <span className="text-[10px] text-gray-500 font-mono">{device.width} × {device.height}</span>
      </div>

      <div 
        className="relative origin-top-left"
        style={{ 
          width: device.width * device.scale, 
          height: device.height * device.scale 
        }}
      >
        <div 
          className="bg-[#ffffff] rounded-2xl border border-gray-800 overflow-hidden shadow-2xl absolute inset-0 origin-top-left"
          style={{ 
            width: device.width, 
            height: device.height,
            transform: `scale(${device.scale})`
          }}
        >
          <div className="h-8 bg-[#f8f9fa] border-b border-gray-800 flex items-center px-3 gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500/30" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/30" />
              <div className="w-2 h-2 rounded-full bg-green-500/30" />
            </div>
          </div>
          <iframe
            ref={iframeRef}
            src={url}
            title={device.name}
            className="w-full h-full bg-white border-none scrollbar-custom"
            onLoad={(e) => {
              try {
                const win = e.target.contentWindow;
                win.addEventListener("scroll", () => onScroll(win.scrollY, device.id));
              } catch (err) {
                console.warn("Cross-origin scroll sync blocked by browser security.");
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

const Screens = ({ previewUrl }) => {
  const iframeRefs = useRef({});

  const handleSyncScroll = (scrollY, sourceId) => {
    Object.keys(iframeRefs.current).forEach((id) => {
      if (id !== sourceId && iframeRefs.current[id]) {
        try {
          iframeRefs.current[id].contentWindow.scrollTo(0, scrollY);
        } catch (err) {
          // Ignore cross-origin errors
        }
      }
    });
  };

  return (
    <main className="h-[calc(100vh-100px)] w-full overflow-hidden flex flex-col">
      {!previewUrl ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
          <div className="w-20 h-20 bg-gray-900 rounded-3xl flex items-center justify-center mb-6 border border-gray-800/50 shadow-inner">
            <svg className="w-10 h-10 text-yellow-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9-9H3m9 9V3" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Sync Your Vision</h2>
          <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
            Enter a URL to visualize your design across multiple viewports in perfect harmony.
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-x-auto overflow-y-hidden scrollbar-hide">
          <div className="h-full flex items-center gap-10 px-12 min-w-max animate-in fade-in zoom-in-95 duration-500">
            {devices.map((device) => (
              <DeviceFrame 
                key={device.id} 
                device={device} 
                url={previewUrl} 
                onScroll={handleSyncScroll}
                iframeRef={(el) => (iframeRefs.current[device.id] = el)}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default Screens;



