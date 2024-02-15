import React from 'react';
import styles from './Footer.module.css';
import {robotoMedium} from './../../../../public/fonts/fonts';

const footerLinks = [
  [
    'Link 1',
    'Link 2',
    'Link 3',
    'Link 4'
  ],
  [
    'Link 5',
    'Link 6'
  ],
  [
    'Link 7'
  ],
  [
    'Link 8'
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