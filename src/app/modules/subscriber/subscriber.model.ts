import { Schema, model } from "mongoose";

const subscriberSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Add virtual 'id' field
subscriberSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

export const Subscriber = model("Subscriber", subscriberSchema);
