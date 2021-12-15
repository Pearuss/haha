import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import LayoutAdminPage from '../../../Components/admin/layout';
import Checkbox from '@mui/material/Checkbox';
import CategoryItem from '../../../Components/admin/components/CategoryItem';
import HeaderAdmin from '../../../Components/admin/components/HeaderAdmin';
import DialogDelete from '../../../Components/admin/common/dialogDelete';
import Image from 'next/image';
import { useRouter } from 'next/router';

function Category(): ReactElement {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const catFake = [
    {
      id: '1',
      name: 'ReactJS',
      createAt: '25/08/2000',
      description: 'Cat Description',
      status: true,
      selected: false,
    },
    {
      id: '2',
      name: 'ReactJS',
      createAt: '25/08/2000',
      description: 'Cat Description',
      status: true,
      selected: false,
    },
    {
      id: '3',
      name: 'ReactJS',
      createAt: '25/08/2000',
      description: 'Cat Description',
      status: true,
      selected: false,
    },
  ];

  const [openDialog, setOpenDialog] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [dataCats, setDataCats] = useState(catFake);

  const router = useRouter();

  const hasSelectedCat = useMemo(() => {
    return dataCats.find((cat) => cat.selected === true);
  }, [dataCats]);

  useEffect(() => {
    const isSelectedAll = dataCats.find((cat) => cat.selected === false);
    if (typeof isSelectedAll === 'undefined') setSelectAll(true);
    else setSelectAll(false);
  }, [dataCats]);

  const handleSelectAllClick = () => {
    const newDataCats = [...dataCats].map((cat) => ({ ...cat, selected: !selectAll }));
    setSelectAll(!selectAll);
    setDataCats(newDataCats);
  };

  const handleDeleteClick = () => {
    const dataSelected = dataCats.filter((cat) => cat.selected === true);
    console.log(dataSelected);
    handleClose();
  };

  const handleCheckItemClick = (cat: any) => {
    const index = dataCats.indexOf(cat);
    const newDataCats = [...dataCats];
    newDataCats.splice(index, 1, { ...cat, selected: !cat.selected });
    setDataCats(newDataCats);
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleClickAdd = () => {
    router.push('/adminpanel/category/create');
  };

  return (
    <LayoutAdminPage title="Category">
      <HeaderAdmin
        titlePage="Category Management"
        subTitlePage=""
        searchPlaceholder="Search category..."
      />

      <div className="bg-white rounded p-4 px-6">
        <div className="flex pb-4 mb-4 border-b-2 border-gray-500 items-center">
          <h4>All category</h4>
          <span className="text-sm mt-2 ml-2">(3)</span>
          <div className="flex gap-4 ml-auto mt-2 pr-3 cursor-pointer">
            <button onClick={handleClickAdd}>
              <Image src="/images/plus.png" width={19} height={19} />
            </button>
            <button
              onClick={handleClickOpen}
              disabled={typeof hasSelectedCat === 'undefined' ? true : false}
            >
              <Image src="/images/delete.png" width={20} height={20} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-5 bg-titleAdmin px-3 py-1 font-medium items-center">
          <span className="flex items-center">
            <span className="flex-1">
              <Checkbox {...label} checked={selectAll} onChange={handleSelectAllClick} />
            </span>
          </span>
          <span>Category Name</span>
          <span>Date created</span>
          <span>Total category</span>
          <span>Status</span>
        </div>
        {dataCats.map((cat) => (
          <CategoryItem key={cat.id} cat={cat} handleCheckItemClick={handleCheckItemClick} />
        ))}
        <DialogDelete
          label="Do you want to remove the category?"
          subContnet="Please consider this carefully, deleted categorys cannot be recovered."
          openDialog={openDialog}
          handleClose={handleClose}
          handleDeleteClick={handleDeleteClick}
        />
      </div>
    </LayoutAdminPage>
  );
}

export default Category;
