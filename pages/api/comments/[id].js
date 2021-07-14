import dbConnect from "../../../utils/dbConnect";
import Comment from "../../../models/Comment";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "DELETE") {
    const id = req.query.id;
    Comment.findByIdAndDelete(id).exec();
    res.json();
  }
}
