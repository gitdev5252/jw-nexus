'use client';

import React from 'react';
import styles from '../styles/LeftSidebar.module.css';
import { navigationItems } from '@/constants/data';
import Image from 'next/image';

interface LeftSidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function LeftSidebar({ activeTab = 'video', onTabChange }: LeftSidebarProps) {
  return (
    <>
      {/* Desktop Sidebar - Only visible on desktop screens */}
      <div className={styles.sidebar}>
        <div className={styles.bottomSection}>
          <div className={styles.userAvatar}>
            <img
              src="/images/icons/icon.png"
              alt="User Avatar"
              className={styles.userAvatar}
            />

          </div>
        </div>
        {/* Navigation Items */}
        <nav className={styles.navigation}>
          {navigationItems.map((item) => (
            <button
              key={item.id}
              className={`${styles.navItem} ${activeTab === item.id ? styles.activeNavItem : 'hover:bg-white/10'
                }`}
              onClick={() => onTabChange?.(item.id)}
              title={item.label}
            >
              <img
                src={item.icon}
                alt={item.label}
                className={styles.navIcon}
              />
            </button>

          ))}
        </nav>

        {/* Bottom Avatar */}
        <div className={styles.bottomSection}>
          <div className={styles.userAvatar}>
          </div>
        </div>
      </div>

      {/* Mobile Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg shadow-lg flex md:hidden justify-around px-4 py-3 border-t border-gray-200">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            className={`flex flex-col items-center gap-1 focus:outline-none transition-all duration-300 p-2 ${activeTab === item.id
                ? 'text-blue-600 bg-blue-500/20 backdrop-blur-md shadow-lg shadow-blue-500/25 border border-blue-300/30 rounded-2xl'
                : 'text-gray-400 hover:bg-white/10 rounded-xl'
              }`}
            onClick={() => onTabChange?.(item.id)}
            title={item.label}
          >
            <img src={item.icon} alt={item.label} className="w-6 h-6" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
