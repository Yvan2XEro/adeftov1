function isAdmin(user) {
    console.log(user?.roles.map((r) => r.name));
    if (!user) return false;
    return !!user.roles.find((role) => role.name == "administrator");
}

function isSuperAdmin(user) {
    console.log(user?.roles.map((r) => r.name));
    if (!user) return false;
    return !!user.roles.find((role) => role.name == "superadministrator");
}

export default {
    isAdmin,
    isSuperAdmin,
};
