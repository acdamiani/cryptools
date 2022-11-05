import SecurityChip from '@/public/security-chip.svg';
import styles from '@/components/CreditCard/credit-card.module.css';

interface InternalProps {
  number?: string;
  name?: string;
  expires?: string;
  cvv?: string;
}

export type Props = InternalProps;

export default function CreditCard({
  number = `0000 0000 0000 0000`,
  name = `John Doe`,
  expires = `3/25`,
  cvv = `000`,
}: Props) {
  return (
    <div className={styles.cards}>
      <div className={styles.card}>
        <div className={styles.row}>
          <SecurityChip className={styles.chip} />
        </div>
        <span className={styles.cardNumber}>{number}</span>
        <div className={styles.row}>
          <div className={styles.bottomLabelBox}>
            <span className={styles.label}>Card Holder</span>
            <span className={styles.text}>{name}</span>
          </div>
          <div className={styles.bottomLabelBox}>
            <span className={styles.label}>Expires</span>
            <span className={styles.text}>{expires}</span>
          </div>
        </div>
        <div className={styles.stripeWrap}>
          <div className={styles.bgStripe}></div>
        </div>
      </div>
      <div className={styles.cardSecondary}>
        <div className={styles.strip} />
        <span className={styles.secCode}>Sec Code: {cvv}</span>
      </div>
    </div>
  );
}
