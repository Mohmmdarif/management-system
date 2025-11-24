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

  updateTeam: async (teamId, data) => {
    const updatedTeam = await TeamRepository.Update(teamId, data);
    return updatedTeam;
  },

  deleteTeam: async (teamId) => {
    return await TeamRepository.Delete(teamId);
  },
};