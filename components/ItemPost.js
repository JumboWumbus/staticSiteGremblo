import Link from 'next/link';
import SITE_URL from '../config';

export default function ItemPost({ post: { post } }) {
  // const imageUrl= process.env.SITE_URL + post.images[0]

  // console.log(imageUrl,' imageUrl ')

  const date = new Date(post.date);

  return (
    <div className='card mb-4'>
      <a href={`/blog/post/${post.slug}.html`}>
        {' '}
        <img
          className='card-img-top'
          src={`${SITE_URL}${post.images[0]}`}
          alt={post.title}
        />
      </a>
      <div className='card-body'>
        <div className='small text-muted'>{`${
          date.getMonth() + 1
        } - ${date.getDate()} - ${date.getFullYear()}`}</div>
        <h2 className='card-title'>{post.title}</h2>
        <p className='card-text'>{post.summary}</p>
        <Link href={`/blog/post/${post.slug}.html`}>
          <a className='btn'>Read More</a>
        </Link>
      </div>
    </div>
  );
}
