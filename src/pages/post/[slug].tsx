/* eslint-disable react/no-danger */
import { format } from 'date-fns';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { RichText } from 'prismic-dom';
import React from 'react';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
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
  const timeRead =
    (post.data.content
      .reduce((acc, current) => {
        return acc + current.body[0].text;
      }, '')
      .split(' ').length * // quantidade de palavras do texto vezes os segundos divido pela quantidade de palavras média que uma pessoa lê em 1 minuto
      60) /
    200 / // tempo em segundos
    60; // tempo em minutos

  return (
    <>
      <Head>
        <title>{post.data.title}</title>
      </Head>
      <header className={commons.headerContainer}>
        <Header />
      </header>
      <section className={styles.banner}>
        <Image
          src={post.data.banner.url}
          alt={post.data.title}
          width={post.data.banner.dimensions.width}
          height={post.data.banner.dimensions.height}
        />
      </section>
      <main className={`${commons.container} ${styles.container}`}>
        <article>
          <h1>{post.data.title}</h1>
          <div className={styles.information}>
            <time>
              <FiCalendar /> {post.first_publication_date}
            </time>
            <p>
              <FiUser />
              {post.data.author}
            </p>

            <p>
              <FiClock />
              {timeRead.toPrecision(1)} min
            </p>
          </div>

          {post.data.content.map(item => (
            <div className={styles.content} key={item.heading}>
              <h2>{item.heading}</h2>
              <div dangerouslySetInnerHTML={{ __html: item.body[0].text }} />
            </div>
          ))}
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params;
  const prismic = getPrismicClient();
  const response = prismic.getByUID('posts', String(slug));
  const dataPost = await response;

  const post = {
    first_publication_date: format(
      new Date(dataPost?.first_publication_date),
      'dd MMM YYY'
    ),
    data: {
      title: dataPost.data?.title,
      banner: {
        url: dataPost.data?.banner.url,
        dimensions: dataPost.data?.banner.dimensions,
      },
      author: dataPost.data?.author,
      content: dataPost.data?.content.map(cont => {
        return {
          heading: cont.heading,
          body: [
            {
              text: RichText.asHtml(cont.body),
            },
          ],
        };
      }),
    },
  };

  return {
    props: {
      post,
    },
  };
};
