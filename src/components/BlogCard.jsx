function BlogCard({ image, category, title, description, author, date }) {
  return (
    <div className="flex flex-col gap-4">
      <a
        href="#"
        className="relative block h-[300px] overflow-hidden rounded-xl"
      >
        <img
          className="h-full w-full object-cover object-center transition duration-300 hover:scale-105"
          src={image}
          alt={title}
        />
      </a>

      <div className="flex flex-col">
        <div className="flex">
          <span className="mb-2 rounded-full bg-violet-100 px-3 py-1 text-sm font-semibold text-violet-700">
            {category}
          </span>
        </div>

        <a href="#">
          <h2 className="mb-2 line-clamp-2 text-start text-xl font-bold text-gray-900 hover:text-violet-600">
            {title}
          </h2>
        </a>

        <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">
          {description}
        </p>

        <div className="flex items-center text-sm text-gray-500">
          <img
            className="mr-2 h-8 w-8 rounded-full object-cover"
            src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
            alt={author}
          />
          <span>{author}</span>
          <span className="mx-2">•</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;