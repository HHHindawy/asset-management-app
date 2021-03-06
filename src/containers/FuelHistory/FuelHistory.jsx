import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from '../../network/axios';
import List from '../../components/FuelHistory/List/List';
import EditDialog from '../../components/FuelHistory/EditDialog/EditDialog';
import './FuelHistory.scss';

const FuelHistory = () => {
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [editDialog, setEditDialog] = useState({
    open: false,
    editItem: {},
  });

  const fetchHistory = async () => {
    setLoadingHistory(true);
    await axios
      .get('/history')
      .then((response) => setHistory(response.data))
      .catch(() =>
        toast.error('Something went wrong while fetching history!'),
      )
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

  const handleOpenEditDialog = (record) => {
    setEditDialog({
      open: true,
      editItem: record,
    });
  };

  const handleCloseEditDialog = () => {
    setEditDialog({
      open: false,
      editItem: {},
    });
  };

  const handleDeleteRecord = async (record, index) => {
    setDeleteLoading(true);
    await axios
      .delete(`/history/${record.id}`)
      .then(() => {
        const newHistory = [...history];
        newHistory.splice(index, 1);
        setHistory(newHistory);
        toast.success('Record deleted successfully!');
      })
      .catch(() =>
        toast.error('Something went wrong while deleting record!'),
      )
      .finally(() => setDeleteLoading(false));
  };

  const handelEditRecord = async (newRecord) => {
    setEditLoading(true);
    await axios
      .put(`/history/${newRecord.id}`, newRecord)
      .then(() => {
        const newHistory = history.map((record) => {
          if (record.id === newRecord.id) return newRecord;
          return record;
        });
        setHistory(newHistory);
        handleCloseEditDialog();
        toast.success('Record updated successfully!');
      })
      .catch(() =>
        toast.error('Something went wrong while updating record!'),
      )
      .finally(() => setEditLoading(false));
  };

  return (
    <div className="fuel-history">
      <List
        headers={headers}
        rows={history}
        loading={loadingHistory}
        deleteLoading={deleteLoading}
        onEdit={handleOpenEditDialog}
        onDelete={handleDeleteRecord}
      />
      <EditDialog
        isOpen={editDialog.open}
        editItem={editDialog.editItem}
        editLoading={editLoading}
        onSubmit={handelEditRecord}
        onCancel={handleCloseEditDialog}
      />
    </div>
  );
};

export default FuelHistory;
