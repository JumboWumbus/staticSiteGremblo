import Link from 'next/link';
import { slugify } from '../utils';

import s from '../styles/Post.module.scss';

export default function Post({ post }) {
  const date = new Date(post.frontmatter.date);
  console.log(`INSIDE POST IMAGE = ${post.frontmatter.image}`);
  console.log(`READ TIME = ${post.frontmatter.readTime}`);
  return (
    <div className={s.postContainer}>
      <a href={`/blog/post/${post.frontmatter.slug}.html`}>
        {' '}
        <img src={post.frontmatter.image} alt='...' />
      </a>
      <div className={s.cardBody}>
        <h2 className={s.title}>{post.frontmatter.title}</h2>

        <p className={s.summary}>{post.frontmatter.summary}</p>
        <div className={s.tagContainer}>
          {' '}
          {post.frontmatter.categories.map(category => {
            const slug = slugify(category);

            return (
              <Link key={category} href={`/blog/category/${slug}.html`}>
                <a className='btn'>
                  <h5 className={s.tag}>{category}</h5>
                </a>
              </Link>
            );
          })}{' '}
        </div>
        <div className={s.cardFooter}>
          <ul>
            <li className={s.postDate}>
              {`${date.getDate()} - ${
                date.getMonth() + 1
              } - ${date.getFullYear()}`}
            </li>
            <li>{`${post.frontmatter.readTime} read`}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
