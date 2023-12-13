import {useEffect, useRef, useState} from 'react';

interface useDataFetchProps {
  API_URL: string;
}

interface useDataFetchResult<T> {
  fetchData: T | null;
  error: string | null;
  isLoading: boolean;
  controller: AbortController | null;
  handleCancelRequest: () => void;
}

/* hacer peticiones fetch con un manejo de cancelación de peticiones ya sea con una función como handleCancelRequest o sino también de forma automática cuando se destruya o desmonte el componente */
export const useDataFetch = <T>({
  API_URL,
}: useDataFetchProps): useDataFetchResult<T> => {
  const [fetchData, setFetchData] = useState<T | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isMountedRef = useRef(true);
  const controllerRef = useRef<AbortController | null>(null); // se crea esta referencia para que se pueda manejar dentro del useEffect() y también en la función handleCancelRequest

  const handleCancelRequest = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
      setFetchError('Request Cancelled');
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    controllerRef.current = abortController;

    setIsLoading(true); // asegurarnos de que al principio el isLoading esté en true aunque su valor inicial ya sea true, pero no está de más asegurase por si se recarga la aplicación o se lanza un efecto secundario o cualquier cosa entonces setearlo a true desde un inicio

    const getFetchData = async (url: string) => {
      try {
        const response = await fetch(url, {
          /* con el signial es como si le pusiéramos un restreador a la petición y que podamos controlar ciertos aspectos de la petición */
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error('Error en la petición');
        }

        const data: T = await response.json();

        if (isMountedRef.current) {
          setFetchData(data);
        }
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            console.log('Request Cancelled');
            setFetchError('Request Cancelled');
          } else {
            setFetchError(error.message || 'Error in the request');
          }
        }
      } finally {
        /* en el .finally() nos aseguramos de que al final de que se resuelvan las promesas sí o sí se cambie el isLoading a false o el código que se quiera adicionar independientemente si el resultado de la promesa fue positivo o negativo */
        setIsLoading(false);
      }
    };

    getFetchData(API_URL);

    return () => {
      abortController.abort();
      isMountedRef.current = false;
    };
  }, [API_URL]);

  return {
    fetchData,
    error: fetchError,
    isLoading,
    controller: controllerRef.current,
    handleCancelRequest,
  };
};
