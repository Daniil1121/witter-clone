import { mongoose } from "../core/db";

export const isValid = mongoose.Types.ObjectId.isValid;
