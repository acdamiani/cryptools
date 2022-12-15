import { useRouter } from 'next/router';

export default function useParam<T = string>(name: string): T {
  const router = useRouter();
  return router.query[name] as T;
}
