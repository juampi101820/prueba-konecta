// se debe entregar un arreglo de roles permitidos, ejemplo: ['ADMINISTRADOR', 'EMPLEADO']
const authorizeRoles = (rolesPermitidos = []) => (req, res, next) => {
  if (!req.user || !req.user.roles) {
    return res.status(401).json({ mensaje: 'No autenticado' });
  }
  const tieneRol = req.user.roles.some(rol => rolesPermitidos.includes(rol));
  if (!tieneRol) {
    return res.status(403).json({ mensaje: 'No tiene permisos para esta accion' });
  }
  next();
};

module.exports = authorizeRoles;
