export const roles = [
  {
    id: 1,
    name: "reader",
    description: "Reader role",
  },
  {
    id: 2,
    name: "author",
    description: "Author role",
  },
  {
    id: 3,
    name: "admin",
    description: "Admin role",
  },
]

const roleAccessRessource = {
  admin: {
    posts: {
      own: ["create", "read", "update", "delete"],
      other: ["create", "read", "update", "delete"],
    },
    users: {
      own: ["create", "read", "update", "delete"],
      other: ["create", "read", "update", "delete"],
    },
    comments: {
      own: ["create", "read", "update", "delete"],
      other: ["create", "read", "update", "delete"],
    },
  },
  author: {
    posts: {
      own: ["create", "read", "update", "delete"],
      other: ["create", "read", "update", "delete"],
    },
    users: {
      own: ["create", "read", "update", "delete"],
      other: [],
    },
    comments: {
      own: ["create", "read", "update", "delete"],
      other: ["create", "read", "update", "delete"],
    },
  },
  reader: {
    posts: {
      own: ["read"],
      other: ["read"],
    },
    users: {
      own: ["read"],
      other: [],
    },
    comments: {
      own: ["create", "read", "update", "delete"],
      other: ["read"],
    },
  },
}

export const isGranted = (role, ressource, action, who) => {
  if (roleAccessRessource[role] === undefined) {
    return false
  }

  if (roleAccessRessource[role][ressource] === undefined) {
    return false
  }

  if (roleAccessRessource[role][ressource][who] === undefined) {
    return false
  }

  if (roleAccessRessource[role][ressource][who].includes(action)) {
    return true
  }
  return false
}
