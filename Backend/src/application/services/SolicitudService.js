const SolicitudRepository = require('../../infrastructure/repository/SolicitudRepository');

class SolicitudService {
    static async listar({ pagina = 1, limite = 20, filtros = {} } = {}) {
        const offset = (pagina - 1) * limite;
        const { rows, count } = await SolicitudRepository.listar({ limit: limite, offset, filtros });
        return {
            data: rows,
            pagina,
            limite,
            total: count
        };
    }

    static async crear(datos) {
        return SolicitudRepository.crear(datos);
    }

    static async eliminar(id) {
        return SolicitudRepository.eliminar(id);
    }
}

module.exports = SolicitudService;
