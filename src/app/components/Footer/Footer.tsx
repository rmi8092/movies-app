import React from 'react';
import styles from './Footer.module.css';
import {robotoMedium} from './../../../../public/fonts/fonts';

const footerLinks = [
  [
    'Footer Link 1',
    'Footer Link 2',
    'Footer Link 3',
    'Footer Link 4'
  ],
  [
    'Footer Link 5',
    'Footer Link 6'
  ],
  [
    'Footer Link 7'
  ],
  [
    'Footer Link 8'
  ]
];

function Footer() {
  return (
    <footer className={styles.footer}>
      {footerLinks.map((section, index) => {
        return (
          <ul key={index}>
            {section.map(link => <li key={link} className={`${robotoMedium.className} antialiased`}>{link}</li>)}
          </ul>
        )
      })}
    </footer>
  );
};

export default Footer;