import dbConnect from "../../../utils/dbConnect";
import Post from "../../../models/Post";

export default async function handler(req, res) {
  await dbConnect();
  const post = new Post({
    title: req.body.articleNameCs,
    slug: req.body.slug,
    textCs: req.body.contentCs,
    textEn: req.body.contentEn,
    category: req.body.category,
    date: new Date(),
  });
  post.save();
  res.json(post);
}
