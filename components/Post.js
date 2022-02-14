import Image from 'next/image'
import Link from 'next/link'
import CategoryLabel from './CategoryLabel'

/**
 * compact: 此组件再blog及搜索结果页面中重用，使用compace控制搜索组件中显示紧凑信息
 * @param {compact} boolean
 * @returns
 */
export default function Post({ post, compact }) {
  return (
    <div className='w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6'>
      {!compact && (
        <Image
          src={post.frontmatter.cover_image}
          alt=''
          height={420}
          width={600}
          className='mb-4 rounded'
        />
      )}

      <div className='flex justify-between items-center'>
        <span className='font-light text-gray-600'>
          {post.frontmatter.date}
        </span>
        <CategoryLabel>{post.frontmatter.category}</CategoryLabel>
      </div>

      <div className='mt-2'>
        {/* <Link href={`/blog/${post.slug}`}> */}
        <Link href={{ pathname: '/blog/[slug]', query: { slug: post.slug } }}>
          <a className='text-gray-700 text-2xl font-bold'>
            {post.frontmatter.title}
          </a>
        </Link>
        <p className='mt-2 text-gray-600'>{post.frontmatter.excerpt}</p>
      </div>

      {!compact && (
        <div className='flex justify-between items-center mt-6'>
          {/* <Link href={`/blog/${post.slug}`}> */}
          <Link href={{ pathname: '/blog/[slug]', query: { slug: post.slug } }}>
            <a className='text-gray-900 hover:text-blue-600'>Read More</a>
          </Link>
          <div className='flex items-center'>
            <img
              src={post.frontmatter.author_image}
              className='mx-4 w-10 h-10 object-cover rounded-full hidden sm:block'
              alt=''
            />
            <h3 className='text-gray-700 font-bold'>
              {post.frontmatter.author}
            </h3>
          </div>
        </div>
      )}
    </div>
  )
}
