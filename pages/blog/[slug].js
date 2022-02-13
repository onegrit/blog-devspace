import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

export default function PostPage({ frontmatter, content, slug }) {
  console.log('frontmatter:', frontmatter)
  console.log('content: ', content)
  console.log('slug: ', content)

  return <div></div>
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))
  const paths = files.map((filename) => ({
    params: { slug: filename.replace('.md', '') },
  }))

  // console.log(paths)

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.md'),
    'utf-8'
  )
  const { data: frontmatter, content } = matter(markdownWithMeta)
  return {
    props: { frontmatter, content, slug },
  }
}
