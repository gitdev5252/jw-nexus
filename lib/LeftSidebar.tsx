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
        <div className={styles.userAvatar}>
        </div>
      </div>
      {/* Navigation Items */}
      <nav className={styles.navigation}>
        {navigationItems.map((item) => (
          <button
            key={item.id}
            className={`${styles.navItem} ${activeTab === item.id ? styles.navItem : ''
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
