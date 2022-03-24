import Image from 'next/image';
import Link from 'next/link';

import styles from './header.module.scss';

export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a>
          <Image src="/images/Logo.svg" alt="logo" width={239} height={26} />
        </a>
      </Link>
    </header>
  );
}
