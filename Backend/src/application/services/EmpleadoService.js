const EmpleadoRepository = require('../../infrastructure/repository/EmpleadoRepository');

class EmpleadoService {
    static async listar({ pagina = 1, limite = 20 } = {}) {
        const offset = (pagina - 1) * limite;
        const { rows, count } = await EmpleadoRepository.listarConTotal({ limit: limite, offset });
        return {
            data: rows,
            pagina,
            limite,
            total: count
        };
    }

    static async crear(datos) {
        return EmpleadoRepository.crear(datos);
    }
}

module.exports = EmpleadoService;
