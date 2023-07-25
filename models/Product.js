const { Schema, model, Types } = require("mongoose");

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 100,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    image: {
      type: String,
      default: "/uploads/example.org",
    },
    category: {
      type: String,
      required: true,
      enum: ["office", "kitchen", "bedroom"],
    },
    company: {
      type: String,
      required: true,
      enum: {
        values: ["ikea", "liddy", "marcos"],
        message: `{VALUE} is not supported`,
      },
    },
    colors: {
      type: [String],
      default: ["#222"],
      required: true,
    },
    featured: {
      type: Boolean,
      required: false,
    },
    freeShipping: {
      type: Boolean,
      required: false,
    },
    inventory: {
      type: Number,
      required: true,
      default: 15,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ProductSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
});

ProductSchema.pre("remove", async function () {
  await this.model("Review").deleteMany({
    product: this._id,
  });
});

module.exports = model("Product", ProductSchema);
