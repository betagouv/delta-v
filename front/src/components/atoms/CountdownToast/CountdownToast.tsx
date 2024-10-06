import React, { useEffect, useState, useCallback } from 'react';

import { createPortal } from 'react-dom';

import { Icon } from '../Icon';
import { useStore } from '@/stores/store';

interface CountdownToastProps {
  onTimeout: () => void;
}

export const CountdownToast: React.FC<CountdownToastProps> = ({ onTimeout }) => {
  const [mounted, setMounted] = useState(false);
  const { getCountdownEnd, clearCountdown } = useStore();
  const [remainingTime, setRemainingTime] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setIsExpanded(false), 3000);
    return () => {
      setMounted(false);
      clearTimeout(timer);
    };
  }, []);

  const updateCountdown = useCallback(() => {
    const endTime = getCountdownEnd();
    if (!endTime) return;

    const remaining = Math.max(0, endTime - Date.now());
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);

    if (remaining <= 0) {
      setRemainingTime('');
      clearCountdown();
      onTimeout();
    } else {
      setRemainingTime(
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
      );
      if (remaining <= 60000 && !isExpanded) {
        setIsExpanded(true);
      }
    }
  }, [getCountdownEnd, clearCountdown, onTimeout, isExpanded]);

  useEffect(() => {
    const intervalId = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial update
    return () => clearInterval(intervalId);
  }, [updateCountdown]);

  const toastContent = (
    <div
      className={`border fixed bottom-4 right-4 border-primary-600 text-primary-600 bg-white text-xs rounded shadow-lg cursor-pointer transition-all duration-300 ${
        isExpanded || isHovered ? 'w-[400px] px-4 py-2' : 'w-auto px-2 py-1'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center">
        <Icon name="clock" />
        <span>{remainingTime}</span>
        {(isExpanded || isHovered) && (
          <span className="ml-2">
            Votre session AgentConnect expire, vous serez déconnecté automatiquement
          </span>
        )}
      </div>
    </div>
  );

  return mounted && remainingTime ? createPortal(toastContent, document.body) : null;
};
