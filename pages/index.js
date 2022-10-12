import Head from 'next/head';
import Image from 'next/image';
import s from '../styles/Home.module.scss';

export default function Home() {
  return (
    <div className={s.container}>
      <Head>
        <title>Gremblo zone</title>
        <meta name='description' content='Gremblos den' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className={s.wrapper}>
        <header className={s.head}>The header</header>
        <nav className={s.nav}>
          <ul>
            <li>
              <a href=''>Nav 1</a>
            </li>
            <li>
              <a href=''>Nav 2</a>
            </li>
            <li>
              <a href=''>Nav 3</a>
            </li>
          </ul>
        </nav>
        <article className={s.content}>
          <h1>Main article area</h1>
          <p>
            In this layout, we display the areas in source order for any screen
            less that 500 pixels wide. We go to a two column layout, and then to
            a three column layout by redefining the grid, and the placement of
            items on the grid.
          </p>
        </article>
        <aside className={s.sidebar}>Sidebar</aside>
        <div className={s.adverts}>Advertising</div>
        <footer className={s.footer}>Gooter</footer>
      </div>
    </div>
  );
}
