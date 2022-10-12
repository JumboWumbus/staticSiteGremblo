import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { sortByDate } from '../../utils';
import Post from '../../components/Post';
import Searchbar from '../../components/Searchbar';
import s from '../../styles/Blog.module.scss';

export default function BlogHome({ posts }) {
  return (
    <div>
      {/*Banner or hero here*/}
      <div className='container'>
        <div className='row'>
          <div className={s.postContainer}>
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>
          {/*Sidebar menu here*/}
          <Searchbar />
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  // Get files from the posts dir
  const files = fs.readdirSync(path.join('posts'));

  // Get slug and frontmatter from posts
  const tempPosts = files.map(filename => {
    // Create slug
    const slug = filename.replace('.md', '');

    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    if (frontmatter.draft === false) {
      return {
        slug,
        frontmatter
      };
    } else {
      return null;
    }
  });

  //  remove null in tempPosts
  const posts = tempPosts.filter(post => {
    return post && post;
  });
  const jsonString = JSON.stringify(posts);
  fs.writeFileSync('./search.json', jsonString, err => {
    if (err) {
      console.log('Error writing file', err);
    } else {
      console.log('Successfully wrote file');
    }
  });

  return {
    props: {
      posts: posts.sort(sortByDate)
    }
  };
}
