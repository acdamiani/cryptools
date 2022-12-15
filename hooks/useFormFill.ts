import { useRouter } from 'next/router';
import { RefObject, useEffect } from 'react';

export default function useFormFill(
  form: RefObject<HTMLFormElement>,
  param: string | string[] = `input`,
): void {
  const router = useRouter();

  useEffect(() => {
    const paramArr: string[] = typeof param === `string` ? [param] : param;

    if (!paramArr || !form.current) {
      return;
    }

    for (const p of paramArr) {
      const param = router.query[p] as string;
      const element = form.current.elements.namedItem(p) as HTMLInputElement;

      if (!element || !param) {
        continue;
      }

      element.value = param;
      // onchange not triggered?
      element.dispatchEvent(
        new Event(`onChange`, { cancelable: true, bubbles: true }),
      );
    }

    // form.current.dispatchEvent(
    //   new Event(`submit`, { cancelable: true, bubbles: true }),
    // );
  }, [router.query, form, param]);
}
