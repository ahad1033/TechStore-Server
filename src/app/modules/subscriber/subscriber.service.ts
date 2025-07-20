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

const deleteSubscriber = async (id: string) => {
  try {
    const deletedSubscriber = await Subscriber.findByIdAndDelete(id);

    return deletedSubscriber;
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("Failed to delete subscriber: Unknown error");
  }
};

const updateSubscriberStatus = async (
  id: string,
  data: Partial<ISubscriber>
) => {
  try {
    return await Subscriber.findByIdAndUpdate(
      id,
      { status: data.status },
      {
        new: true,
        runValidators: true,
      }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to update status: Unknown error");
  }
};

export const SubscriberServices = {
  createSubscriber,
  deleteSubscriber,
  getAllSubscribers,
  updateSubscriberStatus,
};
