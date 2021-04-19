import React, { useState } from 'react';
import List from '../../components/FuelHistory/List/List';
import EditDialog from '../../components/FuelHistory/EditDialog/EditDialog';
import vehicleImg from '../../img/vehicle.png';
import './FuelHistory.scss';

const FuelHistory = () => {
  const [editDialog, setEditDialog] = useState({
    open: false,
    editItem: {},
  });
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      name: 'Toyota Avanza',
      status: 'active',
      startDate: '2020-01-01T00:00:00Z',
      odometer: '17.845',
      volume: '45',
      cost: '625',
      img: vehicleImg,
    },
    {
      id: 2,
      name: 'Toyota Avanza',
      status: 'inShop',
      startDate: '2020-01-01T00:00:00Z',
      odometer: '17.845',
      volume: '45',
      cost: '625',
      img: vehicleImg,
    },
    {
      id: 3,
      name: 'Toyota Avanza',
      status: 'active',
      startDate: '2021-01-01T00:00:00Z',
      odometer: '17.845',
      volume: '45',
      cost: '625',
      img: vehicleImg,
    },
    {
      id: 4,
      name: 'Toyota Avanza',
      status: 'outOfService',
      startDate: '2019-01-01T00:00:00Z',
      odometer: '17.845',
      volume: '45',
      cost: '625',
      img: vehicleImg,
    },
    {
      id: 5,
      name: 'Toyota Avanza',
      status: 'active',
      startDate: '2021-01-01T00:00:00Z',
      odometer: '17.845',
      volume: '45',
      cost: '625',
      img: vehicleImg,
    },
    {
      id: 6,
      name: 'Toyota Avanza',
      status: 'inShop',
      startDate: '2021-01-01T00:00:00Z',
      odometer: '17.845',
      volume: '45',
      cost: '625',
      img: vehicleImg,
    },
    {
      id: 7,
      name: 'Toyota Avanza',
      status: 'active',
      startDate: '2021-01-01T00:00:00Z',
      odometer: '17.845',
      volume: '45',
      cost: '625',
      img: vehicleImg,
    },
    {
      id: 8,
      name: 'Toyota Avanza',
      status: 'outOfService',
      startDate: '2019-01-01T00:00:00Z',
      odometer: '17.845',
      volume: '45',
      cost: '625',
      img: vehicleImg,
    },
    {
      id: 9,
      name: 'Toyota Avanza',
      status: 'active',
      startDate: '2018-01-01T00:00:00Z',
      odometer: '17.845',
      volume: '45',
      cost: '625',
      img: vehicleImg,
    },
    {
      id: 10,
      name: 'Toyota Avanza',
      status: 'inShop',
      startDate: '2020-01-01T00:00:00Z',
      odometer: '17.845',
      volume: '45',
      cost: '625',
      img: vehicleImg,
    },
    {
      id: 11,
      name: 'Toyota Avanza',
      status: 'active',
      startDate: '2018-01-01T00:00:00Z',
      odometer: '17.845',
      volume: '45',
      cost: '625',
      img: vehicleImg,
    },
    {
      id: 12,
      name: 'Toyota Avanza',
      status: 'outOfService',
      startDate: '2017-01-01T00:00:00Z',
      odometer: '17.845',
      volume: '45',
      cost: '625',
      img: vehicleImg,
    },
  ]);

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

  const handleDeleteVehicle = (index) => {
    const newVehicles = [...vehicles];
    newVehicles.splice(index, 1);
    setVehicles(newVehicles);
  };

  const handelEditVehicle = (newVehicle) => {
    const newVehicles = vehicles.map((vehicle) => {
      if (vehicle.id === newVehicle.id) return newVehicle;
      return vehicle;
    });
    setVehicles(newVehicles);
    handleCloseEditDialog();
  };

  return (
    <div className="fuel-history">
      <List
        headers={headers}
        rows={vehicles}
        showActions
        onEdit={handleOpenEditDialog}
        onDelete={handleDeleteVehicle}
      />
      <EditDialog
        isOpen={editDialog.open}
        editItem={editDialog.editItem}
        onSubmit={handelEditVehicle}
        onCancel={handleCloseEditDialog}
      />
    </div>
  );
};

export default FuelHistory;
