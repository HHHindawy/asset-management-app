import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import flagImg from '../../../img/flag.png';
import rightIcon from '../../../img/right.svg';
import leftIcon from '../../../img/left.svg';
import editIcon from '../../../img/edit.svg';
import deleteIcon from '../../../img/delete.svg';
import './List.scss';

const List = ({
  headers,
  rows,
  showActions = false,
  onEdit,
  onDelete,
  deleteLoading,
}) => {
  const perPage = 10;
  const [selectedTimezone, setSelectedTimezone] = useState('egypt');
  const [selectedSortOption, setSelectedSortOption] = useState(
    'none',
  );
  const [pagination, setPagination] = useState([0, perPage]);
  const [listRows, setListRows] = useState([]);

  useEffect(() => {
    setListRows(rows);
  }, [rows]);

  const timezones = [
    {
      name: 'Egypt',
      value: 'egypt',
      icon: flagImg,
    },
  ];

  const sortOptions = [
    {
      name: 'None',
      value: 'none',
    },
    {
      name: 'Date',
      value: 'startDate',
    },
    {
      name: 'Status',
      value: 'status',
    },
  ];

  const handleNextPage = () => {
    let start = pagination[0] + perPage;
    let end = start + perPage;
    if (start < 0) start = 0;
    if (start > rows.length) [start, end] = pagination;
    if (end > rows.length) end = rows.length;
    if (end < 0) [start, end] = pagination;
    setPagination([start, end]);
  };

  const handlePreviousPage = () => {
    let start = pagination[0] - perPage;
    let end = start + perPage;
    if (start < 0) [start, end] = [0, perPage];
    if (start > rows.length) [start, end] = pagination;
    if (end > rows.length)
      [start, end] = [rows.length - perPage, rows.length];
    if (end < perPage) [start, end] = pagination;
    setPagination([start, end]);
  };

  const handleSelectTimezone = (timezone) => {
    setSelectedTimezone(timezone);
  };

  const handleSelectSort = (sortKey) => {
    setSelectedSortOption(sortKey);
    if (sortKey === 'none') {
      setListRows(rows);
    } else {
      const sortedRows = [...rows];
      sortedRows.sort((a, b) =>
        a[sortKey] > b[sortKey]
          ? 1
          : b[sortKey] > a[sortKey]
          ? -1
          : 0,
      );
      setListRows(sortedRows);
      setPagination([0, perPage]);
    }
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'active':
        return {
          className: 'active',
          title: 'Active',
        };
      case 'inShop':
        return {
          className: 'in-shop',
          title: 'In Shop',
        };
      case 'outOfService':
        return {
          className: 'out-of-service',
          title: 'Out Of Service',
        };
      default:
        return {
          className: 'active',
          title: 'Active',
        };
    }
  };

  const getGroupedItems = (items, key) => {
    return items.reduce((acc, current) => {
      acc[current[key]] = acc[current[key]] || [];
      acc[current[key]].push(current);
      return acc;
    }, Object.create(null));
  };

  const renderSortKey = (key) => {
    if (selectedSortOption === 'startDate')
      return moment(key).format('ddd, MMM DD, YYYY');
    if (selectedSortOption === 'status')
      return getStatusInfo(key).title;
    return 'none';
  };

  return (
    <div className="data-list">
      <div className="actions">
        <span className="pagination-text">
          {pagination[0]}-{pagination[1]} of {rows.length}
        </span>
        <div className="pagination-buttons">
          <Button onClick={handlePreviousPage}>
            <img src={leftIcon} alt="previous page" />
          </Button>
          <Button onClick={handleNextPage}>
            <img src={rightIcon} alt="next page" />
          </Button>
        </div>
        <div className="dropdown-container">
          <Select
            className="dropdown"
            variant="outlined"
            fullWidth
            value={selectedTimezone}
            onChange={(e) => handleSelectTimezone(e.target.value)}
            renderValue={() => (
              <span className="dropdown-title">
                Timezone:
                <img
                  src={
                    timezones.find(
                      (timezone) =>
                        timezone.value === selectedTimezone,
                    )?.icon
                  }
                  alt="timezone-flag"
                />
              </span>
            )}
          >
            {timezones.map((timezone) => (
              <MenuItem key={timezone.value} value={timezone.value}>
                {timezone.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="dropdown-container">
          <div>
            <Select
              className="dropdown"
              variant="outlined"
              fullWidth
              value={selectedSortOption}
              onChange={(e) => handleSelectSort(e.target.value)}
              renderValue={() => (
                <div className="dropdown-title">
                  Sort:
                  <span className="bold">
                    {
                      sortOptions.find(
                        (option) =>
                          option.value === selectedSortOption,
                      )?.name
                    }
                  </span>
                </div>
              )}
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
      </div>
      <TableContainer
        component={Paper}
        elevation={0}
        className="data-table-container"
      >
        <Table className="data-table" aria-label="data table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header.title}>
                  {header.title}
                </TableCell>
              ))}
              {showActions && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(
              getGroupedItems(
                listRows.slice(pagination[0], pagination[1]),
                selectedSortOption,
              ),
            ).map(([sortKey, items]) => (
              <>
                {renderSortKey(sortKey) !== 'none' && (
                  <div key={sortKey} className="group-title">
                    {renderSortKey(sortKey)}
                  </div>
                )}
                {items.map((item, itemIndex) => (
                  <TableRow key={item.id}>
                    <TableCell align="left">
                      <div className="name-field">
                        <Avatar
                          alt="Profile Avatar"
                          src={item.img}
                          className="avatar"
                        />
                        <div>
                          <div className="name">{item.name}</div>
                          <div
                            className={`status ${
                              getStatusInfo(item.status).className
                            }`}
                          >
                            {getStatusInfo(item.status).title}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="left">
                      {moment(item.startDate).format('LT')}
                    </TableCell>
                    <TableCell align="left">
                      {Number(item.odometer).toFixed(3)} km
                    </TableCell>
                    <TableCell align="left">
                      {Number(item.volume).toFixed(2)} L
                    </TableCell>
                    <TableCell align="left">
                      <div>Rp {Number(item.cost).toFixed(3)}</div>
                      <div className="subtitle">
                        Rp{' '}
                        {Number(item.cost / item.volume).toFixed(3)}
                        /ltr
                      </div>
                    </TableCell>
                    {showActions && (
                      <TableCell align="left">
                        <div className="actions-container">
                          <IconButton
                            aria-label="edit"
                            className="edit-icon"
                            onClick={() => onEdit(item)}
                          >
                            <img src={editIcon} alt="edit" />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            className="delete-icon"
                            disabled={deleteLoading}
                            onClick={() => onDelete(item, itemIndex)}
                          >
                            <img src={deleteIcon} alt="edit" />
                          </IconButton>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default List;
