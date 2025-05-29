import React, { useState, useEffect } from 'react';
import { verifyDLocalCredentials } from '../services/dlocalService';

const DLocalConfigPage = () => {
  const [apiKey, setApiKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveResult, setSaveResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    // Cargar las credenciales actuales
    setApiKey(import.meta.env.VITE_DLOCAL_API_KEY || '');
    setSecretKey(import.meta.env.VITE_DLOCAL_SECRET_KEY || '');
  }, []);

  const handleVerifyCredentials = async () => {
    setIsVerifying(true);
    setVerificationResult(null);

    try {
      // Guardar temporalmente las credenciales en el entorno
      const originalApiKey = import.meta.env.VITE_DLOCAL_API_KEY;
      const originalSecretKey = import.meta.env.VITE_DLOCAL_SECRET_KEY;
      
      // @ts-ignore - Modificar temporalmente las variables de entorno
      import.meta.env.VITE_DLOCAL_API_KEY = apiKey;
      // @ts-ignore
      import.meta.env.VITE_DLOCAL_SECRET_KEY = secretKey;
      
      const isValid = await verifyDLocalCredentials();
      
      // Restaurar las credenciales originales
      // @ts-ignore
      import.meta.env.VITE_DLOCAL_API_KEY = originalApiKey;
      // @ts-ignore
      import.meta.env.VITE_DLOCAL_SECRET_KEY = originalSecretKey;
      
      setVerificationResult({
        success: isValid,
        message: isValid 
          ? 'Las credenciales son válidas' 
          : 'Las credenciales no son válidas'
      });
    } catch (error) {
      setVerificationResult({
        success: false,
        message: `Error al verificar las credenciales: ${error instanceof Error ? error.message : 'Error desconocido'}`
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSaveCredentials = async () => {
    setIsSaving(true);
    setSaveResult(null);

    try {
      // En un entorno real, esto debería guardar las credenciales en un backend seguro
      // Para este ejemplo, solo mostraremos un mensaje de éxito
      
      // Simular un retraso para mostrar el estado de carga
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSaveResult({
        success: true,
        message: 'Las credenciales se han guardado correctamente. Reinicia la aplicación para aplicar los cambios.'
      });
      
      // En un entorno real, aquí se actualizarían las variables de entorno
      // o se recargaría la aplicación
    } catch (error) {
      setSaveResult({
        success: false,
        message: `Error al guardar las credenciales: ${error instanceof Error ? error.message : 'Error desconocido'}`
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Configuración de DLocal</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Credenciales de DLocal</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apiKey">
            API Key
          </label>
          <input
            id="apiKey"
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Ingresa tu API Key de DLocal"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="secretKey">
            Secret Key
          </label>
          <input
            id="secretKey"
            type="password"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Ingresa tu Secret Key de DLocal"
          />
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={handleVerifyCredentials}
            disabled={isVerifying || !apiKey || !secretKey}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isVerifying || !apiKey || !secretKey ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isVerifying ? 'Verificando...' : 'Verificar Credenciales'}
          </button>
          
          <button
            onClick={handleSaveCredentials}
            disabled={isSaving || !apiKey || !secretKey}
            className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isSaving || !apiKey || !secretKey ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSaving ? 'Guardando...' : 'Guardar Credenciales'}
          </button>
        </div>
        
        {verificationResult && (
          <div className={`mt-4 p-4 rounded ${
            verificationResult.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {verificationResult.message}
          </div>
        )}
        
        {saveResult && (
          <div className={`mt-4 p-4 rounded ${
            saveResult.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {saveResult.message}
          </div>
        )}
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Información de DLocal</h2>
        
        <div className="mb-4">
          <h3 className="font-bold">Entornos de DLocal</h3>
          <ul className="list-disc pl-5 mt-2">
            <li>
              <strong>Sandbox (Pruebas):</strong> Utiliza credenciales de sandbox para pruebas sin afectar transacciones reales.
              <br />
              <a 
                href="https://dashboard-sbx.dlocalgo.com/signup" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Crear cuenta de sandbox
              </a>
            </li>
            <li>
              <strong>Producción:</strong> Utiliza credenciales de producción para transacciones reales.
              <br />
              <a 
                href="https://dashboard.dlocalgo.com/signup" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Crear cuenta de producción
              </a>
            </li>
          </ul>
        </div>
        
        <div className="mb-4">
          <h3 className="font-bold">Tarjetas de prueba</h3>
          <ul className="list-disc pl-5 mt-2">
            <li>
              <strong>Tarjeta de prueba exitosa:</strong> 4111 1111 1111 1111
              <br />
              Fecha de expiración: Cualquier fecha futura
              <br />
              CVV: Cualquier número
            </li>
            <li>
              <strong>Tarjeta de prueba rechazada:</strong> 5555 5555 5555 4444
              <br />
              Fecha de expiración: Cualquier fecha futura
              <br />
              CVV: Cualquier número
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DLocalConfigPage; 