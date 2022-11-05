import { useId } from 'react';

import { faGears, faShuffle } from '@fortawesome/free-solid-svg-icons';

import Area from '@/components/Area/area';
import Select from '@/components/Select/select';
import Button from '@/components/Button/button';
import Actions from '@/components/Actions/actions';
import IdentityView from '@/components/Identity/identity';

export default function Identity() {
  const genderId = useId();

  return (
    <>
      <h1>Random Identity Generator</h1>
      <Area>
        <label htmlFor={genderId}>Gender</label>
        <Select id={genderId}>
          <option value="both">Both</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Select>
        <Actions>
          <Button icon={faGears}>Generate</Button>
          <Button icon={faShuffle} secondary>
            Randomize Options
          </Button>
        </Actions>
        <IdentityView name="John Doe" gender="male" />
      </Area>
    </>
  );
}
