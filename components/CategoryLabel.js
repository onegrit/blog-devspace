import Link from 'next/link'

export default function CategoryLabel({ children }) {
  const colorKey = {
    JavaScript: 'bg-orange-600',
    CSS: 'bg-red-600',
    Python: 'bg-amber-600',
    PHP: 'bg-lime-600',
    Ruby: 'bg-blue-600',
  }
  // const bgColor = colorKey[children]
  // console.log('background color: ', bgColor)

  return (
    <div
      className={`px-2 py-1 ${colorKey[children]} text-gray-100 font-bold rounded  `}
    >
      {/* <Link href={`/blog/category/${children.toLowerCase()}`}>{children}</Link> */}
      <Link
        href={{
          pathname: '/blog/category/[category_name]',
          query: { category_name: children.toLowerCase() },
        }}
      >
        {children}
      </Link>
    </div>
  )
}
