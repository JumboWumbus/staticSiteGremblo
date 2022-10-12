import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/toolbar/prism-toolbar.css';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { slugify } from '../../../utils';
import Link from 'next/link';
import { marked } from 'marked';
import SITE_URL from '../../../config';
import parser from 'node-html-parser';
import { decode } from 'html-entities';

import s from '../../../styles/BlogPost.module.scss';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import markdownToHtml from '../../../lib/markdownToHtml';

export default function PostPage({ content, frontmatter, blogContent }) {
  const date = new Date(frontmatter.date);

  const doc = parser(marked.parse(content));

  const headings = [...doc.querySelectorAll('h1, h2, h3')];

  const parseHeadings = headings.map(heading => {
    return {
      title: decode(heading.innerText),
      depth: heading.rawTagName.replace(/\D/g, ''),
      id: heading.getAttribute('id')
    };
  });
  console.log(parseHeadings);

  return (
    <>
      <div className={s.container}>
        <Head>
          <title>Gremblo zone</title>
          <meta name='description' content='Gremblos den' />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <div className={s.wrapper}>
          <header className={s.head}>The header</header>
          <nav className={s.nav}>
            <ul className={s.anchorList}>
              {parseHeadings.map((h, index) => (
                <li key={index} className={h.depth}>
                  <a href={`#${h.id}`}>{h.title}</a>
                </li>
              ))}
            </ul>
          </nav>
          <article className={s.content}>
            <div className='card card-page line-numbers'>
              <a href={`/blog/post/${frontmatter.slug}.html`}>
                {' '}
                <img
                  className='card-img-top'
                  src={`${SITE_URL}${frontmatter.image}`}
                  alt={frontmatter.title}
                />
              </a>
              <h1 className='post-title mt-2 p-2'>{frontmatter.title}</h1>
              <div className='post-date m-1 p-2'>
                <div>
                  <h6>
                    {`${
                      date.getMonth() + 1
                    } - ${date.getDate()} - ${date.getFullYear()}`}{' '}
                  </h6>{' '}
                </div>
                <div>
                  {' '}
                  {frontmatter.categories.map(category => {
                    const slug = slugify(category);
                    return (
                      <Link key={category} href={`/blog/category/${slug}.html`}>
                        <a className='btn'>
                          <h6 className=' post-title'>#{category}</h6>
                        </a>
                      </Link>
                    );
                  })}{' '}
                </div>
              </div>

              <>
                <div
                  className='post-body p-5 m-auto'
                  dangerouslySetInnerHTML={{
                    __html: marked.parse(blogContent)
                  }}
                ></div>
              </>
            </div>
          </article>
          <aside className={s.sidebar}>Sidebar</aside>
          <div className={s.adverts}>Advertising</div>
          <footer className={s.footer}>Gooter</footer>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  //  Get files from the posts dir
  const files = fs.readdirSync(path.join('posts'));
  // Get slug and frontmatter from posts
  const temppaths = files.map(filename => {
    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    );
    const { data: frontmatter } = matter(markdownWithMeta);
    if (frontmatter.draft === false) {
      return {
        params: {
          slug: filename.replace('.md', '')
        }
      };
    } else {
      return null;
    }
  });
  //   remove null in tempPosts
  const paths = temppaths.filter(path => {
    return path && path;
  });
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.md'),
    'utf-8'
  );
  const { data: frontmatter, content } = matter(markdownWithMeta);

  const blogContent = await markdownToHtml(content);

  //console.log(doc);

  return {
    props: {
      frontmatter,
      slug,
      content,
      blogContent
    }
  };
}
