/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prefer-const */
/* eslint-disable react/no-danger */
import { format } from 'date-fns';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { RichText } from 'prismic-dom';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import Prismic from '@prismicio/client';
import { useRouter } from 'next/router';
import ptBR from 'date-fns/locale/pt-BR';
import { Header } from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

import styles from './post.module.scss';
import commons from '../../styles/common.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
      dimensions: { width: number; height: number };
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  let totalString = 0;

  post.data.content.forEach(context =>
    context.body.forEach(current => {
      totalString += current.text.split(' ').length;
    })
  ); // quantidade de palavras do texto vezes os segundos divido pela quantidade de palavras média que uma pessoa lê em 1 minuto

  const timeRead = Math.ceil((totalString * 60) / 200 / 60);
  const router = useRouter();

  if (router.isFallback) {
    return <p>Carregando...</p>;
  }
  return (
    <>
      <Head>
        <title>{post.data.title}</title>
      </Head>
      <header className={commons.headerContainer}>
        <Header />
      </header>
      <section className={styles.banner}>
        <Image src={post.data.banner.url} alt={post.data.title} layout="fill" />
      </section>
      <main className={`${commons.container} ${styles.container}`}>
        <article>
          <h1>{post.data.title}</h1>
          <div className={styles.information}>
            <p>
              <FiCalendar />
              <time>
                {format(new Date(post.first_publication_date), 'dd MMM yyyy', {
                  locale: ptBR,
                })}
              </time>
            </p>
            <p>
              <FiUser />
              {post.data.author}
            </p>

            <p>
              <FiClock />
              {timeRead} min
            </p>
          </div>

          {post.data.content.map(item => (
            <div className={styles.content} key={item.heading}>
              <h2>{item.heading}</h2>
              <div
                dangerouslySetInnerHTML={{ __html: RichText.asHtml(item.body) }}
              />
            </div>
          ))}
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      pageSize: 5,
    }
  );

  const paths = posts.results.map(post => ({
    params: {
      slug: post.uid,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params;
  const prismic = getPrismicClient();
  const response = await prismic
    .getByUID('posts', String(slug), {})
    .then(res => res);

  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      banner: response.data.banner,
      author: response.data.author,
      content: response.data.content,
    },
  };

  return {
    props: {
      post,
    },
  };
};
