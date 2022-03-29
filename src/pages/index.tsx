/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { format } from 'date-fns';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { Header } from '../components/Header';
import { getPrismicClient } from '../services/prismic';

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

export default function Home({ results, next_page }: PostPagination) {
  const [posts, setPosts] = useState<Post[]>(results);
  const [nextPage, setNextPage] = useState(next_page);

  const handleLoadMorePosts = async () => {
    const data = await fetch(next_page).then(res => res.json());
    const newPosts = data.results.map(post => {
      return {
        uid: post.uid,
        first_publication_date: post.first_publication_date,
        data: {
          title: post.data.title,
          subtitle: post.data.subtitle,
          author: post.data.author,
        },
      };
    });

    setPosts([...posts, ...newPosts]);
    setNextPage(data.next_page);
  };
  return (
    <>
      <Head>
        <title>Spacetraveling</title>
      </Head>
      <main className={styles.container}>
        <Header />

        <article className={styles.containerContent}>
          <ul>
            {posts.map(post => (
              <li key={post.uid}>
                <Link href={`/post/${post.uid}`}>
                  <a>
                    <h3>{post.data.title}</h3>
                    <span>{post.data.subtitle}</span>
                    <div className={styles.info}>
                      <p>
                        <FiCalendar />{' '}
                        <time>{post.first_publication_date}</time>
                      </p>

                      <p>
                        <FiUser /> <p>{post.data.author}</p>
                      </p>
                    </div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </article>
        {nextPage && (
          <button
            type="button"
            className={styles.button}
            onClick={handleLoadMorePosts}
          >
            Carregar mais posts
          </button>
        )}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.get({ pageSize: 5 });

  const posts = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: format(
        new Date(post.first_publication_date),
        'dd MMM YYY'
      ),
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  return {
    revalidate: 60 * 60 * 24, // 24 hours
    props: { results: posts, next_page: postsResponse.next_page || '' },
  };
};
