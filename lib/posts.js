import path from 'path'
import fs from 'fs'
import { sortByDate } from '../utils'
import matter from 'gray-matter'

const files = fs.readdirSync(path.join('posts'))

export const getPosts = () => {
  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '')
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    )
    const { data: frontmatter } = matter(markdownWithMeta)
    return { slug, frontmatter }
  })

  return posts.sort(sortByDate)
}
