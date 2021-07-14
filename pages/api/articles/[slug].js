import dbConnect from "../../../utils/dbConnect";
import Post from "../../../models/Post";
import Comment from "../../../models/Comment";
import User from "../../../models/User";
import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "GET") {
    const page = parseInt(req.query.page) || 1;
    const limit = 7;
    const skip = limit * (page - 1);
    const slug = req.query.slug;
    const article = await Post.findOne({ slug: slug }).populate({
      path: "comments",
      model: "Comment",
      populate: {
        path: "author",
        model: "User",
      },
    });
    const count = article.comments.length;
    const sorted = article.comments.sort((a, b) => b.date - a.date);
    const sliced = sorted.slice(skip, skip + 6);
    const pages = Math.ceil(count / limit);
    const obj = {
      article: {
        id: article._id,
        title: article.title,
        slug: article.slug,
        textCs: article.textCs,
        textEn: article.textEn,
        category: article.category,
        date: article.date,
      },
      comments: {
        content: sliced,
        pagination: {
          total: count,
          pages: pages,
          page: page,
          limit: limit,
        },
      },
    };
    res.json(obj);
  } else {
    const session = await getSession({ req });
    const slug = req.query.slug;
    const message = req.body.message;
    const comment = await new Comment({
      author: session.id,
      text: message,
    });
    await comment.save().then(async (savedComment) => {
      const post = await Post.findOne({ slug: slug });
      post.comments.push(savedComment);
      await post.save();
    });
    res.send();
  }
}
