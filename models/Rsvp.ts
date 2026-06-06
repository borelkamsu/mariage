import { Schema, model, models } from "mongoose";

const RsvpSchema = new Schema(
  {
    guestName: { type: String, required: true, trim: true, maxlength: 120 },
    attending: { type: Boolean, required: true },
    companions: {
      type: [{ type: String, trim: true, maxlength: 120 }],
      default: [],
    },
  },
  { timestamps: true }
);

export const Rsvp = models.Rsvp || model("Rsvp", RsvpSchema);
