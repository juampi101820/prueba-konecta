import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";

export const useTablaPaginada = (fetchFunction, filtrosIniciales = {}) => {
  const [data, setData] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [limite, setLimite] = useState(10);
  const [total, setTotal] = useState(0);
  const [filtros, setFiltros] = useState(filtrosIniciales);
  const [loading, setLoading] = useState(true);

  // Debounce para evitar multiples llamadas
  const debouncedFiltros = useDebounce(filtros, 400);

  const fetchData = async () => {
    try {
      setLoading(true);
      const respuesta = await fetchFunction({ pagina, limite, ...debouncedFiltros });
      setData(respuesta.data);
      setTotal(respuesta.total);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pagina, limite, debouncedFiltros]);

  return {
    data,
    pagina,
    limite,
    total,
    loading,
    setPagina,
    setLimite,
    filtros,
    setFiltros,
    refetch: fetchData,
  };
};
