import { useState, useRef, useEffect } from 'react';
import { User, Settings, Mail, BookOpen, LogOut } from 'lucide-react';
import styles from './UserProfile.module.css';

const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.userProfile} ref={dropdownRef}>
      <button 
        className={styles.avatarButton} 
        onClick={toggleDropdown}
        aria-label="User menu"
      >
        <User size={24} />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <button className={styles.menuItem}>
            <Settings size={18} />
            <span>Settings</span>
          </button>
          
          <button className={styles.menuItem}>
            <Mail size={18} />
            <span>Newsletters</span>
          </button>
          
          <button className={styles.menuItem}>
            <BookOpen size={18} />
            <span>Topics you follow</span>
          </button>
          
          <div className={styles.divider}></div>
          
          <button className={styles.menuItem}>
            <LogOut size={18} />
            <span>Sign out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
