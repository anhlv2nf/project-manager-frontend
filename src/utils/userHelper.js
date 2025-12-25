import { USER_ROLES } from '../constants/userConstants';

/**
 * Filter and format users for selection, excluding admins and already assigned users
 * @param {Array} allUsers - All users from API
 * @param {Array} assignedUserIds - List of IDs of users already in the project/list
 * @returns {Array} List of options for BaseSelect { value, label }
 */
export const getAvailableUserOptions = (allUsers = [], assignedUserIds = []) => {
    return allUsers
        .filter(u => u.role !== USER_ROLES.ADMIN && !assignedUserIds.includes(u.id))
        .map(user => ({
            value: user.id,
            label: `${user.name} (${user.email})`
        }));
};

/**
 * Format project member roles for Select options
 * @param {Object} projectRoles - Constant object containing roles
 * @param {Object} roleLabels - Constant object containing labels
 * @returns {Array} List of options { value, label }
 */
export const getProjectRoleOptions = (projectRoles, roleLabels) => {
    return Object.entries(projectRoles).map(([key, value]) => ({
        value: value,
        label: roleLabels[value] || value
    }));
};
