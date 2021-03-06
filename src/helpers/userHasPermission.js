export default function userHasPermission (permissions, permission) {
  if (!Array.isArray(permissions) || !permissions.length) {
    return false
  }

  return permissions.includes(permission)
}
