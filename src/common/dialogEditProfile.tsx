import React, { useRef, useState } from 'react';

import Slider from '@material-ui/core/Slider';
import CameraEnhanceOutlinedIcon from '@mui/icons-material/CameraEnhanceOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import Cropper from 'react-easy-crop';

export default function ChangeProfileDialog({ open, setOpen }: any) {
  const profileImageRef = useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;
  const coverImageRef = useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;

  const [openCropImage, setOpenCropImage] = useState(true);
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoomImage, setZoomImage] = useState<any>(1);
  const [profileImage, setProfileImage] = useState<any | null>();

  const onCropComplete = (croppedAreaPixels: any) => {
    setCroppedArea(croppedAreaPixels);
  };
  const chooseImage = () => {
    console.log(croppedArea);
    console.log(profileImage);
    setOpenCropImage(false);
  };

  const triggerImageProfileSelectPopup = () => {
    profileImageRef?.current?.click();
  };
  const triggerCoverImageSelectPopup = () => {
    profileImageRef?.current?.click();
  };

  const onSelectFile = (event: any) => {
    // console.log(profileImage);

    if (profileImage === undefined) {
      setProfileImage(null);
    }

    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener('load', () => {
        setProfileImage(reader?.result);
        setOpenCropImage(true);
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOpenCropImage(false);
  };

  return (
    <div>
      {profileImage ? (
        <Dialog
          fullWidth
          open={openCropImage}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          // className="relative"
        >
          <div className="h-[200px] min-h-[60vh] w-full">
            <Cropper
              image={profileImage}
              crop={crop}
              zoom={zoomImage}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoomImage}
              onCropComplete={onCropComplete}
            />
            <Slider
              min={1}
              max={3}
              step={0.1}
              value={zoomImage}
              onChange={(zoom) => setZoomImage(zoom)}
            />
          </div>
          {/* <div className='mb-12'>
            <Slider min={1} max={3} step={0.1} value={zoom} onChange={(zoom) => setZoom(zoom)} />
          </div> */}
          <div className="absolute bottom-1 right-1 flex items-center">
            <button type="button" className="bg-white py-1 px-3 rounded-md" onClick={chooseImage}>
              Choose
            </button>
          </div>
        </Dialog>
      ) : null}
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="relative max-w-full w-full h-[170px] max-h-[170px] mb-9">
          <Image src="/images/cover-photo4.jpg" layout="fill" objectFit="cover" />
          <div className="absolute w-[128px] h-[128px] bottom-[-61px] left-4 overflow-hidden rounded-full border-[6px] border-white">
            <Image
              src="/images/toc2.jpg"
              width={122}
              height={122}
              objectFit="cover"
              className="z-10"
              priority
            />
          </div>
          <input
            ref={profileImageRef}
            accept="image/*"
            type="file"
            onChange={onSelectFile}
            className="hidden"
          />
          <input
            ref={coverImageRef}
            accept="image/*"
            type="file"
            onChange={onSelectFile}
            className="hidden"
          />
          <CameraEnhanceOutlinedIcon
            className="absolute bottom-[-11px] left-[69px] text-white z-20 opacity-50"
            onClick={triggerImageProfileSelectPopup}
          />
          <CameraEnhanceOutlinedIcon
            className="absolute top-[46%] left-[50%] text-white z-20 opacity-50"
            onClick={triggerCoverImageSelectPopup}
          />
        </div>

        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText> */}
          <TextField autoFocus margin="dense" id="name" label="Name" fullWidth variant="standard" />
          <TextField margin="dense" id="name" label="Name" fullWidth variant="standard" />
          <TextField margin="dense" id="name" label="Name" fullWidth variant="standard" />
          <TextField
            margin="dense"
            id="name"
            label="Email"
            type="text"
            fullWidth
            multiline
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="text-gray-600 px-1">
            Cancel
          </Button>
          <Button onClick={handleClose} autoFocus className="text-blueCyanLogo px-3">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
