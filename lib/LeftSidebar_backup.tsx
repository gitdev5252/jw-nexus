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
    <div className={styles.sidebar}>
      {/* Logo */}
      {/* <div className={styles.logo}>
     <Image src="/favicon.ico" width={40} height={40} alt="Logo" />
    </div> */}
      <div className={styles.bottomSection}>
        <div className={styles.userAvatar}></div>
      </div>
      {/* Navigation Items */}
      <nav className={styles.navigation}>
        {navigationItems.map((item) => (
          <button
            key={item.id}
            className={`${styles.navItem} ${activeTab === item.id ? styles.navItem : ''}`}
            onClick={() => onTabChange?.(item.id)}
            title={item.label}
          >
            <img src={item.icon} alt={item.label} className={styles.navIcon} />
          </button>
        ))}
      </nav>

      {/* Bottom Avatar */}
      <div className={styles.bottomSection}>
        <div className={styles.userAvatar}></div>
      </div>
      {/* Mobile Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg shadow-lg flex md:hidden justify-around px-4 py-3 border-t border-gray-200">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            className={`flex flex-col items-center gap-1 focus:outline-none transition-colors ${
              activeTab === item.id ? 'text-blue-600' : 'text-gray-400'
            }`}
            onClick={() => onTabChange?.(item.id)}
            title={item.label}
          >
            <img src={item.icon} alt={item.label} className="w-6 h-6" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
