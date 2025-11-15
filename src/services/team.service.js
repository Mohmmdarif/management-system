import { TeamRepository } from "../repositories/team.repository.js";
import { CustomError } from "../utils/customError.js";

export const TeamService = {
  createTeam: async (userId, name, description) => {
    const team = await TeamRepository.Create({
      name,
      description,
      ownerId: userId,
    });
    return team;
  },

  getMyTeams: async (userId) => {
    const teams = await TeamRepository.GetTeamsByUser(userId);
    return teams.map((userTeam) => userTeam.team);
  },

  getTeamDetails: async (teamId) => {
    const team = await TeamRepository.GetTeamById(teamId);

    if (!team) throw new CustomError(404, "Team not found");

    return team;
  },

  updateTeam: async (teamId, userId, data) => {
    const membership = await TeamRepository.FindMembership(teamId, userId);
    if (!membership) throw new CustomError(403, "You are not a member of this team");

    if (!["OWNER", "ADMIN"].includes(membership.role)) {
      throw new CustomError(403, "You are not allowed to perform this action");
    }

    const updatedTeam = await TeamRepository.Update(teamId, data);
    return updatedTeam;
  },

  deleteTeam: async (teamId, userId) => {
    const membership = await TeamRepository.FindMembership(teamId, userId);
    if (!membership) throw new CustomError(403, "You are not a member of this team");

    if (membership.role !== "OWNER") throw new CustomError(403, "Only the OWNER can delete the team");

    return await TeamRepository.Delete(teamId);
  },
};