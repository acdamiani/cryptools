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
      transition: `background-color 0.5s ease`,
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
      color: `var(--ct-c-gray)`,
    }),
    input: (provided) => ({
      ...provided,
      padding: `0`,
      margin: `0`,
      transition: `color 0.5s ease`,
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: `5px`,
      border: `1px solid var(--ct-c-border)`,
      width: `fit-content`,
      transition: `border 0.5s ease`,
    }),
    menuList: (provided) => ({
      ...provided,
      padding: `0.5rem`,
    }),
    option: (provided, state) => ({
      ...provided,
      borderRadius: `5px`,
      backgroundColor: state.isFocused ? `var(--ct-c-primary)` : `transparent`,
      color: `var(--ct-c-font)`,
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
          primary: `var(--ct-c-primary)`,
          primary25: `var(--ct-c-gray)`,
          primary50: `var(--ct-c-primary)`,
          primary75: `var(--ct-c-primary)`,

          danger: `#DE350B`,
          dangerLight: `#FFBDAD`,

          neutral0: `var(--ct-c-bg)`,
          neutral5: `var(--ct-c-bg)`,
          neutral10: `var(--ct-c-border)`,
          neutral20: `var(--ct-c-border)`,
          neutral30: `var(--ct-c-border)`,
          neutral40: `var(--ct-c-border)`,
          neutral50: `var(--ct-c-border)`,
          neutral60: `var(--ct-c-border)`,
          neutral70: `var(--ct-c-border)`,
          neutral80: `var(--ct-c-font)`,
          neutral90: `var(--ct-c-border)`,
        },
      })}
    />
  );
}
