// File: clinic-frontend/src/components/AuthFormContainer.tsx

import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react';

const AuthFormContainer = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const x = (mouseY / height - 0.5) * -20;
    const y = (mouseX / width - 0.5) * 20;
    setRotate({ x, y });
  };

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="w-full max-w-md"
    >
      <motion.div
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative w-full rounded-2xl bg-dark-card p-8 shadow-2xl border border-slate-700/50 
                   before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] 
                   before:bg-[conic-gradient(from_var(--angle),#0ea5e9,#6366f1,#ec4899,#0ea5e9)]
                   before:p-[1px] before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]
                   animate-spin"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default AuthFormContainer;