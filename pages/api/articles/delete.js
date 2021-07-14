import dbConnect from "../../../utils/dbConnect";
import Post from "../../../models/Post";

export default async function handler(req, res) {
  await dbConnect();
  console.log(req.body);
  Post.findByIdAndDelete(req.body, function (err, post) {
    if (err) {
      console.log(err);
    } else {
      console.log(post);
      res.json(post);
    }
  });
}
