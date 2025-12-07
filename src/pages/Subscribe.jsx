import { Check } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import styles from './Subscribe.module.css';

const Subscribe = () => {
  return (
    <>
      <Header simplified={true} />
      <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>The Dark News experience. Always on.</h1>
        <p className={styles.subtitle}>Stay informed with unlimited access to breaking news and in-depth reporting</p>
      </div>

      <div className={styles.content}>
        <section className={styles.features}>
          <h2 className={styles.sectionTitle}>There's more to enjoy with Premium Access</h2>
          
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <h3>24/7 NEWS</h3>
              <p>Breaking stories from trusted sources</p>
            </div>
            
            <div className={styles.featureCard}>
              <h3>UNLIMITED ARTICLES</h3>
              <p>In-depth reporting and expert analysis</p>
            </div>
            
            <div className={styles.featureCard}>
              <h3>LIVE COVERAGE</h3>
              <p>Real-time news as it happens</p>
            </div>
            
            <div className={styles.featureCard}>
              <h3>EXCLUSIVE CONTENT</h3>
              <p>Premium stories and investigations</p>
            </div>
            
            <div className={styles.featureCard}>
              <h3>AD-FREE EXPERIENCE</h3>
              <p>Enjoy news without interruptions</p>
            </div>
            
            <div className={styles.featureCard}>
              <h3>PERSONALIZED FEED</h3>
              <p>Curated content based on your interests</p>
            </div>
          </div>
        </section>

        <section className={styles.pricing}>
          <div className={styles.pricingCard}>
            <div className={styles.pricingHeader}>
              <h3>Premium Annual</h3>
              <div className={styles.price}>
                <span className={styles.priceAmount}>$59.99</span>
                <span className={styles.pricePeriod}>/year</span>
              </div>
              <p className={styles.savings}>Save 40% vs monthly</p>
            </div>
            
            <ul className={styles.benefits}>
              <li><Check size={20} /> Unlimited article access</li>
              <li><Check size={20} /> Ad-free experience</li>
              <li><Check size={20} /> Exclusive newsletters</li>
              <li><Check size={20} /> Mobile app access</li>
              <li><Check size={20} /> Cancel anytime</li>
            </ul>
            
            <button type="button" className={styles.subscribeBtn}>
              Subscribe Now
            </button>
          </div>

          <div className={styles.pricingCard}>
            <div className={styles.pricingHeader}>
              <h3>Premium Monthly</h3>
              <div className={styles.price}>
                <span className={styles.priceAmount}>$9.99</span>
                <span className={styles.pricePeriod}>/month</span>
              </div>
              <p className={styles.savings}>Flexible monthly billing</p>
            </div>
            
            <ul className={styles.benefits}>
              <li><Check size={20} /> Unlimited article access</li>
              <li><Check size={20} /> Ad-free experience</li>
              <li><Check size={20} /> Exclusive newsletters</li>
              <li><Check size={20} /> Mobile app access</li>
              <li><Check size={20} /> Cancel anytime</li>
            </ul>
            
           <button type="button" className={styles.subscribeBtn}>
              Choose Plan
            </button>
          </div>
        </section>

        <section className={styles.devices}>
          <h2 className={styles.sectionTitle}>Explore your subscription on your favorite device</h2>
          <p className={styles.devicesText}>
            Access Dark News on desktop, mobile, and tablet. Your subscription works seamlessly across all platforms.
          </p>
        </section>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Subscribe;
