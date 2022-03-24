/* eslint-disable @typescript-eslint/explicit-function-return-type */
// import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { Header } from '../components/Header';

// import { getPrismicClient } from '../services/prismic';

// import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

/* interface HomeProps {
  postsPagination: PostPagination;
} */

export default function Home() {
  return (
    <>
      <Head>
        <title>Spacetraveling</title>
      </Head>
      <main className={styles.container}>
        <Header />

        <article className={styles.containerContent}>
          <ul>
            <li>
              <Link href="/">
                <a>
                  <h3>Como utilizar Hooks</h3>
                  <span>
                    Pensando em sincronização em vez de ciclos de vida
                  </span>
                  <div className={styles.info}>
                    <p>
                      <FiCalendar /> <time>15 Mar 2021</time>
                    </p>

                    <p>
                      <FiUser /> <p>Joseph Oliveira</p>
                    </p>
                  </div>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>
                  <h3>Criando um app CRA do zero</h3>
                  <span>
                    Tudo sobre como criar a sua primeira aplicação utilizando
                    Create React App
                  </span>
                  <div className={styles.info}>
                    <p>
                      <FiCalendar /> <time>19 Abr 2021</time>
                    </p>

                    <p>
                      <FiUser /> <p>Danilo Vieira</p>
                    </p>
                  </div>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>
                  <h3>Como utilizar Hooks</h3>
                  <span>
                    Pensando em sincronização em vez de ciclos de vida
                  </span>
                  <div className={styles.info}>
                    <p>
                      <FiCalendar /> <time>15 Mar 2021</time>
                    </p>

                    <p>
                      <FiUser /> <p>Joseph Oliveira</p>
                    </p>
                  </div>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>
                  <h3>Criando um app CRA do zero</h3>
                  <span>
                    Tudo sobre como criar a sua primeira aplicação utilizando
                    Create React App
                  </span>
                  <div className={styles.info}>
                    <p>
                      <FiCalendar /> <time>19 Abr 2021</time>
                    </p>

                    <p>
                      <FiUser /> <p>Danilo Vieira</p>
                    </p>
                  </div>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>
                  <h3>Como utilizar Hooks</h3>
                  <span>
                    Pensando em sincronização em vez de ciclos de vida
                  </span>
                  <div className={styles.info}>
                    <p>
                      <FiCalendar /> <time>15 Mar 2021</time>
                    </p>

                    <p>
                      <FiUser /> <p>Joseph Oliveira</p>
                    </p>
                  </div>
                </a>
              </Link>
            </li>
          </ul>
        </article>
        <button type="button" className={styles.button}>
          Carregar mais posts
        </button>
      </main>
    </>
  );
}

/* export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query();

  return {
    props: {},
  };
};
*/
