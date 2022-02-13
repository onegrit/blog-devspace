import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'
import path from 'path'
import Layout from '../../../components/Layout'
import Post from '../../../components/Post'
import { sortByDate } from '../../../utils/index'
import { POSTS_PER_PAGE } from '../../../config/index'
import Pagination from '../../../components/Pagination'

export default function BlogPage({ posts, numPages, currentPage }) {
  // console.log('BlogPage: ', posts)
  return (
    <Layout>
      <h1 className='text-5xl border-b-4 '>Latest Posts</h1>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {posts.map((post, idx) => (
          <Post post={post} key={idx} />
        ))}
      </div>
      <Pagination currentPage={currentPage} numPages={numPages} />
    </Layout>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))
  const numPages = Math.ceil(files.length / POSTS_PER_PAGE)

  let paths = []

  for (let i = 0; i <= numPages; i++) {
    paths.push({
      params: { page_index: i.toString() },
    })
  }

  // console.log('paths: ', paths)

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const page = parseInt((params && params.page_index) || 1)

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

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE)
  const pageIndex = page - 1
  const orderedPosts = posts
    .sort(sortByDate)
    .slice(pageIndex * POSTS_PER_PAGE, (pageIndex + 1) * POSTS_PER_PAGE)
  // console.log(posts)
  return {
    props: { posts: orderedPosts, numPages, currentPage: page },
  }
}
