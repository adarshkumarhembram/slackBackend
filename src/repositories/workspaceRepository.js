import Workspace from '../schema/workspace.js';
import crudRepository from './crudRepository.js';
import ClientError from '../utils/errors/client-error.js'; // Update path as needed
import { StatusCodes } from 'http-status-codes'; // Ensure it's installed
import User from '../schema/user.js'; // Assuming you have this schema

const workspaceRepository = {
  ...crudRepository(Workspace),

  getWorkspaceByName: async function (workspaceName) {
    const workspace = await Workspace.findOne({ name: workspaceName });

    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND,
      });
    }

    return workspace;
  },

  getWorkspaceByJoinCode: async function (joinCode) {
    const workspace = await Workspace.findOne({ joinCode });

    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND,
      });
    }

    return workspace;
  },

  addMemberToWorkspace: async function (workspaceId, memberId, role) {
    const workspace = await Workspace.findById(workspaceId);

    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND,
      });
    }

    const isValidUser = await User.findById(memberId);
    if (!isValidUser) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'User not found',
        statusCode: StatusCodes.NOT_FOUND,
      });
    }

    const isMemberAlreadyPartOfWorkspace = workspace.members.find(
      (member) => member.memberId == memberId
    );

    if (isMemberAlreadyPartOfWorkspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'User already part of workspace',
        statusCode: StatusCodes.FORBIDDEN,
      });
    }

    workspace.members.push({ memberId, role });

    await workspace.save();

    return workspace;
  },

  addChannelToWorkspace: async function () {
    // To be implemented
  },

  fetchAllWorkspaceByMemberId: async function () {
    // To be implemented
  }
};

export default workspaceRepository;
