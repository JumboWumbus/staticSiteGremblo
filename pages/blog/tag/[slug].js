import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ItemPost from '../../../components/ItemPost';
import { slugify } from '../../../utils';

export default function tag({ posts }) {
  return (
    <div className='container my-3'>
      <div className='row'>
        <div className='col-lg-10 post-date m-1 p-2m-auto'>
          {posts.map((post, index) => {
            return <ItemPost key={index} post={post} />;
          })}
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  // get all posts form posts
  const files = fs.readdirSync(path.join('posts'));
  let tempStorage = [];
  // get posts slug and meta data
  const temppaths = files.map(filename => {
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    );
    // get frontmatter data form posts
    const { data: frontmatter } = matter(markdownWithMeta);
    // get publish post
    if (frontmatter.draft === false) {
      frontmatter.tags.map(tag => {
        // convert into slug
        let slug = slugify(tag);
        tempStorage.push({ params: { slug } });
      });
    } else {
      return null;
    }
  });
  // filter posts
  const paths = tempStorage.filter((item, index) => {
    return tempStorage.indexOf(item) === index;
  });

  return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug } }) {
  // Get files from the posts dir
  const files = fs.readdirSync(path.join('posts'));
  let tempStorage = [];
  // Get slug and frontmatter from posts
  const tempPosts = files.map(filename => {
    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    );
    const { data: frontmatter } = matter(markdownWithMeta);
    if (frontmatter.draft === false) {
      frontmatter.tags.map(tag => {
        let tagSlug = slugify(tag);
        if (slug === tagSlug) {
          tempStorage.push({ post: frontmatter });
        }
      });
    } else {
      return null;
    }
  });
  //  remove null in tempPosts
  const posts = tempStorage.filter(post => {
    return post && post;
  });
  return { props: { posts } };
}
