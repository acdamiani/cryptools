import classNames from 'classnames';
import SelectEl, {
  Props as SelectElProps,
  GroupBase,
  StylesConfig,
} from 'react-select';

import styles from '@/components/Select/select.module.css';

export default function Select<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({ className, ...props }: SelectElProps<Option, IsMulti, Group>) {
  const customStyles: StylesConfig<Option, IsMulti, Group> = {
    control: (provided) => ({
      ...provided,
      borderWidth: 1,
      boxShadow: `none`,
      padding: `1rem`,
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: `0`,
    }),
    indicatorSeparator: () => ({
      display: `none`,
    }),
    singleValue: (provided) => ({
      ...provided,
      margin: `0`,
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: `0`,
      color: `gray`,
    }),
    input: (provided) => ({
      ...provided,
      padding: `0`,
      margin: `0`,
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: `5px`,
      border: `1px solid var(--color-outline)`,
      width: `fit-content`,
    }),
    menuList: (provided) => ({
      ...provided,
      padding: `0.5rem`,
    }),
    option: (provided, state) => ({
      ...provided,
      borderRadius: `5px`,
      backgroundColor: state.isFocused ? `var(--rs-primary)` : `transparent`,
      color: `white`,
    }),
  };

  return (
    <SelectEl
      className={classNames(styles.select, className)}
      {...props}
      styles={customStyles}
      theme={(theme) => ({
        ...theme,
        borderRadius: 5,
        colors: {
          ...theme.colors,
          primary: `var(--rs-primary)`,
          primary25: `var(--rs-primary25)`,
          primary50: `var(--rs-primary50)`,
          primary75: `var(--rs-primary75)`,

          danger: `var(--rs-danger)`,
          dangerLight: `var(--rs-danger-light)`,

          neutral0: `var(--rs-neutral0)`,
          neutral5: `var(--rs-neutral5)`,
          neutral10: `var(--rs-neutral10)`,
          neutral20: `var(--rs-neutral20)`,
          neutral30: `var(--rs-neutral30)`,
          neutral40: `var(--rs-neutral40)`,
          neutral50: `var(--rs-neutral50)`,
          neutral60: `var(--rs-neutral60)`,
          neutral70: `var(--rs-neutral70)`,
          neutral80: `var(--rs-neutral80)`,
          neutral90: `var(--rs-neutral90)`,
        },
      })}
    />
  );
}
