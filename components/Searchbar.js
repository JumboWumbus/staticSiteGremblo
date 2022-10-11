import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Searchbar() {
  //href={{ pathname: '/Search', query: { q: search?.toLowerCase() } }}
  const router = useRouter();
  const [search, setSearch] = useState('');
  function findSearch(value) {
    setSearch(value.target.value);
  }
  const handler = event => {
    if (event.key === 'Enter') {
      const query = search?.toLowerCase();
      router.push(`/blog/search?q=${query}`);
    }
  };
  return (
    <div>
      <input onKeyPress={e => handler(e)} onChange={findSearch} />
      <Link
        href={{ pathname: 'blog/search', query: { q: search?.toLowerCase() } }}
      >
        <a className='btn btn-primary' id='button-search'>
          Go!
        </a>
      </Link>
    </div>
  );
}
