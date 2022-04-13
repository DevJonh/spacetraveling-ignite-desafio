/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Image from 'next/image';
import Link from 'next/link';

import styles from './header.module.scss';

export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image src="/images/Logo.svg" alt="logo" width={239} height={26} />
      </Link>
    </header>
  );
}
