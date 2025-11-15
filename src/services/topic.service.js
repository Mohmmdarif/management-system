import { TeamRepository } from "../repositories/team.repository.js";
import { TopicRepository } from "../repositories/topic.repository.js";
import { CustomError } from "../utils/customError.js";

export const TopicService = {
  createTopic: async (userId, teamId, title) => {
    const membership = await TeamRepository.FindMembership(teamId, userId);
    if (!membership) throw new CustomError(403, "You are not a member of this team");

    if (!["OWNER", "ADMIN"].includes(membership.role)) {
      throw new CustomError(403, "You are not allowed to perform this action");
    }

    const topic = await TopicRepository.Create({
      title, teamId,
    });

    return topic;
  },
};