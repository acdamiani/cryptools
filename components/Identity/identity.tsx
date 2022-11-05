import styles from '@/components/Identity/identity.module.css';

interface InternalProps {
  name?: string;
  imageUrl?: string;
  birthday?: string;
  gender?: `male` | `female`;
}

export type Props = InternalProps;

export default function Identity({ name, gender }: Props) {
  return (
    <div className={styles.identity}>
      <div className={styles.imageContainer}>
        <img
          src={`https://fakeface.rest/thumb/view?gender=${gender}`}
          className={styles.image}
          alt="profile image"
        />
      </div>
      <div className={styles.info}>
        <h3 className={styles.text}>{name}</h3>
        <p className={styles.text}>Birthday</p>
        <p className={styles.text}>Age</p>
        <p className={styles.text}>SSN</p>
        <p className={styles.text}>Birthday</p>
        <p className={styles.text}>Birthday</p>
        <p className={styles.text}>Birthday</p>
        <p className={styles.text}>Birthday</p>
        <p className={styles.text}>Birthday</p>
      </div>
    </div>
  );
}
