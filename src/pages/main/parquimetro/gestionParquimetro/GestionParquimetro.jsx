import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import IngresarEditar from '../../../../components/componentsPage/main/parquimetro/gestionParquimetro/IngresarEditar/IngresarEditarGestionParquimetro';
import DataTableGestionParquimetro from '../../../../components/componentsPage/main/parquimetro/gestionParquimetro/dataTable/DataTableGestionParquimetro';

export default function GestionParquimetro() {
  // Estado para los datos de la tabla
  const [parquimetros, setParquimetros] = useState([
    { id:0,patente: 'ABC123', operador: 'Juan Pérez', horaIngreso: new Date('2024-10-06T13:54:32'), latitud: -34.6037, longitud: -58.3816 },
    { id:1,patente: 'DEF456', operador: 'María López', horaIngreso: new Date('2024-10-06T16:56:37'), latitud: -34.6137, longitud: -58.3916 },
  ]);

  const asignaId =()=>{
    const n = parquimetros.length + 1
    return n
  }

  // Estado para controlar la visibilidad del diálogo
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  
  // Estado para el parquímetro a editar
  const [parquimetroToEdit, setParquimetroToEdit] = useState(null);

  // Función para agregar o editar un parquímetro
  const handleSave = (nuevoParquimetro) => {
    if (parquimetroToEdit) {
      console.log('editando..')
      setParquimetros((prev) =>
        prev.map((p) => (p.id === nuevoParquimetro.id ? nuevoParquimetro : p))
      );
    } else {
      // Agrega un nuevo parquímetro
      setParquimetros([...parquimetros, nuevoParquimetro]);
    }
    setIsDialogVisible(false); // Cerrar el diálogo después de guardar
    setParquimetroToEdit(null); // Reiniciar el estado de edición
  };

  // Función para abrir el diálogo con un parquímetro a editar
  const handleEdit = (parquimetro) => {
    setParquimetroToEdit(parquimetro);
    setIsDialogVisible(true);
  };

  return (
    <div>
      <h2 className='ml-2'>Gestion Parquimetros</h2>
      {/* Botón para mostrar el diálogo */}
      <Button label="Agregar Parquímetro" icon="pi pi-plus" onClick={() => {
        setParquimetroToEdit(null); // Limpia el parquímetro a editar
        setIsDialogVisible(true);
      }} className="p-mb-3 m-2" />

      {/* Dialog para mostrar el formulario de IngresarEditar */}
      <Dialog
      className='m-2'
       header={`${parquimetroToEdit ? 'Editar':'Ingresar'} Parquímetro`}
       visible={isDialogVisible} 
       modal onHide={() => setIsDialogVisible(false)}
       draggable={false}>

        <IngresarEditar onSave={handleSave} parquimetroToEdit={parquimetroToEdit} asignaId={asignaId}/>
        
      </Dialog>

      {/* Tabla con los datos de parquímetros */}
      <DataTableGestionParquimetro data={parquimetros} onEdit={handleEdit} />
    </div>
  );
}


import React from 'react';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';

export default function GestionParquimetro() {
  // ... (código existente)

  return (
    <div className="grid">
      <div className="col-12">
        <Card title="Gestión de Parquímetros" className="mb-4">
          <div className="flex justify-content-between align-items-center mb-4">
            <h2 className="m-0">Gestión Parquímetros</h2>
            <Button label="Agregar Parquímetro" icon="pi pi-plus" onClick={() => {
              setParquimetroToEdit(null);
              setIsDialogVisible(true);
            }} />
          </div>
          
          <Divider />
          
          <DataTableGestionParquimetro data={parquimetros} onEdit={handleEdit} />
        </Card>
      </div>
      
      <Dialog
        className="m-2"
        header={`${parquimetroToEdit ? 'Editar' : 'Ingresar'} Parquímetro`}
        visible={isDialogVisible}
        modal
        onHide={() => setIsDialogVisible(false)}
        draggable={false}
      >
        <IngresarEditar onSave={handleSave} parquimetroToEdit={parquimetroToEdit} asignaId={asignaId} />
      </Dialog>
    </div>
  );
}
