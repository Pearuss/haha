/* eslint-disable @typescript-eslint/no-shadow */
import React, {
  useEffect, useRef, useState, useCallback,
} from 'react';

import Slider from '@material-ui/core/Slider';
import CameraEnhanceOutlinedIcon from '@mui/icons-material/CameraEnhanceOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Cropper from 'react-easy-crop';

import useFetch from '../hooks/use-fetch';
import getCroppedImg from '../utilities/helper';

export default function ChangeProfileDialog({ open, setOpen, profile }: any) {
  const router = useRouter();
  const profileImageRef = useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;
  const coverImageRef = useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;

  const [openCropImage, setOpenCropImage] = useState(false);
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoomImage, setZoomImage] = useState<any>(1);
  const thumbnail = profile?.data?.thumbnail;
  const [profileImage, setProfileImage] = useState<any>('');
  const [coverImage, setCoverImage] = useState<any>(
    'http://hyknow.hybrid-technologies.co.jp/uploads/static/images/cover-photo4.jpg',
  );
  // const [coverImage, setCoverImage] = useState<any | null>('/images/cover-photo4.jpg');
  const [firstName, setFirstName] = useState(profile?.data?.firstName || '');
  const [lastName, setLastName] = useState(profile?.data?.lastName || '');
  const [authorName, setAuthorName] = useState(profile?.data?.authorName || '');
  const [slogan, setSlogan] = useState(profile?.data?.slogan || '');
  const [tel, setTel] = useState(profile?.data?.tel || '');

  useEffect(() => {
    if (thumbnail) {
      setProfileImage(`${process.env.NEXT_PUBLIC_IMAGE_URL}${thumbnail}`);
    }
  }, [profile]);
  useEffect(() => {
    if (profile?.data) {
      setFirstName(profile?.data?.firstName);
      setLastName(profile?.data?.lastName);
      setAuthorName(profile?.data?.authorName);
      setSlogan(profile?.data?.slogan);
      setTel(profile?.data?.tel);
    }
  }, [profile]);

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    console.log(croppedArea);

    setCroppedArea(croppedAreaPixels);
  };
  const chooseImage = useCallback(async () => {
    const canvas = await getCroppedImg(profileImage, croppedArea);

    setProfileImage(canvas);
    setOpenCropImage(false);
  }, [croppedArea]);

  const triggerImageProfileSelectPopup = () => {
    profileImageRef?.current?.click();
  };
  const triggerCoverImageSelectPopup = () => {
    coverImageRef?.current?.click();
  };

  const onSelectFile = (event: any) => {
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
  const onSelectFileCoverPicture = (event: any) => {
    if (profileImage === undefined) {
      setCoverImage(null);
    }

    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener('load', () => {
        setCoverImage(reader?.result);
      });
    }
  };
  const updateProfileHandler = async () => {
    if (profileImage) {
      const res = await useFetch('/api/v1/user/update-profile', {
        method: 'POST',
        body: JSON.stringify({
          firstName,
          lastName,
          authorName,
          slogan,
          tel,
          thumbnail:
            profileImage === `${process.env.NEXT_PUBLIC_IMAGE_URL}${thumbnail}` ? '' : profileImage,
        }),
      });
      if (res.status) {
        setOpen(false);
        router.reload();
      }
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
        <div className="relative max-w-full w-full h-[170px] max-h-[170px] mb-6">
          <Image
            loader={() => coverImage}
            src={coverImage}
            layout="fill"
            objectFit="cover"
            className="z-20"
          />
          <div className="absolute w-[128px] h-[128px] bottom-[-61px] left-4 overflow-hidden rounded-full border-[6px] border-white z-40">
            <Image
              loader={() => profileImage}
              src={profileImage}
              width={122}
              height={122}
              alt="profileImage"
              objectFit="cover"
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
            onChange={onSelectFileCoverPicture}
            className="hidden"
          />
          <CameraEnhanceOutlinedIcon
            className="absolute bottom-[-11px] left-[69px] text-white opacity-50 z-50"
            onClick={triggerImageProfileSelectPopup}
          />
          <CameraEnhanceOutlinedIcon
            className="absolute top-[46%] left-[50%] text-white opacity-50 z-50"
            onClick={triggerCoverImageSelectPopup}
          />
        </div>

        <DialogContent>
          <div className="flex items-center w-full mt-2 text-gray-600 ">
            <span className="w-28 flex font-base  justify-end">First name*</span>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              className="w-full py-2 px-4 outline-none border-2 border-blueCyanLogo rounded ml-8"
              type="text"
            />
          </div>
          <div className="flex items-center w-full mt-2 text-gray-600">
            <span className="w-28 flex font-base justify-end">Last name*</span>
            <input
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              className="w-full py-2 px-4 outline-none border-2 border-blueCyanLogo rounded ml-8"
              type="text"
            />
          </div>
          <div className="flex items-center w-full mt-2 text-gray-600">
            <span className="w-28 flex font-base justify-end">Author name*</span>
            <input
              onChange={(e) => setAuthorName(e.target.value)}
              value={authorName}
              className="w-full py-2 px-4 outline-none border-2 border-blueCyanLogo rounded ml-8"
              type="text"
            />
          </div>
          <div className="flex items-center w-full mt-2 text-gray-600">
            <span className="w-28 flex font-base justify-end">Slogan*</span>
            <input
              onChange={(e) => setSlogan(e.target.value)}
              value={slogan}
              className="w-full py-2 px-4 outline-none border-2 border-blueCyanLogo rounded ml-8"
              type="text"
            />
          </div>
          <div className="flex items-center w-full mt-2 text-gray-600">
            <span className="w-28 flex font-base justify-end">Tel*</span>
            <input
              onChange={(e) => setTel(e.target.value)}
              value={tel}
              className="w-full py-2 px-4 outline-none border-2 border-blueCyanLogo rounded ml-8"
              type="text"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="text-gray-600 px-1">
            Cancel
          </Button>
          <Button onClick={updateProfileHandler} autoFocus className="text-blueCyanLogo px-3">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
