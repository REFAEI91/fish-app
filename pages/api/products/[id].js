import dbConnect from "../../../db/connect";
import Product from "../../../db/models/Product";

export default async function handler(request, response) {
  try {
    await dbConnect();
    const { id } = request.query;

    if (request.method === "GET") {
      const product = await Product.findById(id).populate("reviews");

      if (!product) {
        return response.status(404).json({ status: "Not Found" });
      }
      return response.status(200).json(product);
    }
    if (request.method === "PUT") {
      const product = await Product.findByIdAndDelete(id, {
        $set: request.body,
      });
      return response
        .status(200)
        .json({ status: "Product successfully updated." });
    }
    if (request.method === "DELETE") {
      const product = await Product.findByIdAndDelete(id);
      return response
        .status(200)
        .json({ status: "Product successfully deleted." });
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
}
