import { Github, Twitter, Linkedin } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.column}>
          <h3>DarkNews</h3>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
            Delivering the latest tech and hacker news with a focus on reading experience.
          </p>
        </div>
        
        <div className={styles.column}>
          <h3>Categories</h3>
          <ul className={styles.links}>
            <li><a href="#">Top Stories</a></li>
            <li><a href="#">New Stories</a></li>
            <li><a href="#">Best Stories</a></li>
            <li><a href="#">Show HN</a></li>
          </ul>
        </div>
        
        <div className={styles.column}>
          <h3>Legal</h3>
          <ul className={styles.links}>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
      
      <div className={styles.bottom}>
        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} DarkNews. All rights reserved.
        </div>
        
        <div className={styles.social}>
          <a href="#" className={styles.socialIcon} aria-label="Github">
            <Github size={20} />
          </a>
          <a href="#" className={styles.socialIcon} aria-label="Twitter">
            <Twitter size={20} />
          </a>
          <a href="#" className={styles.socialIcon} aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
