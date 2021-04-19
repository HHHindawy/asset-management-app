import React, { useState, useEffect } from 'react';
import axios from '../../network/axios';
import List from '../../components/FuelHistory/List/List';
import EditDialog from '../../components/FuelHistory/EditDialog/EditDialog';
import './FuelHistory.scss';

const FuelHistory = () => {
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [editDialog, setEditDialog] = useState({
    open: false,
    editItem: {},
  });

  const fetchHistory = async () => {
    setLoadingHistory(true);
    await axios
      .get('/vehicles')
      .then((response) => setVehicles(response.data))
      .catch((error) => console.error(error))
      .finally(() => setLoadingHistory(false));
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const headers = [
    { title: 'Vehicle' },
    { title: 'Time' },
    { title: 'Total km' },
    { title: 'Volume' },
    { title: 'Cost' },
  ];

  const handleOpenEditDialog = (vehicle) => {
    setEditDialog({
      open: true,
      editItem: vehicle,
    });
  };

  const handleCloseEditDialog = () => {
    setEditDialog({
      open: false,
      editItem: {},
    });
  };

  const handleDeleteVehicle = async (vehicle, index) => {
    setDeleteLoading(true);
    await axios
      .delete(`/vehicles/${vehicle.id}`)
      .then(() => {
        const newVehicles = [...vehicles];
        newVehicles.splice(index, 1);
        setVehicles(newVehicles);
      })
      .catch((error) => console.error(error))
      .finally(() => setDeleteLoading(false));
  };

  const handelEditVehicle = async (newVehicle) => {
    setEditLoading(true);
    await axios
      .put(`/vehicles/${newVehicle.id}`, newVehicle)
      .then(() => {
        const newVehicles = vehicles.map((vehicle) => {
          if (vehicle.id === newVehicle.id) return newVehicle;
          return vehicle;
        });
        setVehicles(newVehicles);
        handleCloseEditDialog();
      })
      .catch((error) => console.error(error))
      .finally(() => setEditLoading(false));
  };

  return (
    <div className="fuel-history">
      <List
        headers={headers}
        rows={vehicles}
        showActions
        loading={loadingHistory}
        deleteLoading={deleteLoading}
        onEdit={handleOpenEditDialog}
        onDelete={handleDeleteVehicle}
      />
      <EditDialog
        isOpen={editDialog.open}
        editItem={editDialog.editItem}
        editLoading={editLoading}
        onSubmit={handelEditVehicle}
        onCancel={handleCloseEditDialog}
      />
    </div>
  );
};

export default FuelHistory;
