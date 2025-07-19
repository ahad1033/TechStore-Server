import { Subscriber } from "./subscriber.model";
import { ISubscriber } from "./subscriber.interface";

type TSubscriberQuery = {
  search?: string;
  page: number;
  limit: number;
};

const createSubscriber = async (data: ISubscriber) => {
  try {
    const existingSubscriber = await Subscriber.findOne({ email: data.email });

    if (existingSubscriber) {
      throw new Error("This email is already subscribed.");
    }

    const newSubscriber = new Subscriber(data);

    return await newSubscriber.save();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to add subscriber");
  }
};

const getAllSubscribers = async (filters: TSubscriberQuery) => {
  const { search, page, limit } = filters;

  const filter: any = {};

  if (search) {
    filter.email = { $regex: search, $options: "i" };
  }

  const skip = (page - 1) * limit;

  try {
    const [data, total] = await Promise.all([
      Subscriber.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Subscriber.countDocuments(filter),
    ]);

    return {
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      data,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to retrieve subscribers: Unknown error");
  }
};

export const SubscriberServices = {
  createSubscriber,
  getAllSubscribers,
};
