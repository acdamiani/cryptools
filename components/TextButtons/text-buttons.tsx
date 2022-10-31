import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate, faSave, faUpload } from '@fortawesome/free-solid-svg-icons';

import Button from '@/components/Button/button';

import styles from '@/components/TextButtons/text-buttons.module.css';

interface InternalProps {
  onConvert?: () => void;
  onUpload?: () => void;
  onSave?: () => void;
}

export type Props = InternalProps;

export default function TextButtons({ onConvert, onUpload, onSave }: Props) {
  return (
    <div className={styles.buttons}>
      <Button onClick={onConvert} icon={faRotate}>
        Convert
      </Button>
      <Button onClick={onUpload} icon={faUpload} secondary>
        Upload File
      </Button>
      <Button onClick={onSave} icon={faSave} secondary>
        Save Output
      </Button>
    </div>
  );
}
