import { useRouter } from 'next/router';
import { RefObject, useEffect } from 'react';

const parseBoolean = (input: string): boolean | undefined => {
  try {
    return JSON.parse(input.toLowerCase());
  } catch {
    return undefined;
  }
};

export default function useFormFill(
  form: RefObject<HTMLFormElement>,
  exclude?: string | string[],
): void {
  const router = useRouter();

  useEffect(() => {
    const setter = <T = string>(
      element: HTMLInputElement,
      property: string,
      param: T,
    ) => {
      const elementPrototype = Object.getPrototypeOf(element);

      const valueSetter = Object.getOwnPropertyDescriptor(
        element,
        property,
      )?.set;
      const pValueSetter = Object.getOwnPropertyDescriptor(
        elementPrototype,
        property,
      )?.set;

      if (valueSetter && valueSetter !== pValueSetter) {
        valueSetter?.call(element, param);
      } else {
        pValueSetter?.call(element, param);
      }
    };

    if (!form.current) {
      return;
    }

    const excludeArr = typeof exclude === `string` ? [exclude] : exclude;

    for (const el of form.current.elements) {
      const name = el.getAttribute(`name`);

      if (!name || excludeArr?.includes(name)) {
        continue;
      }

      const param = router.query[name] as string;
      const element = el as HTMLInputElement;

      if (!element || !param) {
        continue;
      }

      switch (element.type) {
        case `checkbox`:
        case `radio`:
          if (element.checked !== (parseBoolean(param) || false)) {
            element.dispatchEvent(new Event(`click`, { bubbles: true }));
          }
          break;
        default:
          setter(element, `value`, param);
          element.dispatchEvent(new Event(`change`, { bubbles: true }));
          break;
      }
    }

    form.current.dispatchEvent(
      new Event(`submit`, { cancelable: true, bubbles: true }),
    );
  }, [router.query, form, exclude]);
}
