import dbConnect from "../../utils/dbConnect";
import Post from "../../models/Post";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "GET") {
    const page = req.query.page || 1;
    const limit = 9;
    const skip = limit * (page - 1);
    const articles = await Post.find({}).limit(limit).skip(skip);
    const count = await Post.countDocuments({});
    const pages = Math.ceil(count / limit);
    const obj = {
      meta: {
        pagination: {
          total: count,
          pages: pages,
          page: page,
          limit: limit,
        },
      },
      articles: articles,
    };
    res.json(obj);
  } else {
    const posts = await Post.find();
    const post = new Post({
      title: req.body.title,
      slug: req.body.slug,
      textCs: req.body.textCs,
      textEn: req.body.textEn,
    });
    post.save(function (err) {
      if (err) return handleError(err);
      posts.comments.push(post);
      posts.save();
    });
    res.json(post);
  }
}
