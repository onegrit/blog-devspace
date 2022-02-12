import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import Layout from '../../components/Layout'

export default function BlogPage({ posts }) {
  console.log('BlogPage: ', posts)
  return <Layout></Layout>
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('posts'))
  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '')
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    )
    const { data: frontmatter } = matter(markdownWithMeta)
    return { slug, frontmatter }
  })

  // console.log(posts)
  return {
    props: { posts },
  }
}
