import React from 'react';

export const PawIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 13.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-7 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm3.5-5c-.83 0-1.5-.67-1.5-1.5S11.17 7.5 12 7.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-5.21 1.71c-1.38 1.38-1.38 3.62 0 5l-1.41 1.41c-2.17-2.17-2.17-5.69 0-7.83l1.41 1.42z" />
  </svg>
);

export const LeafIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66C7.38 17.43 9.48 12 17 12V8z" />
    <path d="M17 8c0-2.21-1.79-4-4-4s-4 1.79-4 4c0 .74.21 1.42.57 2.02C10.23 11.23 11 10.13 12 9.27 13.57 8.2 15.34 8 17 8z" />
  </svg>
);

export const MeatIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.78,13.6c-0.3-0.29-3.3-2.6-3.3-2.6c-0.59-0.45-1.42-0.34-1.88,0.22l-1.33,1.61c-0.41,0.5-0.33,1.21,0.18,1.62 l3.3,2.6C17.24,17.44,18,17.36,18.4,16.89l1.56-1.88C20.32,14.61,20.21,13.99,19.78,13.6z M10.4,11.11L4,17.51 c-0.78,0.78-2.05,0.78-2.83,0s-0.78-2.05,0-2.83L7.57,8.28c-0.04-0.17-0.07-0.35-0.07-0.53C7.5,6.13,9.13,4.5,11,4.5 c1.13,0,2.15,0.54,2.78,1.38L10.4,11.11z" />
    </svg>
);

export const SnakeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.14 6.86C16.59 5.31 14.48 4 12 4s-4.59 1.31-6.14 2.86C4.31 8.41 3 10.52 3 13c0 2.48 1.31 4.59 2.86 6.14C7.41 20.69 9.52 22 12 22s4.59-1.31 6.14-2.86C19.69 17.59 21 15.48 21 13c0-2.48-1.31-4.59-2.86-6.14zM12 20c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm-1-8h2v2h-2zm0 4h2v2h-2zm-4-4h2v2H7zm8 0h2v2h-2z" />
  </svg>
);

export const SnailIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M21,15.28c-0.38-0.2-1.23-0.33-2.12-0.33c-1.38,0-2.5,0.44-2.5,1.57c0,0.85,0.83,1.33,1.6,1.48 c-0.1,2.1-1.78,3.72-3.86,3.94v-2.04c1.23-0.27,2.12-1.16,2.12-2.31c0-1.28-1.04-2.31-2.31-2.31c-0.23,0-0.45,0.04-0.66,0.1 c-0.9-1.16-2.25-1.92-3.79-1.92c-2.34,0-4.3,1.63-4.86,3.81C4.22,17.25,4.61,18,5,18h0.29c0.41,0.73,1.15,1.25,2.02,1.38v2.12 C4.02,21.09,2,18.2,2,14.92C2,11.66,4.6,9,7.85,9c0.35,0,0.68,0.04,1.01,0.1C9.62,7.3,11.73,6,14.28,6 c3.38,0,6.19,2.4,6.65,5.64C22.08,12.33,22.84,13.66,21,15.28z" />
    </svg>
);

export const BirdIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.9,8.5c-0.3-0.5-0.8-0.8-1.4-0.8h-2.1l-2.6-4.4c-0.5-0.8-1.5-1.1-2.4-0.6c-0.8,0.5-1.1,1.5-0.6,2.4l1.8,3H10 c-2.2,0-4,1.8-4,4v2H4c-1.1,0-2,0.9-2,2s0.9,2,2,2h2v2c0,1.1,0.9,2,2,2s2-0.9,2-2v-2h2v2c0,1.1,0.9,2,2,2s2-0.9,2-2v-2h2 c1.1,0,2-0.9,2-2s-0.9-2-2-2h-2v-2c0-1.2,0.6-2.3,1.5-2.9C21.9,9.8,22.2,9.1,21.9,8.5z"/>
    </svg>
);

export const FishIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M22,11c0-5-3.8-9-8.5-9S5,6,5,11s3.8,9,8.5,9S22,16,22,11z M4,11c0,0.5,0,1,0.1,1.5L2,14v-1l-2-1l2-1v-1l2,1.5 C4,10,4,10.5,4,11z M17,11c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S17.6,11,17,11z"/>
    </svg>
);

export const InsectIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8 s8,3.59,8,8S16.41,20,12,20z M11,11V6h2v5h-2z M11,13h2v2h-2V13z M7.5,13.5C8.33,13.5,9,12.83,9,12s-0.67-1.5-1.5-1.5 S6,11.17,6,12S6.67,13.5,7.5,13.5z M16.5,13.5c0.83,0,1.5-0.67,1.5-1.5s-0.67-1.5-1.5-1.5s-1.5,0.67-1.5,1.5 S15.67,13.5,16.5,13.5z"/>
    </svg>
);

export const AmphibianIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M9,16c-1.66,0-3-1.34-3-3s1.34-3,3-3s3,1.34,3,3 S10.66,16,9,16z M15,16c-1.66,0-3-1.34-3-3s1.34-3,3-3s3,1.34,3,3S16.66,16,15,16z"/>
    </svg>
);

export const OmnivoreIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.4,5.5C16.9,4.1,14.6,3,12,3S7.1,4.1,5.6,5.5C4.1,7,3,9.4,3,12c0,3.2,1.5,6.1,3.9,7.9c0.5,0.4,1.1,0.6,1.7,0.6 c1.1,0,2-0.9,2-2c0-0.5-0.2-1-0.5-1.4c-0.8-0.9-1.2-2-1.2-3.2c0-2.8,2.2-5,5-5s5,2.2,5,5c0,1.2-0.4,2.3-1.2,3.2 c-0.3,0.4-0.5,0.9-0.5,1.4c0,1.1,0.9,2,2,2c0.6,0,1.2-0.2,1.7-0.6C19.5,18.1,21,15.2,21,12C21,9.4,19.9,7,18.4,5.5z M8,12 c-0.8,0-1.5-0.7-1.5-1.5S7.2,9,8,9s1.5,0.7,1.5,1.5S8.8,12,8,12z M16,12c-0.8,0-1.5-0.7-1.5-1.5S15.2,9,16,9s1.5,0.7,1.5,1.5 S16.8,12,16,12z"/>
    </svg>
);