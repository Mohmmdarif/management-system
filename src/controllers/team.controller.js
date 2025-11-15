import * as Yup from 'yup';
import { CustomError } from '../utils/customError.js';
import { TeamService } from '../services/team.service.js';
import { CreateTeamSchema } from '../utils/validations/team.validation.js';


export const TeamController = {
  createTeam: async (req, res, _next) => {
    try {
      const { name, description } = req.body;

      await CreateTeamSchema.validate(req.body, {
        abortEarly: false,
      });

      const team = await TeamService.createTeam(req.user.id, name, description);

      res.status(201).json({
        success: true,
        message: "Team successfully created",
        data: team,
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        _next(new CustomError(400, "Validation failed!", error.errors));
      }
      _next(error);
    }
  },

  getMyTeams: async (req, res, _next) => {
    try {
      const teams = await TeamService.getMyTeams(req.user.id);

      res.status(200).json({
        success: true,
        message: "Teams retrieved successfully",
        data: teams,
      });
    } catch (error) {
      _next(error);
    }
  },

  getTeamDetails: async (req, res, _next) => {
    try {
      const { teamId } = req.params;
      const team = await TeamService.getTeamDetails(teamId);

      res.status(200).json({
        success: true,
        message: "Team details retrieved successfully",
        data: team,
      });
    } catch (error) {
      _next(error);
    }
  },

  updateTeam: async (req, res, _next) => {
    try {
      const { teamId } = req.params;
      const { userId } = req.user;

      const updatedTeam = await TeamService.updateTeam(teamId, userId, req.body);

      res.status(200).json({
        success: true,
        message: "Team updated successfully",
        data: updatedTeam,
      });
    } catch (error) {
      _next(error);
    }
  },

  deleteTeam: async (req, res, _next) => {
    try {
      const { teamId } = req.params;

      const deletedTeam = await TeamService.deleteTeam(teamId);

      res.status(200).json({
        success: true,
        message: "Team deleted successfully",
        data: deletedTeam,
      });

    } catch (error) {
      _next(error);
    }
  },
};