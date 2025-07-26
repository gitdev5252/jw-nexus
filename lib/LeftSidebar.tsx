'use client';

import React from 'react';
import styles from '../styles/LeftSidebar.module.css';
import { navigationItems } from '@/constants/data';

interface LeftSidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}


export function LeftSidebar({ activeTab = 'video', onTabChange }: LeftSidebarProps) {
  return (
    <div className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logo}>
        <img src="/images/icons/icon.png" alt="Logo" className={styles.logoIcon} />
      </div>

      {/* Navigation Items */}
      <nav className={styles.navigation}>
        {navigationItems.map((item) => (
          <button
            key={item.id}
            className={`${styles.navItem} ${
              activeTab === item.id ? styles.navItem : ''
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
  );
}
