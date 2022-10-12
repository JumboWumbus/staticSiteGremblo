import { remark } from 'remark';

import parse from 'remark-parse';
import { unified } from 'unified';

import remark2rehype from 'remark-rehype';

import remarkPrism from 'remark-prism';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import ID from 'remark-heading-id';

export default async function markdownToHtml(markdown) {
  const result = await unified()
    .use(parse)
    .use(remarkPrism, { plugins: ['line-numbers'] })
    .use(ID)
    .use(remark2rehype)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(markdown);

  console.log(`FUCK YOU: ${result}`);

  return result.toString();
}
