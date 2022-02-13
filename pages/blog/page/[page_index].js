import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'
import path from 'path'
import Layout from '../../../components/Layout'
import Post from '../../../components/Post'
import { sortByDate } from '../../../utils/index'
import { POSTS_PER_PAGE } from '../../../config/index'

export default function BlogPage({ posts }) {
  // console.log('BlogPage: ', posts)
  return (
    <Layout>
      <h1 className='text-5xl border-b-4 '>Latest Posts</h1>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {posts.map((post, idx) => (
          <Post post={post} key={idx} />
        ))}
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))
  const numPages = Math.ceil(files.length / POSTS_PER_PAGE)

  let paths = []

  for (let i = 0; i < numPages; i++) {
    paths.push({
      params: { page_index: i.toString() },
    })
  }

  console.log('paths: ', paths)

  return {
    paths,
    fallback: false,
  }
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
    props: { posts: posts.sort(sortByDate) },
  }
}
