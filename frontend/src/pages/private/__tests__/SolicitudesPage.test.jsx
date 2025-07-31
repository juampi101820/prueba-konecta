import { render, screen } from '@testing-library/react';
import SolicitudesPage from '../SolicitudesPage';
import { vi } from 'vitest';

// Mock del hook personalizado
vi.mock('../../../hooks/useTablaPaginada', () => ({
  useTablaPaginada: () => ({
    data: [
      {
        id: 1,
        tipo: 'VACACIONES',
        fecha: '2023-06-15',
        descripcion: 'Vacaciones anuales',
        Empleado: {
          nombre: 'Carlos Gómez',
        },
      },
    ],
    pagina: 1,
    limite: 10,
    total: 1,
    loading: false,
    setPagina: vi.fn(),
    setFiltros: vi.fn(),
    filtros: {
      tipo: '',
      nombre_empleado: '',
      fecha: '',
      fecha_inicio: '',
      fecha_fin: '',
    },
  }),
}));

describe('SolicitudesPage', () => {
  it('debe renderizar el titulo y los datos de la solicitud', () => {
    render(<SolicitudesPage />);

    expect(screen.getByText('Gestión de Solicitudes')).toBeInTheDocument();
    expect(screen.getByText('VACACIONES')).toBeInTheDocument();
    expect(screen.getByText('2023-06-15')).toBeInTheDocument();
    expect(screen.getByText('Carlos Gómez')).toBeInTheDocument();
    expect(screen.getByText('Vacaciones anuales')).toBeInTheDocument();
  });
});
