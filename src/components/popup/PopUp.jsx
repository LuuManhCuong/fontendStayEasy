import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import React from "react";
import { memo } from "react";
import ListImage from '../listimage/ListImage';
import { useLocation } from "react-router-dom";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Popup(props) {
    const location = useLocation();
    var currentURL = window.location.href;
    var url = new URL(currentURL);
  
    const queryString = location.search;
    const urlParams = new URLSearchParams(queryString);
    const { currentImageInit, imagesList, openPopup, setOpenPopup} = props;
    
    const handleClose = () => {
        setOpenPopup(false);
        url.searchParams.delete('image');
        window.history.replaceState({}, '', url);
    }

    console.log('popup');

    return (
        <Dialog 
        fullScreen 
        open={openPopup}
        PaperProps={{
            style: {
              backgroundColor: "black",
              boxShadow: "none",
              justifyContent: "center",
              alignItems: "center",
            },
          }}
        >
            <DialogTitle></DialogTitle>
            <DialogContent>
                <ListImage currentImageInit={currentImageInit} imagesList={imagesList}></ListImage>
            </DialogContent>
            <DialogActions>
                <div className='flex text-white cursor-pointer justify-between w-[70px] fixed top-10 left-10' onClick={handleClose}>
                    <FontAwesomeIcon style={{marginLeft:"3px",padding:"4px"}} icon={icon({name: 'x', family: 'classic', style: 'solid'})} />
                    <p className="text-3xl font-bold m-0 p-0">Đóng</p>
                </div>

            </DialogActions>
        </Dialog>
    )
}

export default memo(Popup);