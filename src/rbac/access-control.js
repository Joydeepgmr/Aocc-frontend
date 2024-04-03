const checkPermissions = (userPermissions, allowedPermissions) => {
  if (allowedPermissions.length === 0) {
    return true;
  }

  console.log(userPermissions, allowedPermissions);

  return userPermissions.some(permission =>
    allowedPermissions.includes(permission),
  );
};

export const AccessControl = ({
  allowedPermissions,
  children,
  renderNoAccess,
  accessCheck,
  extraAccessData,
}) => {

  const token = localStorage.getItem('_tid');
  const role = localStorage.getItem('role');
  const permission = JSON.parse(localStorage.getItem('permission'));

  console.log(token);
  console.log(role);
  console.log(permission);

  let permitted;

  if (token && role && permission) {
    // when an accessCheck function is provided, ensure that passes as well as the permissions
    if (accessCheck) {
      permitted =
        accessCheck(extraAccessData, user) &&
        checkPermissions(permission, allowedPermissions);
    } else {
      // otherwise only check permissions
      permitted = checkPermissions(permission, allowedPermissions);
    }

    if (permitted) {
      return children;
    }
    return renderNoAccess();
  }
};

export default AccessControl;
