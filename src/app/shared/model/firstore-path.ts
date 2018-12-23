export function getPath(uid, projectId?, presentId?, isForm?): string {
  if (isForm && presentId && projectId)
    return `usersC/${uid}/project/${projectId}/presentation/${presentId}/form`;
  else if (presentId && projectId)
    return `usersC/${uid}/project/${projectId}/presentation`;
  else if (projectId)
    return `usersC/${uid}/project`;
  else
    return `usersC`

}

export const userCPath='usersC';
export const projectPath='project';
export const presentPath='presentation';
export const formPath='form';

